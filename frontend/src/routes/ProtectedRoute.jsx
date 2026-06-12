import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../store/authStore.js";
import Loader from "../layouts/Loader.jsx";

function ProtectedRoute({

    children,

    allowedRoles = []

}) {

    const {

        isAuthenticated,

        user,

        initialized

    } = useAuth();
    if (!initialized) {

    return <Loader />;

}

    const location = useLocation();

    

    // Not logged in
    if (!isAuthenticated) {

        return <Navigate to="/login" replace />;

    }

    /*
    =========================
    FORCE PASSWORD CHANGE
    =========================
    */

    if (

        user?.role === "CUSTOMER" &&

        user?.mustChangePassword &&

        location.pathname !== "/customer/change-password"

    ) {

        return (

            <Navigate

                to="/customer/change-password"

                replace

            />

        );

    }

    /*
    =========================
    ROLE CHECK
    =========================
    */

    if (

        allowedRoles.length > 0 &&

        !allowedRoles.includes(user?.role)

    ) {

        return <Navigate to="/" replace />;

    }

    return children;

}

export default ProtectedRoute;