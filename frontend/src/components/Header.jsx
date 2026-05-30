import {

    Link,

    useNavigate

} from "react-router-dom";

import { useAuth } from "../store/authStore";


function Header() {

    const navigate = useNavigate();

    const {

        user,

        logout,

        isAuthenticated

    } = useAuth();


    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };


    return (

        <header className="bg-white shadow-md">

            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


                {/* LOGO */}
                <div>

                    <h1 className="text-3xl font-bold">

                        Digital Udhaar Khata

                    </h1>

                </div>


                {/* PUBLIC NAV */}
                {
                    !isAuthenticated && (

                        <nav className="flex items-center gap-6">

                            <Link
                                to="/"
                                className="font-medium hover:text-blue-500"
                            >

                                Home

                            </Link>


                            <Link
                                to="/about"
                                className="font-medium hover:text-blue-500"
                            >

                                About

                            </Link>


                            <Link
                                to="/login"
                                className="font-medium hover:text-blue-500"
                            >

                                Login

                            </Link>


                            <Link
                                to="/register"
                                className="bg-black text-white px-4 py-2 rounded-lg"
                            >

                                Register

                            </Link>

                        </nav>

                    )
                }


                {/* PRIVATE NAV */}
                {
                    isAuthenticated && (

                        <nav className="flex items-center gap-6">


                            {/* SHOPKEEPER NAV */}
                            {
                                user?.role === "SHOPKEEPER" && (

                                    <>

                                        <Link
                                            to="/shopkeeper/dashboard"
                                            className="font-medium hover:text-blue-500"
                                        >

                                            Dashboard

                                        </Link>


                                        <Link
                                            to="/shopkeeper/customers"
                                            className="font-medium hover:text-blue-500"
                                        >

                                            Customers

                                        </Link>

                                    </>

                                )
                            }


                            {/* CUSTOMER NAV */}
                            {
                                user?.role === "CUSTOMER" && (

                                    <>

                                        <Link
                                            to="/customer/profile"
                                            className="font-medium hover:text-blue-500"
                                        >

                                            Profile

                                        </Link>


                                        <Link
                                            to="/customer/transactions"
                                            className="font-medium hover:text-blue-500"
                                        >

                                            Transactions

                                        </Link>

                                    </>

                                )
                            }


                            {/* USER INFO */}
                            <div className="flex items-center gap-4 ml-6">

                                <div className="text-right">

                                    <p className="font-semibold">

                                        {user?.name}

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {user?.role}

                                    </p>

                                </div>


                                {/* LOGOUT */}
                                <button

                                    onClick={handleLogout}

                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"

                                >

                                    Logout

                                </button>

                            </div>

                        </nav>

                    )
                }

            </div>

        </header>

    );

}

export default Header;