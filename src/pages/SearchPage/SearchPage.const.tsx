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
