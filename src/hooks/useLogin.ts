import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getToken, getUserInfo } from "@/apis/authAPI";
import { useAtom } from "jotai";
import { isLoggedInAtom, userInfoAtom } from "@/store";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";

export const useLogin = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const authCode = searchParams.get("code");

      console.log("get authcode", authCode);

      if (authCode) {
        const { access_token: accessToken } = await getToken(authCode);

        searchParams.delete("code");
        setSearchParams(searchParams);
        //TODO: 유저 정보 로드
        // const userInfo = await getUserInfo(accessToken);
        // console.log(userInfo);
        // setUserInfo(userInfo);
      }

      //check if token is expired
      if (
        localStorage.getItem(ACCESS_TOKEN_EXPIRED_TIME) &&
        localStorage.getItem(ACCESS_TOKEN) &&
        Date.now() <
          parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRED_TIME) || "0")
      ) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;

        setIsLoggedIn(true);
        navigate("/");
      } else {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(ACCESS_TOKEN_EXPIRED_TIME);
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    fetchData();
  }, []);
};
