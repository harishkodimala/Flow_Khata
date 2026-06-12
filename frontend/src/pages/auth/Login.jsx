import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();

    const {
        login,
        loading,
        error
    } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email.trim()) {

            toast.error(
                "Email is required"
            );

            return;

        }

        if (
            !formData.email.includes("@")
        ) {

            toast.error(
                "Enter a valid email"
            );

            return;

        }

        if (!formData.password.trim()) {

            toast.error(
                "Password is required"
            );

            return;

        }

        if (
            formData.password.length < 6
        ) {

            toast.error(
                "Password must be at least 6 characters"
            );

            return;

        }

        const result = await login(
            formData.email,
            formData.password
        );

        if (!result.success) {

            toast.error(
                result.message
            );

            return;

        }

        toast.success(
            result.message
        );

        const currentUser =
            useAuth.getState().user;

        if (
            currentUser?.role ===
            "SHOPKEEPER"
        ) {

            navigate(
                "/shopkeeper/dashboard"
            );

        } else if (

            currentUser?.role ===
            "CUSTOMER"

        ) {

            navigate(
                "/customer/profile"
            );

        } else if (

            currentUser?.role ===
            "ADMIN"

        ) {

            navigate(
                "/admin/dashboard"
            );

        } else {

            toast.error(
                "Invalid user role"
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100">

                {/* Logo */}

                <div className="text-center mb-8">

                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white text-2xl font-bold mb-4">

                        KF

                    </div>

                    <h1 className="text-3xl font-bold text-slate-800">

                        Welcome Back

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Sign in to continue to Khata Flow

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">

                            Email Address

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />

                    </div>

                    <div>

                        <label className="block mb-2 text-sm font-medium text-slate-700">

                            Password

                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border border-slate-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />

                    </div>

                    {error && (

                        <p className="text-red-500 text-sm">

                            {error}

                        </p>

                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >

                        {loading
                            ? "Signing In..."
                            : "Login"}

                    </button>

                </form>

                <p className="mt-6 text-center text-sm text-slate-600">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:text-blue-700"
                    >

                        Register

                    </Link>

                </p>

                <div className="mt-8 border-t pt-6">

                    <p className="text-center text-xs text-slate-400">

                        Securely manage customer credit, payments,
                        statements, and reminders with Khata Flow.

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;