import { lectureInfo, recordInfo } from "@/Interfaces/interfaces";
import { HexagonData } from "./EvaluationPage.const";

type makeSelectedData = (
  selectedId: (number | null)[],
  selectedData: HexagonData[],
  profEvaluation: any
) => HexagonData[];

type makeReviewData = (
  selectedId: (number | null)[],
  selectedReview: recordInfo[][],
  reviewList: any
) => recordInfo[][];

type makeIsEvaluationEmpty = (
  selectedId: (number | null)[],
  selectedEvaluation: HexagonData[]
) => (number | null)[];

type noProfData = (
  lectureInfo: any,
  emptyValues: number[],
  empty: number | null
) => string | null;

/**
 * 선택된 교수들의 총 리뷰 개수를 구한다. 
 * 
 * @param {recordInfo[][]} selectedReview -교수별 리뷰들이 담긴 2차원 배열
 * @return {number} -배열의 총 길이
 */
export const reviewAmount = (selectedReview: recordInfo[][]) => {
    let count = 0;
    selectedReview.map((review) => count += review.length)

    return count;
  };

  /**
   * 선택한 교수의 강의평 점수를 저장하여 반환함
   * 
   * @param selectedId 
   * @param selectedData 
   * @param profEvaluation 
   * @returns 
   */
export const makeSelectedData: makeSelectedData = (selectedId, selectedData, profEvaluation) => {
  selectedId.map((select, index) =>
    select != null
      ? (selectedData[index] = profEvaluation[index]?.data)
      : null
  );
  return selectedData;
}

/**
 * 선택한 교수의 리뷰 내용을 저장하여 반환함
 * 
 * @param selectedId 
 * @param selectedReview 
 * @param reviewList 
 * @returns 
 */
export const makeReviewData: makeReviewData = (selectedId, selectedReview, reviewList) => {
  selectedId.map((select, index) =>
    select != null ? (selectedReview[index] = reviewList[index]?.data) : null
  );
  return selectedReview;
}

/**
 * 선택한 교수의 강의평 작성 여부를 알려주는 함수.
 * 
 * @param selectedId 
 * @param selectedEvaluation 
 * @returns -만약 특정 교수의 강의평이 작성되었다면 그 강의의 배열 위치를 반환. 아니라면 null 반환
 */
export const makeIsEvaluationEmpty: makeIsEvaluationEmpty = (selectedId, selectedEvaluation) => {
  return (
    selectedId.map((id, index) => 
      id != null 
        ? (selectedEvaluation[index] !== undefined && 
        Object.values(selectedEvaluation[index]).every((value) => value === null) 
          ? index : null) 
        : null));
}

/**
 * 평가 데이터가 없는 교수님들을 쉼표를 통해 string을 반환하여 나타내는 함수
 * 
 * @param lectureInfo 
 * @param {number[]} emptyValues 
 * @param {number | null} empty 
 * @returns 
 */
export const noProfData: noProfData = (lectureInfo, emptyValues, empty) => {
  if(empty !== null)
  return (
    `${lectureInfo.LectureSection[empty].Professor[0].name}
     ${emptyValues[emptyValues.length - 1] !== empty ? ", " : ""}`)
  else return null;
}
