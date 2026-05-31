import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../store/authStore";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const currentUser = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const logout = useAuth((state) => state.logout);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
    closeMobileMenu();
  };

  // Determine navigation links based on auth and role
  let navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
    { name: "How It Works", path: "/how-it-works" },
  ];

  if (isAuthenticated && currentUser) {
    if (currentUser.role === "SHOPKEEPER") {
      navLinks = [
        { name: "Dashboard", path: "/shopkeeper/dashboard" },
        { name: "Customers", path: "/shopkeeper/customers" },
        { name: "Analytics", path: "/shopkeeper/analytics" },
        { name: "Settings", path: "/shopkeeper/settings" },
      ];
    } else if (currentUser.role === "CUSTOMER") {
      navLinks = [
        { name: "Profile", path: "/customer/profile" },
        { name: "Transactions", path: "/customer/transactions" },
      ];
    }
  }

  const getLogoPath = () => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === "SHOPKEEPER") {
        return "/shopkeeper/dashboard";
      } else if (currentUser.role === "CUSTOMER") {
        return "/customer/profile";
      }
    }
    return "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200/40 transition-all duration-300 shadow-sm shadow-slate-100/50">
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* LOGO */}
          <Link
            to={getLogoPath()}
            onClick={closeMobileMenu}
            className="flex items-center gap-3 group transition-transform duration-200 active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/30 group-hover:rotate-6 transition-all duration-300">
              <FaRupeeSign className="text-lg" />
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300">
                KhataFlow
              </span>
              <span className="text-[10px] font-bold tracking-wider text-emerald-600/80 uppercase">
                Digital Ledger
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 font-semibold"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="h-5 w-[1px] bg-slate-200/80 mx-2" />

            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-3 ml-2">
                <div className="px-3.5 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-700 flex items-center gap-2 border border-slate-200/50">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm shadow-emerald-500/10">
                    {currentUser.name ? currentUser.name.charAt(0) : "U"}
                  </div>
                  <span className="truncate max-w-[120px]">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 active:scale-95 transition-all duration-200"
                  title="Logout"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                    }`
                  }
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  className="ml-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full shadow-md shadow-emerald-500/15 hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          {/* MOBILE MENU TOGGLE BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 active:scale-95 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <FiX className="text-2xl text-slate-800" />
            ) : (
              <FiMenu className="text-2xl text-slate-800" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN NAVIGATION */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 top-16 z-40 bg-slate-900/10 backdrop-blur-sm md:hidden"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-xl px-6 py-6"
            >
              <div className="flex flex-col gap-2">
                {isAuthenticated && currentUser && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-xl border border-slate-200/40 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center font-bold text-sm uppercase shadow-sm">
                      {currentUser.name ? currentUser.name.charAt(0) : "U"}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</span>
                      <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase">
                        {currentUser.role === "SHOPKEEPER" ? "Shopkeeper" : "Customer"}
                      </span>
                    </div>
                  </div>
                )}

                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}

                <hr className="my-3 border-slate-100" />

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="flex flex-col gap-3 pt-1"
                >
                  {isAuthenticated && currentUser ? (
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/70 rounded-xl transition-all duration-200"
                    >
                      <FiLogOut className="text-lg" />
                      Logout
                    </button>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `block text-center px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                          }`
                        }
                      >
                        Login
                      </NavLink>

                      <Link
                        to="/register"
                        onClick={closeMobileMenu}
                        className="block text-center py-3 px-4 font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 active:from-emerald-600 active:to-teal-700 rounded-xl shadow-md shadow-emerald-500/10 transition-all duration-200"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;


/* ADD TO NAV LINKS: { name: 'How It Works', path: '/how-it-works' } */
