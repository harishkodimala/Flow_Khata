import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

import { api } from "../../api/axios";
import toast from "react-hot-toast";

function Contact() {

  const [sending, setSending] =
    useState(false);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      message: ""

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        !formData.name.trim()
      ) {

        toast.error(
          "Name is required"
        );

        return;

      }

      if (
        !formData.email.trim()
      ) {

        toast.error(
          "Email is required"
        );

        return;

      }

      if (
        !formData.message.trim()
      ) {

        toast.error(
          "Message is required"
        );

        return;

      }

      try {

        setSending(true);

        const response =
          await api.post(

            "customer/contact/send",

            formData

          );

        toast.success(
          response.data.message
        );

        setFormData({

          name: "",

          email: "",

          message: ""

        });

      } catch (error) {

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to send message"

        );

      } finally {

        setSending(false);

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">

      {/* Hero Section */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">

            Contact Khata Flow

          </span>

          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-6">

            We'd Love To

            <br />

            Hear From You

          </h1>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">

            Have questions, suggestions, or need support?
            Reach out to the Khata Flow team and we'll get
            back to you as soon as possible.

          </p>

        </div>

      </section>

      {/* Main Section */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Contact Info */}

          <div className="bg-white rounded-3xl p-8 border shadow-sm">

            <h2 className="text-3xl font-bold mb-8">

              Get In Touch

            </h2>

            <div className="space-y-8">

              <div className="flex items-start gap-4">

                <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">

                  <FaEnvelope />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">

                    Email

                  </h3>

                  <p className="text-slate-600">

                    kodimalaharish79@gmail.com

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="bg-green-100 text-green-600 p-4 rounded-2xl">

                  <FaPhoneAlt />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">

                    Phone

                  </h3>

                  <p className="text-slate-600">

                    +91 7993604056

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="bg-orange-100 text-orange-600 p-4 rounded-2xl">

                  <FaMapMarkerAlt />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">

                    Location

                  </h3>

                  <p className="text-slate-600">

                    Hyderabad, India

                  </p>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">

                  ⏰

                </div>

                <div>

                  <h3 className="font-semibold text-lg">

                    Support Hours

                  </h3>

                  <p className="text-slate-600">

                    Monday - Saturday

                    <br />

                    9:00 AM - 6:00 PM

                  </p>

                </div>

              </div>

            </div>

            {/* Extra Card */}

            <div className="mt-10 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-6 text-white">

              <h3 className="text-xl font-bold">

                Need Quick Help?

              </h3>

              <p className="mt-3 text-blue-100">

                Send us your query using the contact form and
                we'll respond as quickly as possible.

              </p>

            </div>

          </div>

          {/* Contact Form */}

          <div className="bg-white rounded-3xl p-8 border shadow-sm">

            <h2 className="text-3xl font-bold mb-8">

              Send a Message

            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Full Name

                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your name"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              <div>

                <label className="block text-sm font-semibold mb-2">

                  Message

                </label>

                <textarea
                  rows="6"
                  name="message"
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Type your message..."
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
              >

                {sending
                  ? "Sending Message..."
                  : "Send Message"}

              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Footer Note */}

      <section className="pb-12">

        <p className="text-center text-slate-500 px-4">

          Khata Flow helps shopkeepers manage customer credit,
          payments, statements and reminders efficiently.

        </p>

      </section>

    </div>

  );

}

export default Contact;