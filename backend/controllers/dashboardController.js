import {User} from "../models/UserModel.js";
import {Transaction} from "../models/TransactionModel.js";
import mongoose from "mongoose";

export const getDashboardData = async (req, res) => {

    try {
        const shopkeeperId = new mongoose.Types.ObjectId(req.user.id);

        const totalCustomers =
            await User.countDocuments({
                role: "CUSTOMER",
                createdBy: req.user.id
            });

        const totalBalanceAgg =
            await User.aggregate([
                {
                    $match: {
                        role: "CUSTOMER",
                        createdBy: req.user.id
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$currentBalance"
                        }
                    }
                }
            ]);

        const totalBalance = totalBalanceAgg[0] ? totalBalanceAgg[0].total : 0;

        // Total Transactions
        const totalTransactions = await Transaction.countDocuments({
            shopkeeper: req.user.id
        });

        // Today's metrics
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // Credits given today (CREDIT type)
        const creditsGivenTodayAgg = await Transaction.aggregate([
            {
                $match: {
                    shopkeeper: shopkeeperId,
                    type: "CREDIT",
                    createdAt: { $gte: startOfToday, $lte: endOfToday }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);
        const creditsGivenToday = creditsGivenTodayAgg[0] ? creditsGivenTodayAgg[0].total : 0;

        // Payments received today (DEBIT type)
        const paymentsReceivedTodayAgg = await Transaction.aggregate([
            {
                $match: {
                    shopkeeper: shopkeeperId,
                    type: "DEBIT",
                    createdAt: { $gte: startOfToday, $lte: endOfToday }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);
        const paymentsReceivedToday = paymentsReceivedTodayAgg[0] ? paymentsReceivedTodayAgg[0].total : 0;

        // Monthly Revenue (DEBITs in the current month)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const monthlyRevenueAgg = await Transaction.aggregate([
            {
                $match: {
                    shopkeeper: shopkeeperId,
                    type: "DEBIT",
                    createdAt: { $gte: startOfMonth }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);
        const monthlyRevenue = monthlyRevenueAgg[0] ? monthlyRevenueAgg[0].total : 0;

        // Daily trends for the last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Last 7 days including today
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const dailyTrendsData = await Transaction.aggregate([
            {
                $match: {
                    shopkeeper: shopkeeperId,
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            }
        ]);

        const trendsMap = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            trendsMap[dateStr] = { date: label, credit: 0, payment: 0 };
        }

        dailyTrendsData.forEach(item => {
            const dateStr = item._id.date;
            if (trendsMap[dateStr]) {
                if (item._id.type === "CREDIT") {
                    trendsMap[dateStr].credit = item.total;
                } else if (item._id.type === "DEBIT") {
                    trendsMap[dateStr].payment = item.total;
                }
            }
        });
        const dailyTrends = Object.values(trendsMap);

        // Paid vs Pending
        const totalPaidAgg = await Transaction.aggregate([
            {
                $match: {
                    shopkeeper: shopkeeperId,
                    type: "DEBIT"
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);
        const totalPaid = totalPaidAgg[0] ? totalPaidAgg[0].total : 0;
        const paidVsPending = [
            { name: "Paid Balances", value: totalPaid },
            { name: "Pending Balances", value: totalBalance }
        ];

        // Top 5 Customers by pending balance
        const topCustomers = await User.find({
            createdBy: req.user.id,
            role: "CUSTOMER"
        })
        .select("name currentBalance email phone")
        .sort({ currentBalance: -1 })
        .limit(5);

                const overdueTransactions =
  await Transaction.find({

    shopkeeper: req.user.id,

    type: "CREDIT",

    isSettled: false,

    dueDate: {

      $lt: new Date()

    }

  })

  .populate(

    "customer",

    "name currentBalance"

  )

  .lean();

const overdueCustomers =
  overdueTransactions.map(
    (transaction) => {

      const overdueDays =
        Math.ceil(

          (
            new Date() -

            new Date(
              transaction.dueDate
            )

          ) /

          (
            1000 *
            60 *
            60 *
            24
          )

        );

      return {

        customerId:
          transaction.customer?._id,

        name:
          transaction.customer?.name,

        currentBalance:
          transaction.customer
            ?.currentBalance,

        overdueDays,

        dueDate:
          transaction.dueDate,

        amount:
          transaction.amount

      };

    }
  )

  .sort(

    (
      a,
      b
    ) =>

      b.overdueDays -

      a.overdueDays

  )

  .slice(
    0,
    5
  );

        // Monthly business growth for last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        const monthlyGrowthData = await Transaction.aggregate([
            {
                $match: {
                    shopkeeper: shopkeeperId,
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    volume: { $sum: "$amount" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 }
            }
        ]);

        const growthMap = {};
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
            growthMap[key] = { month: label, volume: 0 };
        }

        monthlyGrowthData.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            if (growthMap[key]) {
                growthMap[key].volume = item.volume;
            }
        });
        const monthlyGrowth = Object.values(growthMap);

        // Customer Insights
        // 1. Most active customers (by transaction count)
        const mostActiveArr = await Transaction.aggregate([
            { $match: { shopkeeper: shopkeeperId } },
            { $group: { _id: "$customer", count: { $sum: 1 }, totalVolume: { $sum: "$amount" } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);
        const mostActiveCustomerIds = mostActiveArr.map(item => item._id);
        const customersDetails = await User.find({ _id: { $in: mostActiveCustomerIds } }).select("name email phone currentBalance").lean();
        const mostActive = mostActiveArr.map(item => {
            const detail = customersDetails.find(c => c._id.toString() === item._id.toString());
            return {
                ...detail,
                transactionCount: item.count,
                totalVolume: item.totalVolume
            };
        });

        // 2. Highest pending balances (Top 3)
        const highestPending = await User.find({
            createdBy: req.user.id,
            role: "CUSTOMER"
        })
        .select("name currentBalance email phone")
        .sort({ currentBalance: -1 })
        .limit(3);

        // 3. Recent payments (DEBITs) (Top 3)
        const recentPayments = await Transaction.find({
            shopkeeper: req.user.id,
            type: "DEBIT"
        })
        .populate("customer", "name email phone")
        .sort({ createdAt: -1 })
        .limit(3);

        // 4. Customer growth (New registrations by month for last 6 months)
        const customerGrowthData = await User.aggregate([
            {
                $match: {
                    createdBy: shopkeeperId,
                    role: "CUSTOMER",
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const customerGrowthMap = {};
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            const label = d.toLocaleDateString("en-US", { month: "short" });
            customerGrowthMap[key] = { month: label, newCustomers: 0 };
        }

        customerGrowthData.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            if (customerGrowthMap[key]) {
                customerGrowthMap[key].newCustomers = item.count;
            }
        });
        const customerGrowth = Object.values(customerGrowthMap);

        const customerInsights = {
            mostActive,
            highestPending,
            recentPayments,
            customerGrowth
        };

        // All transactions for the table (unfiltered, we will filter/paginate on the frontend for responsiveness)
        const allTransactions = await Transaction.find({
            shopkeeper: req.user.id
        })
        .populate("customer", "name email phone currentBalance")
        .sort({ createdAt: -1 });

        // Compile response
        res.status(200).json({
            totalCustomers,
            totalBalance,
            totalTransactions,
            monthlyRevenue,
            creditsGivenToday,
            paymentsReceivedToday,
            dailyTrends,
            paidVsPending,
            topCustomers,
            monthlyGrowth,
            customerInsights,
            allTransactions,
            overdueCustomers,
            overdueTransactions
            
        });

    } catch (error) {
        console.error("Dashboard calculation error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};
export const getMyProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.id
    ).select("-password");

    res.status(200).json({
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


export const getMyTransactions = async (req, res) => {

  try {

    const transactions = await Transaction.find({

      customer: req.user.id

    })
    .populate("shopkeeper", "name email")
    .sort({ createdAt: -1 }).lean();

    res.status(200).json({
      transactions
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};