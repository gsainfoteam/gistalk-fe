import { ISortOption } from "@/Interfaces/interfaces";
import useSubjectCode from "@/hooks/useSubjectCode";
import { tempdb } from "@/tempdb/tempdb";

export const tempClassList = tempdb.map((i) => {
  /** 평균 점수 계산 */
  let avgScore: number = 0;
  i.hexData.map((j) => (avgScore += j.score));
  avgScore /= 6;
  let avgScoreStr: string = (
    Math.round((avgScore + Number.EPSILON) * 100) / 100
  ).toFixed(1); //소수점 둘째자리에서 반올림, 소수점 고정

  return {
    id: i.id,
    subjectCode: useSubjectCode(i.subjectCode),
    professorName: i.professorName,
    subjectName: i.subjectName,
    subjectScore: avgScoreStr,
    subjectScoreNum: avgScore, //평균점수
    stdData: i.hexData,
  };
});

/** 정렬을 어떻게 할지 선택할 수 있는 리스트: std 기준으로 sort*/
export const sortList: { id: number; content: string; std: ISortOption }[] = [
  { id: 1, content: "수업 쉬운 순", std: "수업 난이도" },
  { id: 2, content: "유익한 순", std: "유익함" },
  { id: 3, content: "성적 만족도 순", std: "성적 만족도" },
  { id: 4, content: "과제 적은 순", std: "과제량" },
  { id: 5, content: "수업 재밌는 순", std: "재미 / 흥미" },
  { id: 6, content: "강의력 좋은 순", std: "강의력" },
];
