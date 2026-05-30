import { create } from "zustand";

import { api } from "../api/axios";

export const useTransactionStore = create((set) => ({

    transactions: [],

    loading: false,

    error: null,


    // FETCH TRANSACTIONS
    fetchTransactions: async (customerId) => {

        set({
            loading: true,
            error: null
        });

        try {

            const response = await api.get(
                `/transaction/${customerId}`
            );

            set({

                transactions:
                    response.data.transactions

            });

        } catch (error) {

            console.error(error);

            set({

                error:
                    error.response?.data?.message
                    || "Failed to fetch transactions"

            });

        } finally {

            set({
                loading: false
            });

        }

    },
    fetchMyTransactions: async () => {

    set({
        loading: true,
        error: null
    });

    try {

        const response = await api.get(
            "/dashboard/transactions"
        );

        set({

            transactions:
                response.data.transactions

        });

    } catch (error) {

        console.error(error);

        set({

            error:
                error.response?.data?.message
                || "Failed to fetch transactions"

        });

    } finally {

        set({
            loading: false
        });

    }

},


    // ADD TRANSACTION
    addTransaction: async (transactionData) => {

        set({
            loading: true,
            error: null
        });

        try {

            const response = await api.post(
                "/transaction/add",
                transactionData
            );

            set((state) => ({

                transactions: [

                    response.data.transaction,

                    ...state.transactions

                ]

            }));

        } catch (error) {

            console.error(error);

            set({

                error:
                    error.response?.data?.message
                    || "Failed to add transaction"

            });

        } finally {

            set({
                loading: false
            });

        }

    }

}));