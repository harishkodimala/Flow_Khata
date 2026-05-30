import { Navigate } from "react-router-dom";

import { useAuth } from "../store/authStore";

function PublicRoute({ children }) {

    const {

        isAuthenticated,

        user

    } = useAuth();

    if (isAuthenticated) {

        if (user?.role === "SHOPKEEPER") {

            return (
                <Navigate
                    to="/shopkeeper/dashboard"
                    replace
                />
            );

        }

        if (user?.role === "CUSTOMER") {

            return (
                <Navigate
                    to="/customer/profile"
                    replace
                />
            );

        }

    }

    return children;

}

export default PublicRoute;