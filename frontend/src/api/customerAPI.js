// services/customerService.js

import {api} from "./axios";

export const getCustomers = async () => {
  const response = await api.get("/customer/all");
  return response.data;
};

export const createCustomer = async (customerData) => {
  const response = await api.post(
    "/customer/create",
    customerData
  );

  return response.data;
};