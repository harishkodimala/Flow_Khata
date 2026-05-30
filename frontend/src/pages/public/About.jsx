import {
  FaUsers,
  FaWallet,
  FaWhatsapp,
  FaFilePdf,
  FaChartLine,
  FaShieldAlt
} from "react-icons/fa";

function About() {

  const features = [

    {
      icon: <FaUsers />,
      title: "Customer Management",
      description:
        "Easily add, manage, and track all your customers in one place."
    },

    {
      icon: <FaWallet />,
      title: "Credit Tracking",
      description:
        "Record credit transactions and monitor outstanding balances effortlessly."
    },

    {
      icon: <FaWhatsapp />,
      title: "WhatsApp Reminders",
      description:
        "Send payment reminders directly through WhatsApp with a single click."
    },

    {
      icon: <FaFilePdf />,
      title: "PDF Statements",
      description:
        "Generate and share professional customer statements instantly."
    },

    {
      icon: <FaChartLine />,
      title: "Business Analytics",
      description:
        "Get insights into revenue, payments, customer balances, and growth."
    },

    {
      icon: <FaShieldAlt />,
      title: "Secure Platform",
      description:
        "Protected authentication and role-based access for secure business management."
    }

  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100">

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">

          <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium">

            About Khata Flow

          </span>

          <h1 className="text-5xl md:text-6xl font-black mt-6 text-slate-900">

            Modern Credit Management

            <br />

            For Small Businesses

          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">

            Khata Flow helps shopkeepers and small businesses manage customer credit,
            track payments, generate statements, send reminders, and gain valuable
            business insights — all from one platform.

          </p>

        </div>

      </section>

      {/* Mission Section */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-white rounded-3xl p-10 shadow-sm border">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <h2 className="text-4xl font-bold text-slate-900">

                Our Mission

              </h2>

              <p className="mt-6 text-slate-600 leading-relaxed">

                Many local businesses still rely on traditional notebooks
                to manage customer credit. This often leads to lost records,
                payment confusion, and inefficient tracking.

              </p>

              <p className="mt-4 text-slate-600 leading-relaxed">

                Khata Flow digitizes the entire process, making credit management
                faster, smarter, and more reliable while remaining simple enough
                for everyday business use.

              </p>

            </div>

            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-10 text-white">

              <h3 className="text-3xl font-bold">

                Why Choose Khata Flow?

              </h3>

              <ul className="mt-6 space-y-4">

                <li>✓ Easy customer management</li>

                <li>✓ Track outstanding balances</li>

                <li>✓ Generate PDF statements</li>

                <li>✓ WhatsApp payment reminders</li>

                <li>✓ Analytics dashboard</li>

                <li>✓ Secure authentication</li>

              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-slate-900">

            Key Features

          </h2>

          <p className="text-slate-500 mt-3">

            Everything you need to manage customer credit efficiently.

          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-lg transition"
            >

              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl mb-5">

                {feature.icon}

              </div>

              <h3 className="text-xl font-bold">

                {feature.title}

              </h3>

              <p className="text-slate-500 mt-3">

                {feature.description}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-slate-900 rounded-3xl text-white p-10">

          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>

              <h3 className="text-5xl font-bold">

                100%

              </h3>

              <p className="mt-2 text-slate-400">

                Digital Credit Tracking

              </p>

            </div>

            <div>

              <h3 className="text-5xl font-bold">

                24/7

              </h3>

              <p className="mt-2 text-slate-400">

                Access To Business Records

              </p>

            </div>

            <div>

              <h3 className="text-5xl font-bold">

                Secure

              </h3>

              <p className="mt-2 text-slate-400">

                Authentication & Data Protection

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center text-white">

          <h2 className="text-4xl font-bold">

            Start Managing Credit Smarter

          </h2>

          <p className="mt-4 text-blue-100">

            Join Khata Flow and simplify your business operations today.

          </p>

        </div>

      </section>

    </div>

  );

}

export default About;