import passList from "../tempdb/pass.json";

export default function isValidEmail(mail: string) {
  if (!!passList.find((i) => i === mail)) {
    localStorage.setItem("gisTalkEmail", mail);
    return 1;
  }
  return 2;
}
