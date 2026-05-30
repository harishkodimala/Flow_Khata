import { useState } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import toast from "react-hot-toast";

function ChangePassword() {

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const checkAuth = useAuth(
    (state) => state.checkAuth
  );

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Validation

    if (!newPassword.trim()) {

      toast.error(
        "New password is required"
      );

      return;

    }

    if (newPassword.length < 6) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;

    }

    if (!confirmPassword.trim()) {

      toast.error(
        "Confirm password is required"
      );

      return;

    }

    if (newPassword !== confirmPassword) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }

    try {

      setLoading(true);

      await api.put(
        "/auth/change-password",
        {
          newPassword
        }
      );

      // Refresh user data
      await checkAuth();

      toast.success(
        "Password updated successfully"
      );

      navigate(
        "/customer/profile",
        {
          replace: true
        }
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">

      <div className="bg-white border rounded-2xl p-8 w-full max-w-md shadow-sm">

        <h1 className="text-3xl font-bold mb-2">

          Change Password

        </h1>

        <p className="text-slate-500 mb-6">

          You must change your temporary password before continuing.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <div>

            <label className="block mb-2 text-sm font-medium">

              New Password

            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium">

              Confirm Password

            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {newPassword &&
            confirmPassword &&
            newPassword !== confirmPassword && (

              <p className="text-red-500 text-sm">

                Passwords do not match

              </p>

            )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-60"
          >

            {loading
              ? "Updating Password..."
              : "Update Password"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;