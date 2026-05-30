import { href, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {

  return (

    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-100 flex items-center justify-center px-4">

      <div className="max-w-2xl text-center">

        <div className="relative">

          <h1 className="text-[120px] md:text-[180px] font-black text-slate-200 leading-none">

            404

          </h1>

          <div className="absolute inset-0 flex items-center justify-center">

            <span className="text-6xl md:text-8xl">

              📒

            </span>

          </div>

        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4">

          Oops! Page Not Found

        </h2>

        <p className="text-slate-500 mt-4 text-lg max-w-lg mx-auto">

          The page you're looking for doesn't exist,
          may have been moved, or the URL might be incorrect.

        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg"
          >

            <FaHome />

            Back To Home

          </Link>

          <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-2xl font-semibold transition shadow-lg">

            Contact Us

          </Link>

        </div>

        <div className="mt-12 bg-white border rounded-3xl p-6 shadow-sm">

          <h3 className="font-bold text-xl text-slate-800">

            Khata Flow

          </h3>

          <p className="text-slate-500 mt-2">

            Digital ledger management for shopkeepers,
            customer credit tracking, payment reminders,
            PDF statements, and business insights.

          </p>

        </div>

      </div>

    </div>

  );

}

export default NotFound;