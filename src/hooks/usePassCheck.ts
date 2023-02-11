import passList from "../tempdb/pass.json"

export default function usePassCheck(mail:string) {
    return !!passList.find(i => i === mail)
}