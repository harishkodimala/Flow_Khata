import { useEffect, useState } from "react";

import {
  FaUsers,
  FaUserTie,
  FaMoneyBillWave,
  FaExchangeAlt
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import { api } from "../../api/axios";

function AdminDashboard() {

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchDashboard =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/dashboard"
          );

        setDashboard(
          response.data.data
        );

      } catch (error) {

        setError(

          error.response?.data
            ?.message ||

            "Failed to load dashboard"

        );

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }

  if (error) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <p className="text-red-500">

          {error}

        </p>

      </div>

    );

  }

  return (

    <AdminLayout>

      <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-6 md:p-8 text-white shadow-lg">

        <h1 className="text-3xl md:text-4xl font-bold">

          Admin Dashboard 👑

        </h1>

        <p className="mt-2 text-slate-300">

          Monitor platform activity and manage
          shopkeepers across Khata Flow.

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        {/* SHOPKEEPERS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Shopkeepers

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {dashboard?.totalShopkeepers || 0}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <FaUserTie
                className="text-blue-600 text-2xl"
              />

            </div>

          </div>

        </div>

        {/* CUSTOMERS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Customers

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {dashboard?.totalCustomers || 0}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

              <FaUsers
                className="text-green-600 text-2xl"
              />

            </div>

          </div>

        </div>

        {/* TRANSACTIONS */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Transactions

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {dashboard?.totalTransactions || 0}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

              <FaExchangeAlt
                className="text-purple-600 text-2xl"
              />

            </div>

          </div>

        </div>

        {/* OUTSTANDING */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Outstanding

              </p>

              <h2 className="text-3xl font-bold mt-2">

                ₹

                {new Intl.NumberFormat(
                  "en-IN"
                ).format(

                  dashboard?.outstanding || 0

                )}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

              <FaMoneyBillWave
                className="text-red-600 text-2xl"
              />

            </div>

          </div>

        </div>

      </div>

      {/* QUICK INFO */}

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm border">

        <h2 className="text-xl font-bold mb-4">

          Platform Overview

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-slate-500">

              Total Shopkeepers

            </p>

            <p className="text-2xl font-bold mt-2">

              {dashboard?.totalShopkeepers || 0}

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-slate-500">

              Total Customers

            </p>

            <p className="text-2xl font-bold mt-2">

              {dashboard?.totalCustomers || 0}

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl p-4">

            <p className="text-slate-500">

              Outstanding Amount

            </p>

            <p className="text-2xl font-bold mt-2">

              ₹

              {new Intl.NumberFormat(
                "en-IN"
              ).format(

                dashboard?.outstanding || 0

              )}

            </p>

          </div>

        </div>

      </div>

    </div>

    </AdminLayout>

  );

}

export default AdminDashboard;