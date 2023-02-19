import axios from "axios";

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

interface LoginResponse {
  jwtToken: string;
}
