import { useState, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile as updateProfileAPI,
  changePassword as changePasswordAPI
} from "../../api/settingsAPI";

import Loader from "../../layouts/Loader";

function Settings() {

  const [profile, setProfile] =
    useState({

      name: "",

      email: "",

      phone: ""

    });

  const [passwordData, setPasswordData] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: ""

    });

  const [pageLoading, setPageLoading] =
    useState(true);

  const [profileLoading, setProfileLoading] =
    useState(false);

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const response =
          await getProfile();

        setProfile({

          name:
            response.user.name || "",

          email:
            response.user.email || "",

          phone:
            response.user.phone || ""

        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load profile"
        );

      } finally {

        setPageLoading(false);

      }

    };

    fetchProfile();

  }, []);

  const handleProfileChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]:
        e.target.value

    });

  };

  const handlePasswordChange = (e) => {

    setPasswordData({

      ...passwordData,

      [e.target.name]:
        e.target.value

    });

  };

  const updateProfile = async (e) => {

    e.preventDefault();

    if (!profile.name.trim()) {

      toast.error(
        "Name is required"
      );

      return;

    }

    if (!profile.phone.trim()) {

      toast.error(
        "Phone number is required"
      );

      return;

    }

    if (
      profile.phone.length < 10
    ) {

      toast.error(
        "Phone number must be at least 10 digits"
      );

      return;

    }

    try {

      setProfileLoading(true);

      const response =
        await updateProfileAPI({

          name:
            profile.name.trim(),

          phone:
            profile.phone.trim()

        });

      toast.success(
        response.message
      );

    } catch (error) {

      console.log(error);

      toast.error(

        error?.response?.data
          ?.message ||

        "Failed to update profile"

      );

    } finally {

      setProfileLoading(false);

    }

  };

  const updatePassword = async (e) => {

    e.preventDefault();

    if (
      !passwordData.currentPassword
    ) {

      toast.error(
        "Current password is required"
      );

      return;

    }

    if (
      !passwordData.newPassword
    ) {

      toast.error(
        "New password is required"
      );

      return;

    }

    if (
      passwordData.newPassword
        .length < 6
    ) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;

    }

    if (

      passwordData.newPassword !==

      passwordData.confirmPassword

    ) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }

    try {

      setPasswordLoading(
        true
      );

      const response =
        await changePasswordAPI({

          currentPassword:
            passwordData.currentPassword,

          newPassword:
            passwordData.newPassword

        });

      toast.success(
        response.message
      );

      setPasswordData({

        currentPassword: "",

        newPassword: "",

        confirmPassword: ""

      });

    } catch (error) {

      console.log(error);

      toast.error(

        error?.response?.data
          ?.message ||

        "Failed to update password"

      );

    } finally {

      setPasswordLoading(
        false
      );

    }

  };

  if (pageLoading) {

    return <Loader />;

  }

  return (

    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white mb-8 shadow-lg">

        <h1 className="text-4xl font-bold">

          Settings

        </h1>

        <p className="mt-2 text-blue-100">

          Manage your account information and security settings.

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Profile Section */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">

            Profile Information

          </h2>

          <form
            onSubmit={updateProfile}
            className="space-y-5"
          >

            <div>

              <label className="block text-sm font-medium mb-2">

                Name

              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your name"
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">

                Email

              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full border rounded-xl pl-12 pr-4 py-3 bg-slate-100"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">

                Phone

              </label>

              <div className="relative">

                <FaPhone className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter phone number"
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-60"
            >

              {profileLoading
                ? "Saving..."
                : "Save Changes"}

            </button>

          </form>

        </div>

        {/* Password Section */}

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-2xl font-bold mb-6">

            Change Password

          </h2>

          <form
            onSubmit={updatePassword}
            className="space-y-5"
          >

            <div>

              <label className="block text-sm font-medium mb-2">

                Current Password

              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">

                New Password

              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">

                Confirm Password

              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-slate-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full border rounded-xl pl-12 pr-4 py-3"
                />

              </div>

            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl disabled:opacity-60"
            >

              {passwordLoading
                ? "Updating..."
                : "Update Password"}

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default Settings;