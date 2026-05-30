import { Navigate } from "react-router-dom";

import { useAuth } from "../store/authStore";

function ProtectedRoute({

    children,

    allowedRole

}) {

    const {

        user,

        isAuthenticated,

        loading

    } = useAuth();

    // Loading state
    if (loading) {

        return (

            <div className="h-screen flex items-center justify-center">

                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>

            </div>

        );

    }

    // Not logged in
    if (!isAuthenticated) {

        return <Navigate to="/" />;

    }

    // Wrong role
    if (
        allowedRole &&
        user?.role !== allowedRole
    ) {

        return <Navigate to="/"  />;

    }

    return children;

}

export default ProtectedRoute;