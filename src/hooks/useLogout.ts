import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { isLoggedInAtom, userInfoAtom } from "@/store";

export const useLogOut = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const resetUserInfo = useResetAtom(userInfoAtom);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExp");
    axios.defaults.headers.common["Authorization"] = "";
    setIsLoggedIn(false);
    resetUserInfo();
    navigate("/");
    alert("로그아웃 되었습니다");
  };

  return handleLogout;
};
