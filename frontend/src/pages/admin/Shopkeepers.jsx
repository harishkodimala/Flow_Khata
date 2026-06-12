import { useEffect, useState } from "react";
import { FaTrash, FaStore } from "react-icons/fa";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

function Shopkeepers() {

  const [shopkeepers, setShopkeepers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchShopkeepers =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/shopkeepers"
          );

        setShopkeepers(
          response.data.shopkeepers
        );

      } catch (error) {

        toast.error(
          "Failed to load shopkeepers"
        );

      } finally {

        setLoading(false);

      }

    };

  const deleteShopkeeper =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this shopkeeper?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.delete(
          `/admin/shopkeeper/${id}`
        );

        toast.success(
          "Shopkeeper deleted"
        );

        setShopkeepers(
          (prev) =>
            prev.filter(
              (s) =>
                s._id !== id
            )
        );

      } catch {

        toast.error(
          "Delete failed"
        );

      }

    };

  useEffect(() => {

    fetchShopkeepers();

  }, []);

  if (loading) {

    return (

      <div className="min-h-screen flex justify-center items-center">

        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }

  return (

    <AdminLayout>

    <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      <div className="bg-white rounded-3xl p-6 shadow-sm border">

        <h1 className="text-3xl font-bold">

          Shopkeepers

        </h1>

        <p className="text-slate-500 mt-2">

          Manage registered shopkeepers.

        </p>

      </div>

      <div className="mt-6 bg-white rounded-3xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-100">

                <th className="text-left p-4">
                  Name
                </th>

                <th className="text-left p-4">
                  Email
                </th>

                <th className="text-left p-4">
                  Phone
                </th>

                <th className="text-left p-4">
                  Joined
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {shopkeepers.map(
                (shopkeeper) => (

                  <tr
                    key={
                      shopkeeper._id
                    }
                    className="border-t"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">

                          <FaStore />

                        </div>

                        <span>

                          {
                            shopkeeper.name
                          }

                        </span>

                      </div>

                    </td>

                    <td className="p-4">

                      {
                        shopkeeper.email
                      }

                    </td>

                    <td className="p-4">

                      {
                        shopkeeper.phone
                      }

                    </td>

                    <td className="p-4">

                      {new Date(
                        shopkeeper.createdAt
                      ).toLocaleDateString()}

                    </td>

                    <td className="p-4">

                      <button

                        onClick={() =>
                          deleteShopkeeper(
                            shopkeeper._id
                          )
                        }

                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl"

                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    </AdminLayout>

  );

}

export default Shopkeepers;