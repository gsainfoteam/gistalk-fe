import { lectureInfo, LectureSectionInfo, recordInfo } from "@/Interfaces/interfaces";
import { evaluationData, HexagonData } from "./EvaluationPage.const";
import { extractProfessors } from "@/utils";

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
  selectedEvaluation: evaluationData[] | undefined,
  lectureInfo: any,
  isLectureInfoLoading: boolean
) => (number | null)[];

type noProfData = (
  lectureInfo: any,
  empty: number
) => string;

/**
 * 선택된 교수들의 총 리뷰 개수를 구한다. 
 * 
 * @param {recordInfo[][]} selectedReview -교수별 리뷰들이 담긴 2차원 배열
 * @return {number} -배열의 총 길이
 */
export const reviewAmount = (selectedReview: recordInfo[][]) => {
    return selectedReview.reduce((acc, review) => acc += review.length, 0);
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
 * @returns -만약 특정 교수의 강의평이 작성되지 않았다면 그 강의의 배열 위치를 반환. 작성 되었다면 null 반환
 */
export const makeIsEvaluationEmpty: makeIsEvaluationEmpty = (
  selectedId, 
  selectedEvaluation, 
  lectureInfo, 
  isLectureInfoLoading
  ) => {

  if (selectedId.every((value) => value == null) && !isLectureInfoLoading && selectedEvaluation !== undefined) 
    return extractProfessors(lectureInfo.LectureSection).map((prof, index) => 
      Object.values(selectedEvaluation[index]).every((value) => value === null) 
        ? index : null)
  else
    return (
      selectedId.filter((id) => (id !== null)).map((id, index) =>
        (id != null && selectedEvaluation !== undefined
          ? selectedEvaluation[index] !== undefined && 
          Object.values(selectedEvaluation[index]).every((value) => value === null)
            ? selectedId.indexOf(id) : null
          : null))
      )
}

/**
 * 평가 데이터가 없는 교수님들을 쉼표를 통해 string을 반환하여 나타내는 함수
 * 
 * @param lectureInfo 
 * @param emptyValues 
 * @param empty 
 * @returns 
 */
export const noProfData: noProfData = (lectureInfo, empty) => {
  const professorInfoList = extractProfessors(lectureInfo.LectureSection);

  return (`${professorInfoList[empty].name}`);
}

/**
 * 교수자가 없는 리뷰는 reviewList에서 삭제
 * 
 * @param reviews 
 */
export const spliceEmptyProfReviewList = (reviews: recordInfo[]) => {
  reviews.map((review, index) => 
    review.LectureSection.Professor.length === 0 
      && reviews.splice(index, 1));
}

/**
 * 교수자가 없는 lectureInfo는 그 배열 삭제
 * 
 */
export const noProfInLectureInfo = (lectureInfo: lectureInfo) => {
  lectureInfo.LectureSection.map((section: LectureSectionInfo, index) => 
    section.Professor.length === 0 
      ? lectureInfo.LectureSection.splice(index, 1)
      : null);
}


/**
 * 리뷰에 교수가 두 명이라면 두 교수 모두 선택했을 때 하나만 selectedReview에 저장
 * 
 * @param selectedReview 
 */
export const makeSameReviewAsOne = (selectedReview: recordInfo[][]) => {
  selectedReview.map(
    (main, mIndex) =>
      main.map((review) => 
        selectedReview.map((compare, cIndex) => 
          compare.map((value) => 
            mIndex < cIndex && //map할 때 이미 체크한 배열 제외
            review.id === value.id &&
            selectedReview.splice(mIndex, 1)
          )
        )
      )
    )
}