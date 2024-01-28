export default function useSubjectCode(item: string[]): string {
  //두 개 이상의 item을 가지고 있는 Array에서
  //GS 과목코드의 갯수가 전체 과목코드 갯수보다 적다 => 그때만 거름

  return item.find((i) => i.startsWith("GS")) ?? item[0];
}
