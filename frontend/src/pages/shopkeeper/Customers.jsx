import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";
import { FaWhatsapp } from "react-icons/fa";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [filteredCustomers, setFilteredCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [creatingCustomer, setCreatingCustomer] =
    useState(false);

  const [updatingCustomer, setUpdatingCustomer] =
    useState(false);

  const [deletingCustomer, setDeletingCustomer] =
    useState(null);

  const [resendingCustomer, setResendingCustomer] =
  useState(null);

  const [editingCustomer, setEditingCustomer] =
    useState(null);
  
  const [sendingStatement, setSendingStatement] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      phone: ""

    });

  const [editForm, setEditForm] =
    useState({

      name: "",

      phone: ""

    });

  const fetchCustomers = async () => {

    try {

      const response =
        await api.get(
          "/customer/all"
        );

      setCustomers(
        response.data.customers
      );

      setFilteredCustomers(
        response.data.customers
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch customers"
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCustomers();

  }, []);

  useEffect(() => {

    const filtered =
      customers.filter(

        (customer) =>

          customer.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          customer.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          customer.phone
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

      );

    setFilteredCustomers(
      filtered
    );

  }, [search, customers]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleAddCustomer = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {

      toast.error(
        "Customer name is required"
      );

      return;

    }

    if (!formData.email.trim()) {

      toast.error(
        "Email is required"
      );

      return;

    }

    if (!formData.email.includes("@")) {

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

    try {

      setCreatingCustomer(
        true
      );

      const response =
        await api.post(
          "/customer/create",
          {
            name:
              formData.name.trim(),

            email:
              formData.email.trim(),

            phone:
              formData.phone.trim()

          }
        );

      toast.success(
        response.data.message
      );

      if (
        response.data
          .temporaryPassword
      ) {

        toast(
          `Temporary Password: ${response.data.temporaryPassword}`,
          {
            duration: 15000
          }
        );

      }

      setFormData({

        name: "",

        email: "",

        phone: ""

      });

      fetchCustomers();

    } catch (error) {

      toast.error(

        error?.response?.data
          ?.message ||

        "Failed to create customer"

      );

    } finally {

      setCreatingCustomer(
        false
      );

    }

  };

  const handleEditClick =
    (customer) => {

      setEditingCustomer(
        customer
      );

      setEditForm({

        name:
          customer.name,

        phone:
          customer.phone

      });

    };

  const handleUpdateCustomer =
    async (e) => {

      e.preventDefault();

      try {

        setUpdatingCustomer(
          true
        );

        const response =
          await api.put(

            `/customer/update/${editingCustomer._id}`,

            {

              name:
                editForm.name,

              phone:
                editForm.phone

            }

          );

        toast.success(
          response.data.message
        );

        setEditingCustomer(
          null
        );

        fetchCustomers();

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Update failed"

        );

      } finally {

        setUpdatingCustomer(
          false
        );

      }

    };

  const handleDeleteCustomer =
    async (customerId) => {

      const confirmDelete =
        window.confirm(
          "Delete this customer?"
        );

      if (!confirmDelete)
        return;

      try {

        setDeletingCustomer(
          customerId
        );

        const response =
          await api.delete(

            `/customer/delete/${customerId}`

          );

        toast.success(
          response.data.message
        );

        fetchCustomers();

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Delete failed"

        );

      } finally {

        setDeletingCustomer(
          null
        );

      }

    };


const handleResendCredentials =
  async (customer) => {

    const confirmResend =
      window.confirm(
        `Send new credentials to ${customer.name}?`
      );

    if (!confirmResend)
      return;

    try {

      setResendingCustomer(
        customer._id
      );

      const response =
        await api.post(
          `/customer/resend-credentials/${customer._id}`
        );

      toast.success(
        response.data.message
      );

    } catch (error) {

      toast.error(

        error?.response?.data
          ?.message ||

        "Failed to resend credentials"

      );

    } finally {

      setResendingCustomer(
        null
      );

    }

  };


  const handleSendStatement =
  async (customer) => {

    const confirmSend =
      window.confirm(

        `Send statement to ${customer.name}?`

      );

    if (!confirmSend)
      return;

    try {

      setSendingStatement(
        customer._id
      );

      const response =
        await api.post(

          `/customer/send-statement/${customer._id}`

        );

      toast.success(
        response.data.message
      );
      console.log(
        "Send Statement Response:",
        response.data
      );

    } catch (error) {

      console.log("Send Statement Error:", error);

      toast.error(

        error?.response?.data
          ?.message ||

        "Failed to send statement"

      );

    } finally {

      setSendingStatement(
        null
      );

    }

  };

  const handleWhatsAppShare =
  (customer) => {

    if (!customer.phone) {

      toast.error(
        "Customer phone number not available"
      );

      return;

    }

    const phone =
      `91${customer.phone}`;

 const message = `KHATA FLOW PAYMENT REMINDER

Hello ${customer.name},

This is a reminder regarding your khata account.

--------------------------------

Customer: ${customer.name}

Phone: ${customer.phone}

Outstanding Balance: Rs.${customer.currentBalance}

Due Date: ${
  customer.nextDueDate
    ? new Date(
        customer.nextDueDate
      ).toLocaleDateString("en-IN")
    : "N/A"
}

Overdue Days: ${
  customer.overdueDays
}

--------------------------------

Please clear your pending amount at your earliest convenience.

If payment has already been made, kindly ignore this message.

Thank you.

Powered by Khata Flow`;


    const whatsappUrl =

`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappUrl,
      "_blank"
    );

  };

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="p-6 bg-slate-50 min-h-screen">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">

            Customers

          </h1>

          <p className="text-slate-500">

            Manage your customers

          </p>

        </div>

      </div>

      <div className="bg-white rounded-xl border p-6 mb-8">

        <h2 className="font-semibold text-lg mb-4">

          Add Customer

        </h2>

        <form
          onSubmit={handleAddCustomer}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Customer Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={
              creatingCustomer
            }
            className="bg-blue-600 text-white rounded-lg p-3"
          >

            {creatingCustomer
              ? "Creating..."
              : "Add Customer"}

          </button>

        </form>

      </div>

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full md:w-96 border rounded-lg p-3"
        />

      </div>

      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

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
                  Balance
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map(
                (customer) => (

                  <tr
                    key={customer._id}
                    className="border-t"
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

                    <td className="p-4 font-semibold">
                      ₹
                      {
                        customer.currentBalance
                      }
                    </td>

                    <td className="p-4">

                      {customer.currentBalance > 0 ? (

                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">

                          Pending

                        </span>

                      ) : (

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">

                          Clear

                        </span>

                      )}

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2 flex-wrap">

  <Link
    to={`/shopkeeper/ledger/${customer._id}`}
    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-sm rounded-lg transition"
  >
    📒 Ledger
  </Link>

  <button
    onClick={() =>
      handleEditClick(customer)
    }
    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-sm rounded-lg transition"
  >
    ✏️ Edit
  </button>

{customer.currentBalance > 0 && (

  <button
    onClick={() =>
      handleWhatsAppShare(
        customer
      )
    }
    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 text-sm rounded-lg transition flex items-center gap-2"
    title="Send WhatsApp Reminder"
  >

    <FaWhatsapp />

    WhatsApp

  </button>

)}

  <button
    onClick={() =>
      handleResendCredentials(customer)
    }
    className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 text-sm rounded-lg transition"
  >
    🔑 Resend
  </button>

  <button
    onClick={() =>
      handleSendStatement(customer)
    }
    disabled={
      sendingStatement ===
      customer._id
    }
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 text-sm rounded-lg transition"
  >

    {sendingStatement ===
    customer._id

      ? "Sending..."

      : "📧 Statement"}

  </button>

  <button
    onClick={() =>
      handleDeleteCustomer(
        customer._id
      )
    }
    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 text-sm rounded-lg transition"
  >
    🗑️ Delete
  </button>

</div>
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {editingCustomer && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">

              Edit Customer

            </h2>

            <form
              onSubmit={
                handleUpdateCustomer
              }
              className="space-y-4"
            >

              <input
                type="text"
                value={
                  editForm.name
                }
                onChange={(e) =>
                  setEditForm({

                    ...editForm,

                    name:
                      e.target.value

                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                value={
                  editForm.phone
                }
                onChange={(e) =>
                  setEditForm({

                    ...editForm,

                    phone:
                      e.target.value

                  })
                }
                className="w-full border rounded-lg p-3"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  disabled={
                    updatingCustomer
                  }
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
                >

                  {updatingCustomer
                    ? "Updating..."
                    : "Save"}

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setEditingCustomer(
                      null
                    )
                  }
                  className="flex-1 border py-3 rounded-lg"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}

export default Customers;