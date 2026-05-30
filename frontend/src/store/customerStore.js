import { create } from "zustand";

import { api } from "../api/axios";

export const useCustomerStore = create((set) => ({

    customers: [],

    loading: false,

    error: null,


    // FETCH CUSTOMERS
    fetchCustomers: async () => {

        set({
            loading: true,
            error: null
        });

        try {

            const response = await api.get(
                "/customer/all"
            );

            set({

                customers: response.data.customers

            });

        } catch (error) {

            console.error(error);

            set({

                error:
                    error.response?.data?.message
                    || "Failed to fetch customers"

            });

        } finally {

            set({
                loading: false
            });

        }

    },
    


    // CREATE CUSTOMER
    createCustomer: async (customerData) => {

        set({
            loading: true,
            error: null
        });

        try {

            const response = await api.post(
                "/customer/create",
                customerData
            );

            set((state) => ({

                customers: [

                    response.data.customer,

                    ...state.customers

                ]

            }));

        } catch (error) {

            console.error(error);

            set({

                error:
                    error.response?.data?.message
                    || "Failed to create customer"

            });

        } finally {

            set({
                loading: false
            });

        }

    }

}));