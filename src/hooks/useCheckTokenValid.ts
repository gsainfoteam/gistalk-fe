import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useCheckValidToken = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isTokenExist = localStorage.getItem(ACCESS_TOKEN) !== null;
  const isTokenTimeExist =
    localStorage.getItem(ACCESS_TOKEN_EXPIRED_TIME) !== null;
  const isTokenExpired =
    Date.now() >
    parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRED_TIME) || "0");

  useEffect(() => {
    if (
      !isTokenExist || //token time이 없거나
      !isTokenTimeExist || // token이 없거나
      isTokenExpired
    ) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(ACCESS_TOKEN_EXPIRED_TIME);
      // 로그인을 강제하는 경우 로그인 페이지로 이동
      // Alert를 해서 로그인을 하라는 권유 가능
      // navigate("/login");
    }
  }, [location.pathname]);
};
