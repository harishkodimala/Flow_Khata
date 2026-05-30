import { useEffect } from "react";

import Header from "../../components/Header";

import { useTransactionStore } from "../../store/transactionStore";


function MyTransactions() {

    const {

        transactions,

        fetchMyTransactions,

        loading

    } = useTransactionStore();


    useEffect(() => {

        fetchMyTransactions();

    }, []);


    return (

        <div className="min-h-screen bg-gray-100">


            {/* CONTENT */}
            <div className="p-8">

                <h1 className="text-4xl font-bold mb-8">

                    My Transactions

                </h1>


                <div className="bg-white rounded-xl shadow-md p-6">

                    {
                        loading ? (

                            <h1 className="text-2xl font-bold">

                                Loading...

                            </h1>

                        ) : (

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
                                            transactions.length > 0 ? (

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

                                            ) : (

                                                <tr>

                                                    <td
                                                        colSpan="4"
                                                        className="text-center p-8 text-gray-500"
                                                    >

                                                        No transactions found

                                                    </td>

                                                </tr>

                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default MyTransactions;