import { useEffect, useState } from "react";
import { getAnalyticsData } from "../../api/analyticalService.js";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";

import {
  FaChartLine,
  FaMoneyBillWave,
  FaUsers,
  FaWallet
} from "react-icons/fa";

import Loader from "../../layouts/Loader";
import toast from "react-hot-toast";

function Analytics() {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    const fetchAnalytics = async () => {

      try {

        const response =
          await getAnalyticsData();

        setData(response);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load analytics"
        );

      }

    };

    fetchAnalytics();

  }, []);

  if (!data) {

    return <Loader />;

  }

  const COLORS = [
    "#2563eb",
    "#ef4444"
  ];

  const stats = [

    {
      title: "Monthly Revenue",
      value: `₹${data.monthlyRevenue}`,
      icon: <FaMoneyBillWave />,
      color:
        "bg-green-100 text-green-600"
    },

    {
      title: "Active Customers",
      value:
        data.customerInsights
          ?.highestPending
          ?.length || 0,
      icon: <FaUsers />,
      color:
        "bg-blue-100 text-blue-600"
    },

    {
      title: "Pending Accounts",
      value:
        data.paidVsPending?.[1]
          ?.value || 0,
      icon: <FaWallet />,
      color:
        "bg-red-100 text-red-600"
    },

    {
      title: "Business Growth",
      value:
        data.monthlyGrowth?.length || 0,
      icon: <FaChartLine />,
      color:
        "bg-purple-100 text-purple-600"
    }

  ];

  return (

    <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      {/* Header */}

      <div className="bg-linear-to-r from-indigo-600 to-blue-600 rounded-3xl p-5 md:p-8 text-white mb-8 shadow-lg">

        <h1 className="text-3xl md:text-4xl font-bold">

          Analytics Dashboard

        </h1>

        <p className="mt-2 text-blue-100">

          Understand your business performance and customer trends.

        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:p-6 md:grid-cols-2 xl:grid-cols-4 mb-8">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl p-4 md:p-6 border shadow-sm hover:shadow-lg transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">

                  {item.title}

                </p>

                <h2 className="text-2xl md:text-3xl font-bold mt-2">

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

      {/* Daily Trends */}

      <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm mb-8">

        <h2 className="text-xl font-bold mb-5">

          Credit vs Payments Trend

        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <LineChart
            data={data.dailyTrends}
          >

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="credit"
              stroke="#ef4444"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="payment"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Pie + Growth */}

      <div className="grid lg:grid-cols-2 gap-4 md:p-6 mb-8">

        {/* Paid vs Pending */}

        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm">

          <h2 className="text-xl font-bold mb-5">

            Paid vs Pending

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={data.paidVsPending}
                dataKey="value"
                outerRadius={100}
              >

                {data.paidVsPending.map(
                  (_, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Growth */}

        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm">

          <h2 className="text-xl font-bold mb-5">

            Business Growth

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={
                data.monthlyGrowth
              }
            >

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="volume"
                fill="#2563eb"
                radius={[
                  8,
                  8,
                  0,
                  0
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Customer Insights */}

      <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-6">

        <h2 className="text-xl font-bold mb-5">

          Highest Pending Customers

        </h2>

        {data.customerInsights
          ?.highestPending
          ?.length === 0 ? (

          <div className="text-center py-10 text-slate-500">

            No customer insights available

          </div>

        ) : (

          <div className="space-y-4">

            {data.customerInsights.highestPending.map(

              (customer) => (

                <div
                  key={customer._id}
                  className="flex justify-between items-center p-4 rounded-xl border hover:bg-slate-50"
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

    </div>

  );

}

export default Analytics;