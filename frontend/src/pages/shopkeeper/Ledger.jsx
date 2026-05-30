import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useTransactionStore } from "../../store/transactionStore";

import { useCustomerStore } from "../../store/customerStore";


function Ledger() {

    const { customerId } = useParams();

    const {

        transactions,

        fetchTransactions,

        addTransaction,

        loading

    } = useTransactionStore();


    const { customers } = useCustomerStore();


    const customer = customers.find(
        (c) => c._id === customerId
    );


    const [formData, setFormData] = useState({

        customerId,

        type: "CREDIT",

        amount: "",

        note: ""

    });


    // ERROR STATE
    const [formError, setFormError] = useState("");


    useEffect(() => {

        fetchTransactions(customerId);

    }, [customerId]);


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        // VALIDATION
        if (!formData.amount) {

            setFormError("Amount is required");

            return;

        }

        if (Number(formData.amount) <= 0) {

            setFormError(
                "Amount must be greater than 0"
            );

            return;

        }

        // CLEAR ERROR
        setFormError("");


        await addTransaction({

            ...formData,

            amount: Number(formData.amount)

        });


        // RESET FORM
        setFormData({

            ...formData,

            amount: "",

            note: ""

        });

    };


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            {/* CUSTOMER INFO */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">

                <h1 className="text-4xl font-bold mb-4">

                    {customer?.name}

                </h1>

                <p className="text-lg text-gray-600">

                    Current Balance:

                    <span className="font-bold ml-2">

                        ₹ {customer?.currentBalance}

                    </span>

                </p>

            </div>


            {/* ADD TRANSACTION */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10">

                <h2 className="text-2xl font-bold mb-6">

                    Add Transaction

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >

                    {/* TYPE */}
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    >

                        <option value="CREDIT">
                            CREDIT
                        </option>

                        <option value="DEBIT">
                            DEBIT
                        </option>

                    </select>


                    {/* AMOUNT */}
                    <div>

                        <input
                            type="number"
                            name="amount"
                            min="1"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`border p-3 rounded w-full ${
                                formError
                                    ? "border-red-500"
                                    : ""
                            }`}
                        />

                        {
                            formError && (

                                <p className="text-red-500 text-sm mt-1">

                                    {formError}

                                </p>

                            )
                        }

                    </div>


                    {/* NOTE */}
                    <input
                        type="text"
                        name="note"
                        placeholder="Note"
                        value={formData.note}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />


                    {/* BUTTON */}
                    <button
                        className="bg-black text-white rounded p-3"
                    >

                        {
                            loading
                                ? "Saving..."
                                : "Add"
                        }

                    </button>

                </form>

            </div>


            {/* TRANSACTIONS TABLE */}
            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Transaction History

                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-4 text-left">
                                    Type
                                </th>

                                <th className="p-4 text-left">
                                    Amount
                                </th>

                                <th className="p-4 text-left">
                                    Note
                                </th>

                                <th className="p-4 text-left">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                transactions.map(
                                    (transaction) => (

                                        <tr
                                            key={transaction._id}
                                            className="border-b"
                                        >

                                            <td className="p-4 font-bold">

                                                {
                                                    transaction.type
                                                }

                                            </td>

                                            <td className="p-4">

                                                ₹ {
                                                    transaction.amount
                                                }

                                            </td>

                                            <td className="p-4">

                                                {
                                                    transaction.note
                                                }

                                            </td>

                                            <td className="p-4">

                                                {
                                                    new Date(
                                                        transaction.createdAt
                                                    ).toLocaleDateString()
                                                }

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Ledger;