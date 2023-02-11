export default function useSubjectCode(item:string[]):string {
    //두 개 이상의 item을 가지고 있는 Array에서
    //GS 과목코드의 갯수가 전체 과목코드 갯수보다 적다 => 그때만 거름

    if(item.length >= 2 && item.filter(i => i.slice(0,2) === "GS").length < item.length){
        return item.filter(i => i.slice(0,2) !== "GS")[0]
    }
    else {
        return item[0]
    }
}