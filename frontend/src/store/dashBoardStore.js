import { create } from "zustand";

import { api } from "../api/axios";

export const useDashboardStore = create((set) => ({

    dashboardData: null,

    loading: false,

    error: null,


    fetchDashboardData: async () => {

        set({
            loading: true,
            error: null
        });

        try {

            const response = await api.get(
                "/dashboard/shopkeeper"
            );

            set({

                dashboardData: response.data

            });

        } catch (error) {

            console.error(error);

            set({

                error:
                    error.response?.data?.message
                    || "Failed to fetch dashboard"

            });

        } finally {

            set({
                loading: false
            });

        }

    }

}));