// api.js

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export { axiosInstance, setAuthToken };
