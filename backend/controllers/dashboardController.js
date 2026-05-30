import {User} from "../models/UserModel.js";
import {Transaction} from "../models/TransactionModel.js";

export const getDashboardData = async (req, res) => {

    try {

        const totalCustomers =
            await User.countDocuments({

                role: "CUSTOMER",

                createdBy: req.user.id

            });

        const totalBalance =
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

        const recentTransactions =
            await Transaction.find({

                shopkeeper: req.user.id

            })
            .populate("customer", "name email")
            .populate("shopkeeper", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({

            totalCustomers,

            totalBalance:
                totalBalance[0]
                ? totalBalance[0].total
                : 0,

            recentTransactions

        });

    } catch (error) {

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