// import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api/";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

import axios from "axios";

const client = axios.create({ baseURL: BASE_URL });
const token = localStorage?.getItem("token");

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionaly catch errors and add additional logging here
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
