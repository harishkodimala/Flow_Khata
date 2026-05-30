import {
  FaUsers,
  FaWallet,
  FaBell,
  FaWhatsapp,
  FaFilePdf,
  FaChartLine,
  FaCalendarAlt,
  FaShieldAlt
} from "react-icons/fa";

function Features() {

  const features = [

    {
      icon: <FaUsers />,
      title: "Customer Management",
      description:
        "Add, update, view and manage all customer records from a centralized dashboard."
    },

    {
      icon: <FaWallet />,
      title: "Credit & Payment Tracking",
      description:
        "Record credit and payment transactions while automatically updating customer balances."
    },

    {
      icon: <FaCalendarAlt />,
      title: "Due Date Tracking",
      description:
        "Assign due dates to credit transactions and monitor pending payments easily."
    },

    {
      icon: <FaBell />,
      title: "Overdue Monitoring",
      description:
        "Identify overdue customers instantly and take action before balances accumulate."
    },

    {
      icon: <FaWhatsapp />,
      title: "WhatsApp Reminders",
      description:
        "Send personalized payment reminders directly through WhatsApp with a single click."
    },

    {
      icon: <FaFilePdf />,
      title: "PDF Statements",
      description:
        "Generate professional customer statements and share them via email."
    },

    {
      icon: <FaChartLine />,
      title: "Business Analytics",
      description:
        "Track customer balances, payments, credits and business performance through analytics."
    },

    {
      icon: <FaShieldAlt />,
      title: "Secure Authentication",
      description:
        "Protected login system with role-based access control for shopkeepers and customers."
    }

  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">

        <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium">

          Powerful Features

        </span>

        <h1 className="text-5xl md:text-6xl font-black mt-6 text-slate-900">

          Everything You Need

          <br />

          To Manage Customer Credit

        </h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">

          Khata Flow simplifies customer credit management,
          payment tracking, reminders, statements, and business analytics
          so you can focus on growing your business.

        </p>

      </section>

      {/* Features Grid */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >

              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-5">

                {feature.icon}

              </div>

              <h3 className="text-xl font-bold text-slate-800">

                {feature.title}

              </h3>

              <p className="text-slate-500 mt-3 leading-relaxed">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Benefits Section */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-white rounded-3xl p-10 border shadow-sm">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                Why Shopkeepers Choose

                <br />

                Khata Flow

              </h2>

              <p className="mt-6 text-slate-600 leading-relaxed">

                Traditional notebooks can be difficult to manage and often
                lead to missing records or delayed payments. Khata Flow
                digitizes the entire process and helps businesses stay organized.

              </p>

            </div>

            <div className="space-y-4">

              <div className="bg-slate-50 rounded-2xl p-4">

                ✓ Track customer balances in real time

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                ✓ Generate and share PDF statements

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                ✓ Monitor overdue payments easily

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                ✓ Send WhatsApp payment reminders

              </div>

              <div className="bg-slate-50 rounded-2xl p-4">

                ✓ Secure and role-based access

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-slate-900 rounded-3xl text-white p-10">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>

              <h3 className="text-4xl font-bold">

                100%

              </h3>

              <p className="text-slate-400 mt-2">

                Digital Records

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold">

                Real-Time

              </h3>

              <p className="text-slate-400 mt-2">

                Balance Updates

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold">

                Secure

              </h3>

              <p className="text-slate-400 mt-2">

                Authentication

              </p>

            </div>

            <div>

              <h3 className="text-4xl font-bold">

                Easy

              </h3>

              <p className="text-slate-400 mt-2">

                Customer Management

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center text-white">

          <h2 className="text-4xl font-bold">

            Ready To Simplify Your Business?

          </h2>

          <p className="mt-4 text-blue-100">

            Start tracking customer credit, payments, and statements with Khata Flow.

          </p>

        </div>

      </section>

    </div>

  );

}

export default Features;