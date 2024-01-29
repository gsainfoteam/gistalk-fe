import { UserInfo } from "@/Interfaces/interfaces";
import axios from "axios";

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

const CLIENT_ID = "gistalk2024";
const CLIENT_SECRET = "Jok9Mv3N5khLbcRYSnWbC9MXHnIo7QG0";
const REDIRECT_URI = "http://127.0.0.1:5173/login";

export const loginWithIdp = async (
  authCode: string
): Promise<LoginResponse> => {
  const params = {
    code: authCode,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const { data } = await axios.post(
    `https://api.stg.gistalk.gistory.me/user/join`,
    null,
    {
      headers: headers,
      params: params,
    }
  );

  if (data.access_token) {
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("accessTokenExpiredTime", data.expires_in);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
  }

  return data;
};

export const getUserInfo = async (jwtToken: string): Promise<UserInfo> => {
  const { data } = await axios.get(
    `https://api.idp.gistory.me/idp/get_user_info?jwt_token=${jwtToken}`
  );

  return data;
};
