import { UserInfo } from "@/Interfaces/interfaces";
import axios from "axios";

interface LoginResponse {
  jwt_token: string;
}

export const loginWithIdp = async (
  authCode: string
): Promise<LoginResponse> => {
  const { data } = await axios.get(
    `https://api.idp.gistory.me/idp/get_token?auth_code=${authCode}`
  );

  if (data.jwt_token) {
    localStorage.setItem("accessToken", data.jwt_token);
    localStorage.setItem("accessTokenExp", `${Date.now() + 3600000}`);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.jwt_token}`;
  }

  return data;
};

export const getUserInfo = async (jwtToken: string): Promise<UserInfo> => {
  const { data } = await axios.get(
    `https://api.idp.gistory.me/idp/get_user_info?jwt_token=${jwtToken}`
  );

  return data;
};
