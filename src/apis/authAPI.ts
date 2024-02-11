import { UserInfo } from "@/Interfaces/interfaces";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";
import axios from "axios";

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

const DEVELOPMENT = "dev";
const STAGING = "stg";

export const getToken = async (authCode: string): Promise<LoginResponse> => {
  const params = {
    code: authCode,
    type: import.meta.env.DEV ? DEVELOPMENT : STAGING,
  };

  const { data } = await axios.get(
    `https://api.stg.gistalk.gistory.me/user/join`,
    {
      params: params,
    }
  );
  const { access_token: accessToken, expires_in: expiredTime } = data;

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(ACCESS_TOKEN_EXPIRED_TIME, Date.now() + expiredTime);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }

  return data;
};

export const getUserInfo = async (jwtToken: string): Promise<UserInfo> => {
  const { data } = await axios.get(
    `https://api.idp.gistory.me/idp/get_user_info?jwt_token=${jwtToken}`
  );

  return data;
};
