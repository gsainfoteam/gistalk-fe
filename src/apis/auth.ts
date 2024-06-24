import axiosInstance from "./axiosInstance";

const DEVELOPMENT = "local";
const STAGING = "web";

export const getToken = (authCode: string | null) => {
  const params = {
    code: authCode,
    type: import.meta.env.DEV ? DEVELOPMENT : STAGING,
  };

  return axiosInstance.get(`/user/login`, {
    params: params,
  });
};

export const getUserInfo = () => {
  return axiosInstance.get(`/user/info`);
};

export const getUserEvaluations = () => {
  return axiosInstance.get(`/record?type=user`);
};
