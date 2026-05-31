import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";
import { exportLedgerPDF } from "../../utils/exportLedgerPDF";

function Ledger() {

  const { id } = useParams();

  const [customer, setCustomer] =
    useState(null);

  const [transactions, setTransactions] =
    useState([]);

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");
  const [loading, setLoading] =
    useState(true);

  const [transactionLoading, setTransactionLoading] =
    useState(false);

  const [filterType, setFilterType] =
    useState("ALL");

  const [searchTerm, setSearchTerm] =
    useState("");

  const fetchData = async () => {

    try {

      const customerRes =
        await api.get(
          `/customer/${id}`
        );

      const transactionRes =
        await api.get(
          `/transaction/${id}`
        );

      setCustomer(
        customerRes.data.customer
      );

      setTransactions(
        transactionRes.data.transactions
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch ledger"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchData();

  }, [id]);

  const handleTransaction =
    async (type) => {

      if (!amount) {

        toast.error(
          "Amount is required"
        );

        return;

      }

      if (
        Number(amount) <= 0
      ) {

        toast.error(
          "Amount must be greater than 0"
        );

        return;

      }

      try {

        setTransactionLoading(
          true
        );

        await api.post(
          "/transaction/add",
          {

            customerId: id,

            type,

            amount:
              Number(amount),

            note,

            dueDate:
                type === "CREDIT"
                      ? dueDate
                      : null

          }
        );

        toast.success(

          type === "CREDIT"

            ? "Credit added successfully"

            : "Payment recorded successfully"

        );

        setAmount("");
        setNote("");
        setDueDate("");
        fetchData();

      } catch (error) {

        console.log(error);

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to add transaction"

        );

      } finally {

        setTransactionLoading(
          false
        );

      }

    };

  if (loading) {

    return <Loader />;

  }

  const totalCredit =
    transactions
      .filter(
        (t) =>
          t.type === "CREDIT"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
        0
      );

  const totalPayments =
    transactions
      .filter(
        (t) =>
          t.type === "DEBIT"
      )
      .reduce(
        (sum, t) =>
          sum + t.amount,
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

  return (

    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">

      {/* Customer Card */}

      <div className="bg-white rounded-2xl border shadow-sm p-4 md:p-6 mb-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <h1 className="text-2xl md:text-3xl font-bold">

              {customer.name}

            </h1>

            <p className="text-slate-500 mt-1">

              {customer.phone}

            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mt-4">

              ₹{customer.currentBalance}

            </h2>

            <p className="text-slate-500 mt-1">

              Outstanding Balance

            </p>

          </div>

          <button
            onClick={() =>
              exportLedgerPDF(
                customer,
                filteredTransactions
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
          >

            Export PDF

          </button>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <p className="text-slate-500">

            Total Credit

          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">

            ₹{totalCredit}

          </h2>

        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <p className="text-slate-500">

            Total Payments

          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">

            ₹{totalPayments}

          </h2>

        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <p className="text-slate-500">

            Transactions

          </p>

          <h2 className="text-2xl font-bold mt-2">

            {transactions.length}

          </h2>

        </div>

      </div>

      {/* Add Transaction */}

      <div className="bg-white rounded-xl border p-4 md:p-6 mb-6 shadow-sm">

        <h2 className="font-semibold text-lg mb-4">

          Add Transaction

        </h2>

        <div className="grid gap-4">

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <textarea
            placeholder="Note"
            value={note}
            onChange={(e) =>
              setNote(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <div>

  <label className="block text-sm font-medium mb-2">

    Due Date (For Credit)

  </label>

  <input
  type="date"
  value={dueDate}
  min={
    new Date()
      .toISOString()
      .split("T")[0]
  }
  onChange={(e) =>
    setDueDate(
      e.target.value
    )
  }
  className="border p-3 rounded-lg w-full"
/>

</div>

          <div className="flex gap-4">

            <button
              disabled={
                transactionLoading
              }
              onClick={() =>
                handleTransaction(
                  "CREDIT"
                )
              }
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
            >

              {transactionLoading
                ? "Processing..."
                : "Add Credit"}

            </button>

            <button
              disabled={
                transactionLoading
              }
              onClick={() =>
                handleTransaction(
                  "DEBIT"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >

              {transactionLoading
                ? "Processing..."
                : "Record Payment"}

            </button>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl border p-4 mb-6 shadow-sm">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search by note..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="border rounded-lg p-3 flex-1"
          />

          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(
                e.target.value
              )
            }
            className="border rounded-lg p-3"
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

      {/* Transaction History */}

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm">

        <div className="p-5 border-b">

          <h2 className="text-xl font-bold">

            Transaction History

          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-100">

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
    Due Date
  </th>

  <th className="text-left p-4">
    Status
  </th>

  <th className="text-left p-4">
    Note
  </th>

</tr>

            </thead>

            <tbody>

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-12"
                  >

                    <h3 className="font-semibold text-lg">

                      No Transactions Found

                    </h3>

                    <p className="text-slate-500 mt-2">

                      Try changing filters or add a transaction.

                    </p>

                  </td>

                </tr>

              ) : (

                filteredTransactions.map(
  (transaction) => {

    const isOverdue =

      transaction.type ===
        "CREDIT" &&

      transaction.dueDate &&

      new Date(
        transaction.dueDate
      ) < new Date() &&

      !transaction.isSettled;

    return (

      <tr
        key={transaction._id}
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
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              transaction.type ===
              "CREDIT"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >

            {transaction.type}

          </span>

        </td>

        <td className="p-4 font-semibold">

          ₹{transaction.amount}

        </td>

        <td className="p-4">

          {transaction.dueDate

            ? new Date(
                transaction.dueDate
              ).toLocaleDateString(
                "en-IN"
              )

            : "-"}

        </td>

        <td className="p-4">

          {transaction.type === "DEBIT" ? (

  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

    Payment

  </span>

) : transaction.isSettled ? (

  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">

    Settled

  </span>

) : isOverdue ? (

  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold">

    Overdue

  </span>

) : (

  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

    Active

  </span>

)}

        </td>

        <td className="p-4">

          {transaction.note || "-"}

        </td>

      </tr>

    );

  }
)

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Ledger;