import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRED_TIME,
} from "@/constants/localStorageKeys";

export const useLogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN_EXPIRED_TIME);

    navigate("/");
    alert("로그아웃 되었습니다");
  };

  return handleLogout;
};
