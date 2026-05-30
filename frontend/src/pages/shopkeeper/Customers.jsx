import { useEffect, useState } from "react";

import { useCustomerStore } from "../../store/customerStore";

import { useNavigate } from "react-router-dom";


function Customers() {

    const navigate = useNavigate();

    const {

        customers,

        fetchCustomers,

        createCustomer,

        loading

    } = useCustomerStore();


    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

        phone: ""

    });


    useEffect(() => {

        fetchCustomers();

    }, []);


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        await createCustomer(formData);

        setFormData({

            name: "",
            email: "",
            password: "",
            phone: ""

        });

    };


    return (

        <div className="min-h-screen bg-gray-100 p-8">

            {/* PAGE TITLE */}
            <h1 className="text-4xl font-bold mb-8">

                Customers

            </h1>


            {/* ADD CUSTOMER FORM */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10">

                <h2 className="text-2xl font-bold mb-6">

                    Add Customer

                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />


                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />


                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />


                    <button
                        className="bg-black text-white p-3 rounded md:col-span-2"
                    >

                        {
                            loading
                                ? "Creating..."
                                : "Add Customer"
                        }

                    </button>

                </form>

            </div>


            {/* CUSTOMERS TABLE */}
            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-2xl font-bold mb-6">

                    All Customers

                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                                <th className="p-4 text-left">
                                    Balance
                                </th>

                                <th className="p-4 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {
                                customers.map((customer) => (

                                    <tr
                                        key={customer._id}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {customer.name}
                                        </td>

                                        <td className="p-4">
                                            {customer.email}
                                        </td>

                                        <td className="p-4">
                                            {customer.phone}
                                        </td>

                                        <td className="p-4 font-bold">

                                            ₹ {
                                                customer.currentBalance
                                            }

                                        </td>


                                        {/* ACTION BUTTON */}
                                        <td className="p-4">

                                            <button

                                                onClick={() =>
                                                    navigate(
                                                        `/shopkeeper/ledger/${customer._id}`
                                                    )
                                                }

                                                className="bg-black text-white px-4 py-2 rounded-lg"

                                            >

                                                View Ledger

                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Customers;