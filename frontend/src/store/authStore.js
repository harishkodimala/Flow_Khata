import { create } from "zustand";
import { api } from "../api/axios";

export const useAuth = create((set) => ({

    /*
    =========================
    STATE
    =========================
    */

    user: null,

    currentUser: null,

    isAuthenticated: false,

    loading: false,

    initialized: false,

    error: null,

    /*
    =========================
    LOGIN
    =========================
    */

    login: async (email, password) => {

        set({

            loading: true,

            error: null

        });

        try {

            const response = await api.post(

                "/auth/login",

                {
                    email,
                    password
                }

            );

            set({

                user: response.data.user,

                currentUser: response.data.user,

                isAuthenticated: true,

                loading: false

            });

            return {

                success: true,

                message: "Login successful"

            };

        } catch (error) {

            set({

                loading: false,

                error:
                    error.response?.data?.message ||
                    "Login failed"

            });

            return {

                success: false,

                message:
                    error.response?.data?.message ||
                    "Login failed"

            };

        }

    },

    /*
    =========================
    REGISTER
    =========================
    */

    register: async (

        name,

        email,

        password,

        phone,

        role

    ) => {

        set({

            loading: true,

            error: null

        });

        try {

            await api.post(

                "/auth/register",

                {
                    name,
                    email,
                    password,
                    phone,
                    role
                }

            );

            set({

                loading: false

            });

            return {

                success: true,

                message: "Registration successful"

            };

        } catch (error) {

            set({

                loading: false,

                error:
                    error.response?.data?.message ||
                    "Registration failed"

            });

            return {

                success: false,

                message:
                    error.response?.data?.message ||
                    "Registration failed"

            };

        }

    },

    /*
    =========================
    LOGOUT
    =========================
    */

    logout: async () => {

        try {

            const response = await api.post(
                "/auth/logout"
            );

            set({

                user: null,

                currentUser: null,

                isAuthenticated: false

            });

            return {

                success: true,

                message:
                    response.data.message ||
                    "Logout successful"

            };

        } catch (error) {

            return {

                success: false,

                message:
                    error.response?.data?.message ||
                    "Logout failed"

            };

        }

    },

    /*
    =========================
    CHECK AUTH
    =========================
    */

    checkAuth: async () => {

        try {

            const response = await api.get(
                "/auth/me"
            );

            set({

                user: response.data.user,

                currentUser: response.data.user,

                isAuthenticated: true,

                initialized: true

            });

        } catch (error) {

            set({

                user: null,

                currentUser: null,

                isAuthenticated: false,

                initialized: true

            });

        }

    },

    /*
    =========================
    CLEAR ERROR
    =========================
    */

    clearError: () => {

        set({

            error: null

        });

    }

}));