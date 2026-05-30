import { useEffect } from "react";

import { useDashboardStore } from "../../store/dashBoardStore";

import Header from "../../components/Header";


function Dashboard() {

    const {

        dashboardData,

        fetchDashboardData,

        loading

    } = useDashboardStore();


    useEffect(() => {

        fetchDashboardData();

    }, []);


    return (

        <div className="min-h-screen bg-gray-100">


            {/* CONTENT */}
            <div className="p-8">

                {
                    loading ? (

                        <h1 className="text-2xl font-bold">
                            Loading...
                        </h1>

                    ) : (

                        <>

                            {/* DASHBOARD CARDS */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                                {/* TOTAL CUSTOMERS */}
                                <div className="bg-white p-6 rounded-xl shadow-md">

                                    <h2 className="text-gray-500 text-lg">

                                        Total Customers

                                    </h2>

                                    <h1 className="text-4xl font-bold mt-3">

                                        {
                                            dashboardData?.totalCustomers
                                        }

                                    </h1>

                                </div>


                                {/* TOTAL BALANCE */}
                                <div className="bg-white p-6 rounded-xl shadow-md">

                                    <h2 className="text-gray-500 text-lg">

                                        Total Balance

                                    </h2>

                                    <h1 className="text-4xl font-bold mt-3">

                                        ₹ {
                                            dashboardData?.totalBalance
                                        }

                                    </h1>

                                </div>


                                {/* TOTAL TRANSACTIONS */}
                                <div className="bg-white p-6 rounded-xl shadow-md">

                                    <h2 className="text-gray-500 text-lg">

                                        Recent Transactions

                                    </h2>

                                    <h1 className="text-4xl font-bold mt-3">

                                        {
                                            dashboardData?.recentTransactions?.length
                                        }

                                    </h1>

                                </div>

                            </div>


                            {/* TRANSACTIONS TABLE */}
                            <div className="bg-white rounded-xl shadow-md p-6">

                                <h1 className="text-2xl font-bold mb-6">

                                    Recent Transactions

                                </h1>

                                <div className="overflow-x-auto">

                                    <table className="w-full border-collapse">

                                        <thead>

                                            <tr className="bg-gray-100">

                                                <th className="p-4 text-left">

                                                    Customer

                                                </th>

                                                <th className="p-4 text-left">

                                                    Type

                                                </th>

                                                <th className="p-4 text-left">

                                                    Amount

                                                </th>

                                                <th className="p-4 text-left">

                                                    Date

                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {
                                                dashboardData?.recentTransactions?.map(
                                                    (transaction) => (

                                                        <tr
                                                            key={transaction._id}
                                                            className="border-b"
                                                        >

                                                            <td className="p-4">

                                                                {
                                                                    transaction.customer?.name
                                                                }

                                                            </td>

                                                            <td className="p-4">

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

                        </>

                    )
                }

            </div>

        </div>

    );

}

export default Dashboard;