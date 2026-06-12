import {
  FaChartPie,
  FaStore,
  FaUsers,
  FaSignOutAlt
} from "react-icons/fa";

import {
  NavLink,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../store/authStore";

function AdminSidebar() {

  const navigate =
    useNavigate();

  const logout =
    useAuth(
      state => state.logout
    );

  const handleLogout =
    async () => {

      await logout();

      navigate("/login");

    };

  const navClass =
    ({ isActive }) =>

      `flex items-center gap-3 px-4 py-3 rounded-xl transition

      ${

        isActive

          ? "bg-blue-600 text-white"

          : "hover:bg-slate-100"

      }`;

  return (

    <aside className="w-72 bg-white border-r min-h-screen p-5">

      <h1 className="text-2xl font-bold mb-8">

        Khata Flow Admin

      </h1>

      <nav className="space-y-2">

        <NavLink
          to="/admin/dashboard"
          className={navClass}
        >

          <FaChartPie />

          Dashboard

        </NavLink>

        <NavLink
          to="/admin/shopkeepers"
          className={navClass}
        >

          <FaStore />

          Shopkeepers

        </NavLink>

        <NavLink
          to="/admin/customers"
          className={navClass}
        >

          <FaUsers />

          Customers

        </NavLink>

      </nav>

      <button

        onClick={handleLogout}

        className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 text-white w-full"

      >

        <FaSignOutAlt />

        Logout

      </button>

    </aside>

  );

}

export default AdminSidebar;