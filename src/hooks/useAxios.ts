import axios from "axios";


export function useAxios(url:string) {
    return axios(url)
}