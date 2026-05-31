import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="border-t border-slate-800 bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}

          <div>

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black">

                K

              </div>

              <h1 className="text-xl font-black">

                Khata Flow

              </h1>

            </div>

            <p className="text-sm text-slate-400 leading-relaxed">

              Manage customer credit, due dates, payments,
              statements and reminders with a modern digital
              ledger platform.

            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="font-bold mb-4">

              Quick Links

            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-400">

              <Link
                to="/"
                className="hover:text-white transition"
              >

                Home

              </Link>

              <Link
                to="/about"
                className="hover:text-white transition"
              >

                About

              </Link>

              <Link
                to="/features"
                className="hover:text-white transition"
              >

                Features

              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition"
              >

                Contact

              </Link>

            </div>

          </div>

          {/* ACCOUNT */}

          <div>

            <h3 className="font-bold mb-4">

              Account

            </h3>

            <div className="flex flex-col gap-3 text-sm text-slate-400">

              <Link
                to="/login"
                className="hover:text-white transition"
              >

                Login

              </Link>

              <Link
                to="/register"
                className="hover:text-white transition"
              >

                Register

              </Link>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="font-bold mb-4">

              Contact

            </h3>

            <div className="space-y-3 text-sm text-slate-400">

              <p>

                📧
                {" "}
                kodimalaharish79@gmail.com

              </p>

              <p>

                📱
                {" "}
                +91 7993604056

              </p>

              <p>

                📍
                {" "}
                Hyderabad, India

              </p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="mt-14 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-400">

            © 2026 Khata Flow. All rights reserved.

          </p>

          <p className="text-sm text-slate-400 text-center">

            Built for shopkeepers, retailers and small businesses.

          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;