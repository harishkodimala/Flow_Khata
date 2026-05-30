import { useEffect, useState } from "react";
import {
  FaUsers,
  FaWallet,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

import { getDashboardData } from "../../api/dashboarAPI";
import Loader from "../../layouts/Loader";
import toast from "react-hot-toast";

function Dashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const data =
          await getDashboardData();

        setDashboard(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDashboard();

  }, []);

  if (loading) {

    return <Loader />;

  }

  const stats = [

    {
      title: "Customers",
      value: dashboard.totalCustomers,
      icon: <FaUsers />,
      color:
        "bg-blue-100 text-blue-600",
    },

    {
      title: "Outstanding",
      value: `₹${dashboard.totalBalance}`,
      icon: <FaWallet />,
      color:
        "bg-red-100 text-red-600",
    },

    {
      title: "Credit Today",
      value: `₹${dashboard.creditsGivenToday}`,
      icon: <FaArrowUp />,
      color:
        "bg-orange-100 text-orange-600",
    },

    {
      title: "Collected Today",
      value: `₹${dashboard.paymentsReceivedToday}`,
      icon: <FaArrowDown />,
      color:
        "bg-green-100 text-green-600",
    },

  ];

  return (

    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-lg">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <p className="mt-2 text-blue-100">

          Welcome back. Here's what's happening in your business today.

        </p>

      </div>

      {/* Stat Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">

                  {item.title}

                </p>

                <h2 className="text-3xl font-bold mt-2">

                  {item.value}

                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${item.color}`}
              >

                {item.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Section */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* Top Customers */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="text-xl font-bold mb-5">

            Top Pending Customers

          </h2>

          {dashboard.topCustomers?.length === 0 ? (

            <div className="text-slate-500 text-center py-8">

              No customer data available

            </div>

          ) : (

            <div className="space-y-4">

              {dashboard.topCustomers.map(
                (customer) => (

                  <div
                    key={customer._id}
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50"
                  >

                    <div>

                      <p className="font-semibold">

                        {customer.name}

                      </p>

                    </div>

                    <span className="font-bold text-red-600">

                      ₹
                      {
                        customer.currentBalance
                      }

                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* Overdue Customers */}

<div className="bg-white rounded-2xl border shadow-sm p-6">

  <div className="flex items-center justify-between mb-5">

    <h2 className="text-xl font-bold">

      🔴 Overdue Customers

    </h2>

    <span className="text-sm text-slate-500">

      {dashboard.overdueCustomers?.length || 0} Customers

    </span>

  </div>

  {dashboard.overdueCustomers?.length === 0 ? (

    <div className="text-center py-8">

      <div className="text-4xl mb-3">

        🎉

      </div>

      <p className="text-slate-500">

        No overdue customers

      </p>

    </div>

  ) : (

    <div className="space-y-4">

      {dashboard.overdueCustomers.map(

        (customer) => (

          <div

            key={`${customer.customerId}-${customer.dueDate}`}

            className="border border-red-100 bg-red-50 rounded-xl p-4"

          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="font-semibold text-slate-800">

                  {customer.name}

                </h3>

                <p className="text-sm text-slate-500 mt-1">

                  Due Date:{" "}

                  {new Date(

                    customer.dueDate

                  ).toLocaleDateString(

                    "en-IN"

                  )}

                </p>

              </div>

              <div className="text-right">

                <p className="font-bold text-red-600">

                  ₹{customer.amount}

                </p>

              </div>

            </div>

            <div className="mt-3 flex items-center justify-between">

              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">

                {customer.overdueDays} Days Overdue

              </span>

              <span className="text-sm font-medium text-slate-600">

                Balance ₹

                {customer.currentBalance}

              </span>

            </div>

          </div>

        )

      )}

    </div>

  )}

</div>

        {/* Recent Transactions */}

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="text-xl font-bold mb-5">

            Recent Transactions

          </h2>

          {dashboard.allTransactions
            ?.length === 0 ? (

            <div className="text-slate-500 text-center py-8">

              No transactions available

            </div>

          ) : (

            <div className="space-y-4">

              {dashboard.allTransactions
                .slice(0, 5)
                .map((transaction) => (

                  <div
                    key={transaction._id}
                    className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50"
                  >

                    <div>

                      <p className="font-semibold">

                        {
                          transaction
                            .customer
                            ?.name
                        }

                      </p>

                      <p className="text-xs text-slate-500">

                        {new Date(
                          transaction.createdAt
                        ).toLocaleDateString()}

                      </p>

                    </div>

                    <span
                      className={`font-bold ${
                        transaction.type ===
                        "CREDIT"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >

                      ₹
                      {
                        transaction.amount
                      }

                    </span>

                  </div>

                ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default Dashboard;