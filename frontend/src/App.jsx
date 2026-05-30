import React, { useEffect } from 'react';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import RootLayout from './components/RootLayout';
import Home from './components/Home';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Dashboard from './pages/shopkeeper/Dashboard';

import MyProfile from './pages/customer/MyProfile';

import Customers from './pages/shopkeeper/Customers';
import ProtectedRoute from './routes/ProtectedRoute';
import Ledger from "./pages/shopkeeper/Ledger";
import MyTransactions from "./pages/customer/MyTransactions";
import About from "./components/About";

import { useAuth } from './store/authStore';


function App() {

  const fetchUser = useAuth(
    (state) => state.fetchUser
  );

  const checkAuth = useAuth(
    (state) => state.checkAuth
  );

  useEffect(() => {

    checkAuth();

  }, []);


  const routerObj = createBrowserRouter([

    {
      path: '/',

      element: <RootLayout />,

      children: [

        // HOME
        {
          path: '',

          element: <Home />
        },


        // LOGIN
        {
          path: 'login',

          element: <Login />
        },


        // REGISTER
        {
          path: 'register',

          element: <Register />
        },


        // SHOPKEEPER DASHBOARD
        {
          path: 'shopkeeper/dashboard',

          element: (

            <ProtectedRoute
              allowedRole="SHOPKEEPER"
            >

              <Dashboard />

            </ProtectedRoute>

          )
        },
        {
          path:'about',

          element: <About />
        },
        {
  path: 'customer/transactions',

  element: (

    <ProtectedRoute
      allowedRole="CUSTOMER"
    >

      <MyTransactions />

    </ProtectedRoute>

  )
},



        // CUSTOMER PROFILE
        {
          path: 'customer/profile',

          element: (

            <ProtectedRoute
              allowedRole="CUSTOMER"
            >

              <MyProfile />

            </ProtectedRoute>

          )
        },
        
        {
            path: 'shopkeeper/customers',

            element: (

              <ProtectedRoute
                      allowedRole="SHOPKEEPER"
              >

                 <Customers />

              </ProtectedRoute>

  )
},{
  path: 'shopkeeper/ledger/:customerId',

  element: (

    <ProtectedRoute
      allowedRole="SHOPKEEPER"
    >

      <Ledger />

    </ProtectedRoute>

  )
}

      ]
    }

  ]);


  return (

    <>

      <RouterProvider router={routerObj} />

    </>

  );

}

export default App;