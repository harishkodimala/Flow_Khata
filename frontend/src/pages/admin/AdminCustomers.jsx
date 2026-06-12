import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

function AdminCustomers() {

  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers =
    async () => {

      try {

        const response =
          await api.get(
            "/admin/customers"
          );

        setCustomers(
          response.data.customers
        );

      } catch {

        toast.error(
          "Failed to load customers"
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      </div>

    );

  }

  return (

    <AdminLayout>

      <div className="min-h-screen bg-slate-50 p-4 md:p-6">

      <div className="bg-white rounded-3xl p-6 shadow-sm border">

        <h1 className="text-3xl font-bold">

          Customers

        </h1>

        <p className="text-slate-500 mt-2">

          View all customers across the platform.

        </p>

      </div>

      <div className="mt-6 bg-white rounded-3xl border shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-100">

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Shopkeeper
                </th>

                <th className="p-4 text-left">
                  Balance
                </th>

                <th className="p-4 text-left">
                  Joined
                </th>

              </tr>

            </thead>

            <tbody>

              {customers.map(
                (customer) => (

                  <tr
                    key={
                      customer._id
                    }
                    className="border-t"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">

                          <FaUser />

                        </div>

                        <div>

                          <p className="font-medium">

                            {customer.name}

                          </p>

                          <p className="text-sm text-slate-500">

                            {customer.email}

                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">

                      {customer.createdBy?.name || "-"}

                    </td>

                    <td className="p-4">

                      ₹{new Intl.NumberFormat(
                        "en-IN"
                      ).format(
                        customer.currentBalance
                      )}

                    </td>

                    <td className="p-4">

                      {new Date(
                        customer.createdAt
                      ).toLocaleDateString()}

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

export default AdminCustomers;