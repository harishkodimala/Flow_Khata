import {
  FaUserPlus,
  FaWallet,
  FaBell,
  FaFilePdf
} from "react-icons/fa";

function HowItWorks() {

  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Add Customers",
      desc: "Create customer accounts and track credit balances."
    },
    {
      icon: <FaWallet />,
      title: "Record Transactions",
      desc: "Add credit and payment entries with due dates."
    },
    {
      icon: <FaBell />,
      title: "Send Reminders",
      desc: "Share WhatsApp reminders instantly."
    },
    {
      icon: <FaFilePdf />,
      title: "Generate Statements",
      desc: "Send professional PDF statements by email."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            How Khata Flow Works
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Manage customer credit, payments and statements in four simple steps.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border p-8 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-5">
                {step.icon}
              </div>

              <h3 className="font-bold text-lg mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
