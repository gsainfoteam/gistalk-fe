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

/**
 *
 * @param redirectPath 로그인 후 리다이렉트할 경로, null일 경우 메인 페이지로 리다이렉트한다.
 */
export const useLogin = (redirectPath: string | null) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const authCode = searchParams.get("code");

  const { isLoading, data, error } = useQuery({
    queryKey: [`getToken`],
    queryFn: () => getToken(authCode),
    retry: 0,
    enabled: !!authCode,
  });

  useEffect(() => {
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
      // localStorage.removeItem(REDIRECT_PATH); //리다이렉션 처리를 해주므로 localstorage에 저장된 값을 제거한다. strict mode에서는 에러가 발생한다.
      navigate(redirectPath ?? "/");
    }
  }, [error, isLoading, data]);

  useEffect(() => {
    //토큰이 존재하며 토큰이 만료되지 않은 경우에는 메인 페이지로 리다이렉트한다.
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
