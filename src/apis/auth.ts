import axios from "axios";

const DEVELOPMENT = "dev";
const STAGING = "stg";

export const getToken = (authCode: string | null) => {
  const params = {
    code: authCode,
    type: import.meta.env.DEV ? DEVELOPMENT : STAGING,
  };

  return axios.get(`${import.meta.env.VITE_API_URL}/user/join`, {
    params: params,
  });
};
