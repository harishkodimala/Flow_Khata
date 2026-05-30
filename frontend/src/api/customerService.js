import { api } from "./axios";

export const resendCredentials =
  async (customerId) => {

    const response =
      await api.post(

        `/customer/resend-credentials/${customerId}`

      );

    return response.data;

  };