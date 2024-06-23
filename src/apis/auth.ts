import axios from "axios";
import axiosInstance from "./axiosInstance";

const DEVELOPMENT = "local";
const STAGING = "web";

export const getToken = (authCode: string | null) => {
  const params = {
    code: authCode,
    type: import.meta.env.DEV ? DEVELOPMENT : STAGING,
  };

  return axios.get(`/api/user/login`, {
    params: params,
  });
};

export const getUserInfo = () => {
  return axiosInstance.get(`/api/user/info`);
};

export const getUserEvaluations = () => {
  return axiosInstance.get(`/api/record?type=user`);
};
