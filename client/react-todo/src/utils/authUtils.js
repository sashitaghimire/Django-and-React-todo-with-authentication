// authUtils.js

import { axiosInstance, setAuthToken } from "../services/api";

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("user/token/refresh/", {
      refresh: refreshToken,
    });

    const newAccessToken = response?.data?.access;
    setAuthToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

export { refreshAccessToken };
