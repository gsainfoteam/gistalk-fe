import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { getToken } from "@/apis/auth";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const { isLoading, data, error } = useQuery({
    queryKey: [`getToken`],
    queryFn: () => getToken(authCode),
    retry: 0,
  });

  if (error) {
    console.error(error.message);
  } else if (!isLoading && data) {
    const { data: tokenData } = { ...data };

    const { access_token: accessToken, expires_in: expiredTime } =
      tokenData as LoginResponse;

    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(
      ACCESS_TOKEN_EXPIRED_TIME,
      `${Date.now() + expiredTime * 1000}` // expiredTime이 초 단위로 오기 때문에 1000을 곱해준다.
    );
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;
    window.location.href = "/";
  }

  useEffect(() => {
    if (
      localStorage.getItem(ACCESS_TOKEN_EXPIRED_TIME) &&
      localStorage.getItem(ACCESS_TOKEN) &&
      Date.now() <
        parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRED_TIME) || "0")
    ) {
      navigate("/");
    }
  }, []);
};
