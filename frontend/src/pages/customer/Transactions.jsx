import { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaArrowUp,
  FaArrowDown,
  FaSearch
} from "react-icons/fa";

import { api } from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";

function Transactions() {

  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filterType, setFilterType] =
    useState("ALL");

  const [searchTerm, setSearchTerm] =
    useState("");

  const fetchTransactions = async () => {

    try {

      const response =
        await api.get(
          "/dashboard/transactions"
        );

      setTransactions(
        response.data.transactions
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load transactions"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchTransactions();

  }, []);

  const totalCredit =
    transactions

      .filter(
        (transaction) =>
          transaction.type ===
          "CREDIT"
      )

      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

  const totalPayments =
    transactions

      .filter(
        (transaction) =>
          transaction.type ===
          "DEBIT"
      )

      .reduce(
        (sum, transaction) =>
          sum + transaction.amount,
        0
      );

  const filteredTransactions =
    transactions.filter(
      (transaction) => {

        const matchesType =

          filterType === "ALL"

            ? true

            : transaction.type ===
              filterType;

        const matchesSearch =

          (
            transaction.note ||
            ""
          )
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        return (
          matchesType &&
          matchesSearch
        );

      }
    );

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 p-4 md:p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl mb-8">

        <h1 className="text-4xl font-bold">

          Transactions

        </h1>

        <p className="mt-2 text-blue-100">

          View all your credit and payment records.

        </p>

        <div className="flex flex-wrap gap-3 mt-5">

          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">

            {transactions.length} Transactions

          </span>

          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">

            ₹{totalCredit} Credit

          </span>

          <span className="px-4 py-2 bg-white/20 rounded-full text-sm">

            ₹{totalPayments} Payments

          </span>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Total Transactions

              </p>

              <h2 className="text-3xl font-bold mt-2">

                {transactions.length}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">

              <FaExchangeAlt />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Total Credit

              </p>

              <h2 className="text-3xl font-bold text-red-600 mt-2">

                ₹{totalCredit}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl">

              <FaArrowUp />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">

                Total Payments

              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">

                ₹{totalPayments}

              </h2>

            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-2xl">

              <FaArrowDown />

            </div>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 mb-8">

        <div className="flex flex-col md:flex-row gap-4">

          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by note..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          >

            <option value="ALL">
              All Transactions
            </option>

            <option value="CREDIT">
              Credits
            </option>

            <option value="DEBIT">
              Payments
            </option>

          </select>

        </div>

      </div>

      {/* Transaction Table */}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-5 border-b">

          <h2 className="text-xl font-bold">

            Transaction History

          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Type
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

                <th className="text-left p-4">
                  Note
                </th>

                <th className="text-left p-4">
                  Shopkeeper
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-16"
                  >

                    <div>

                      <div className="text-5xl mb-4">

                        📒

                      </div>

                      <h3 className="font-semibold text-lg">

                        No Transactions Found

                      </h3>

                      <p className="text-slate-500 mt-2">

                        Try changing filters or search terms.

                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredTransactions.map(

                  (transaction) => (

                    <tr
                      key={
                        transaction._id
                      }
                      className="border-t hover:bg-slate-50 transition"
                    >

                      <td className="p-4">

                        {new Date(
                          transaction.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === "CREDIT"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >

                          {transaction.type === "CREDIT"
                            ? "Credit"
                            : "Payment"}

                        </span>

                      </td>

                      <td
                        className={`p-4 font-semibold ${
                          transaction.type === "CREDIT"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >

                        ₹{transaction.amount}

                      </td>

                      <td className="p-4">

                        {transaction.note || "-"}

                      </td>

                      <td className="p-4">

                        {transaction.shopkeeper?.name}

                      </td>

                    </tr>

                  )

                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Transactions;