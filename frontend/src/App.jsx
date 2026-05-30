import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Features from "./pages/public/Features";
import Contact from "./pages/public/Contact";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/shopkeeper/Dashboard";
import Customers from "./pages/shopkeeper/Customers";
import Ledger from "./pages/shopkeeper/Ledger";
import Analytics from "./pages/shopkeeper/Analytics";
import Settings from "./pages/shopkeeper/Settings";

import Profile from "./pages/customer/Profile";
import Transactions from "./pages/customer/Transactions";
import ChangePassword from "./pages/customer/ChangePassword";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import NotFound from "./pages/NotFound";

import { useAuth } from "./store/authStore";

import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [

      /* Public Routes */

      {
        index: true,
        element: <Home />
      },

      {
        path: "about",
        element: <About />
      },

      {
        path: "features",
        element: <Features />
      },

      {
        path: "contact",
        element: <Contact />
      },

      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },

      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        )
      },

      /* Shopkeeper Routes */

      {
        path: "shopkeeper/dashboard",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "SHOPKEEPER"
            ]}
          >
            <Dashboard />
          </ProtectedRoute>
        )
      },

      {
        path: "shopkeeper/customers",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "SHOPKEEPER"
            ]}
          >
            <Customers />
          </ProtectedRoute>
        )
      },

      {
        path: "shopkeeper/ledger/:id",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "SHOPKEEPER"
            ]}
          >
            <Ledger />
          </ProtectedRoute>
        )
      },

      {
        path: "shopkeeper/analytics",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "SHOPKEEPER"
            ]}
          >
            <Analytics />
          </ProtectedRoute>
        )
      },

      {
        path: "shopkeeper/settings",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "SHOPKEEPER"
            ]}
          >
            <Settings />
          </ProtectedRoute>
        )
      },

      /* Customer Routes */

      {
        path: "customer/profile",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "CUSTOMER"
            ]}
          >
            <Profile />
          </ProtectedRoute>
        )
      },

      {
        path: "customer/transactions",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "CUSTOMER"
            ]}
          >
            <Transactions />
          </ProtectedRoute>
        )
      },

      {
        path: "customer/change-password",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "CUSTOMER"
            ]}
          >
            <ChangePassword />
          </ProtectedRoute>
        )
      },

      /* 404 */

      {
        path: "*",
        element: <NotFound />
      }

    ]
  }
]);

function App() {

  const checkAuth =
    useAuth(
      (state) =>
        state.checkAuth
    );

  const initialized =
    useAuth(
      (state) =>
        state.initialized
    );

  useEffect(() => {

    checkAuth();

  }, [checkAuth]);

  if (!initialized) {

    return (

      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">

        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-slate-600">

          Loading...

        </p>

      </div>

    );

  }

  return (

    <>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <ErrorBoundary>

      <RouterProvider
        router={routerObj}
      />
        </ErrorBoundary>

    </>

  );

}

export default App;