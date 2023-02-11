import { useNavigate } from "react-router-dom";
import passList from "../tempdb/pass.json";

export function isValidEmail(mail: string) {
  if (!!passList.find((i) => i === mail)) {
    localStorage.setItem("gisTalkEmail", mail);
    return 1;
  }
  return 2;
}

export function checkVaildEmail() {
  const userEmail = localStorage.getItem("gisTalkEmail");

  if (!!!passList.find((i) => i === userEmail)) {
    alert("유효하지 않은 이메일로 접근했습니다. 이메일을 다시 확인해주세요");
    window.location.replace("/");
  }
}
