import { REDIRECT_PATH } from "@/constants/localStorageKeys";
import { useLocation } from "react-router-dom";

export const useRedirect = () => {
  const { state } = useLocation();
  const redirectPath = state?.prevPath || null;

  if (redirectPath) {
    localStorage.setItem(REDIRECT_PATH, redirectPath);
    return redirectPath;
  } else {
    //페이지 이동 후 리다이렉트할 경로가 있는지 확인하고, 없다면 메인 페이지로 리다이렉트한다.
    return localStorage.getItem(REDIRECT_PATH) || "/";
  }
};
