import axios, { AxiosInstance, isAxiosError } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_BASE_URL,
});

const TOKEN_KEY = "accessToken";
const NOT_AUTHORIZED_MESSAGE = "Unauthorized";

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      isAxiosError(error) &&
      error.response?.status === 401 &&
      error.response.data.message === NOT_AUTHORIZED_MESSAGE
    ) {
      localStorage.removeItem(TOKEN_KEY);
      alert("로그인 정보가 유효하지 않습니다. 로그인 후 사용해주세요.");
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
