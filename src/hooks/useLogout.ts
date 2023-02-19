import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/store";

export const useLogOut = () => {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExp");
    axios.defaults.headers.common["Authorization"] = "";
    setIsLoggedIn(false);
    navigate("/");
    alert("로그아웃 되었습니다");
  };

  return handleLogout;
};
