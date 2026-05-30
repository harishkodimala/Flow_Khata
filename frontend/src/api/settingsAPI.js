import { api }
from "./axios";

export const getProfile =
  async () => {

    const response =
      await api.get(
        "/settings/profile"
      );

    return response.data;

};

export const updateProfile =
  async (data) => {

    const response =
      await api.put(
        "/settings/profile",
        data
      );

    return response.data;

};

export const changePassword =
  async (data) => {

    const response =
      await api.put(
        "/settings/change-password",
        data
      );

    return response.data;

};