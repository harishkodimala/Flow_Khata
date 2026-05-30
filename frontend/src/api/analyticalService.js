import { api } from "./axios";

export const getAnalyticsData = async () => {
  const response = await api.get("/dashboard/shopkeeper");
  return response.data;
};