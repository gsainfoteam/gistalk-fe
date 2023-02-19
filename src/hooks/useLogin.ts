import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { loginWithIdp } from "@/apis/authAPI";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store";

export const useLogin = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const authCode = searchParams.get("auth_code");

      if (authCode) {
        await loginWithIdp(authCode);
        searchParams.delete("auth_code");
        setSearchParams(searchParams);
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
