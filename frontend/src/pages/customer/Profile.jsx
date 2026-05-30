import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWallet
} from "react-icons/fa";

import { api } from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";

function Profile() {

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchProfile = async () => {

    try {

      const response =
        await api.get(
          "/dashboard/me"
        );

      setProfile(
        response.data.user
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load profile"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchProfile();

  }, []);

  if (loading) {

    return <Loader />;

  }

 return (

  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 p-4 md:p-6">

    {/* Hero Section */}

    <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl mb-8 overflow-hidden relative">

      <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative flex flex-col md:flex-row md:items-center gap-5">

        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold border border-white/20">

          {profile?.name?.charAt(0)?.toUpperCase()}

        </div>

        <div>

          <h1 className="text-3xl md:text-4xl font-bold">

            Welcome Back 👋

          </h1>

          <p className="mt-2 text-blue-100 text-lg">

            {profile.name}

          </p>

          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-white/20 text-sm">

            Customer Account

          </span>

        </div>

      </div>

    </div>

    {/* Balance Card */}

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8 hover:shadow-lg transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 font-medium">

            Outstanding Balance

          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mt-3">

            ₹{profile.currentBalance}

          </h2>

          <p className="text-sm text-slate-500 mt-2">

            Amount currently pending

          </p>

        </div>

        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 text-2xl">

          <FaWallet />

        </div>

      </div>

    </div>

    {/* Profile Information */}

    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">

          Profile Information

        </h2>

        <span className="text-sm text-slate-500">

          Account Details

        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        <div className="flex items-center gap-4 p-5 rounded-2xl border hover:border-blue-300 hover:shadow-sm transition">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">

            <FaUser />

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Full Name

            </p>

            <p className="font-semibold text-slate-800">

              {profile.name}

            </p>

          </div>

        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl border hover:border-green-300 hover:shadow-sm transition">

          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">

            <FaEnvelope />

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Email Address

            </p>

            <p className="font-semibold text-slate-800 break-all">

              {profile.email}

            </p>

          </div>

        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl border hover:border-purple-300 hover:shadow-sm transition">

          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">

            <FaPhone />

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Phone Number

            </p>

            <p className="font-semibold text-slate-800">

              {profile.phone || "Not Available"}

            </p>

          </div>

        </div>

        <div className="flex items-center gap-4 p-5 rounded-2xl border hover:border-red-300 hover:shadow-sm transition">

          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">

            <FaWallet />

          </div>

          <div>

            <p className="text-sm text-slate-500">

              Current Balance

            </p>

            <p className="font-semibold text-red-600">

              ₹{profile.currentBalance}

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

);
}

export default Profile;