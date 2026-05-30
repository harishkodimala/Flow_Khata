import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone
} from "react-icons/fi";

import { useAuth } from "../../store/authStore";
import toast from "react-hot-toast";

function Register() {

  const navigate = useNavigate();

  const {
    register,
    loading
  } = useAuth();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {

      toast.error(
        "Name is required"
      );

      return;

    }

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

    if (!formData.phone.trim()) {

      toast.error(
        "Phone number is required"
      );

      return;

    }

    if (
      formData.phone.length !== 10
    ) {

      toast.error(
        "Enter a valid 10 digit phone number"
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

    if (

      formData.password !==
      formData.confirmPassword

    ) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }

    const result = await register(

      formData.name.trim(),

      formData.email.trim(),

      formData.password,

      formData.phone.trim(),

      "SHOPKEEPER"

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

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-center bg-black text-white p-12">

          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">

            Khata Flow

          </span>

          <h1 className="text-5xl font-black mt-6 leading-tight">

            Manage Credit.

            <br />

            Track Payments.

            <br />

            Grow Your Business.

          </h1>

          <p className="mt-6 text-slate-400 leading-relaxed">

            Manage customer credit, track payments,
            send reminders, generate statements and
            grow your business with Khata Flow.

          </p>

          <div className="mt-8 flex flex-wrap gap-3">

            <span className="px-4 py-2 rounded-full bg-white/10 text-sm">

              Customer Management

            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 text-sm">

              Due Date Tracking

            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 text-sm">

              PDF Statements

            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 text-sm">

              WhatsApp Reminders

            </span>

          </div>

        </div>

        {/* Right Section */}

        <div className="p-8 md:p-12">

          <div className="max-w-md mx-auto">

            <h2 className="text-3xl font-black text-slate-900">

              Create Account

            </h2>

            <p className="mt-2 text-slate-500">

              Create your shopkeeper account and start managing customer credit digitally.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Full Name

                </label>

                <div className="relative">

                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Email

                </label>

                <div className="relative">

                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
                  />

                </div>

              </div>

              {/* Phone */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Phone Number

                </label>

                <div className="relative">

                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Password

                </label>

                <div className="relative">

                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
                  />

                </div>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Confirm Password

                </label>

                <div className="relative">

                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-black transition"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </button>

            </form>

            <p className="mt-6 text-center text-sm text-slate-500">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 font-semibold text-black hover:underline"
              >

                Sign In

              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;