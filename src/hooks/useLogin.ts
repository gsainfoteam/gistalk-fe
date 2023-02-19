import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getUserInfo, loginWithIdp } from "@/apis/authAPI";
import { useAtom } from "jotai";
import { isLoggedInAtom, userInfoAtom } from "@/store";

export const useLogin = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setUserInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const authCode = searchParams.get("auth_code");

      if (authCode) {
        const { jwt_token } = await loginWithIdp(authCode);

        searchParams.delete("auth_code");
        setSearchParams(searchParams);
        const userInfo = await getUserInfo(jwt_token);
        //여기서부터 안됨
        console.log(userInfo);

        setUserInfo(userInfo);

        navigate("/search");
      } //TODO authCode는 일회용이므로 새로고침/뒤로가기 대응 필요

      //check if token is expired
      if (
        localStorage.getItem("accessTokenExp") &&
        localStorage.getItem("accessToken") &&
        Date.now() < parseInt(localStorage.getItem("accessTokenExp") || "0")
      ) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("accessToken")}`;

        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExp");
        setIsLoggedIn(false);
        navigate("/");
      }
    };

    fetchData();
  }, []);
};
