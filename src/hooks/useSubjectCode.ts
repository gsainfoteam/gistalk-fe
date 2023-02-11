export default function useSubjectCode(item:string[]) {
    //GS가 포함되었다면 그걸 뺌
    return item.filter(i => i.slice(0,2) === "GS")[0]
}