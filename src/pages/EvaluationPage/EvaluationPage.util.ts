import { LectureSectionInfo, recordInfo } from "@/Interfaces/interfaces";
import { evaluationData, HexagonData } from "./EvaluationPage.const";
import { extractProfessors } from "@/utils";

type makeReviewData = (
  selectedId: (number | null)[],
  selectedReview: recordInfo[][],
  reviewList: recordInfo[][] | undefined
) => recordInfo[][];

type makeIsEvaluationEmpty = (
  averageEvaluation: evaluationData[],
) => boolean[];

type noProfData = (
  lectureInfo: LectureSectionInfo[],
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
 * 선택한 교수의 리뷰 내용을 저장하여 반환함
 * 
 * @param selectedId 
 * @param selectedReview 
 * @param reviewList 
 * @returns 
 */
export const makeReviewData: makeReviewData = (selectedId, selectedReview, reviewList) => {
  selectedId.map((select, index) =>
    select != null && reviewList && (selectedReview[index] = reviewList[index])
  );
  return selectedReview;
}

/**
 * 선택한 교수의 강의평 작성 여부를 알려주는 함수.
 * 
 * @param averageEvaluation 
 * @returns -만약 특정 교수의 강의평이 작성되지 않았다면 그 강의의 배열 위치를 반환. 작성 되었다면 null 반환
 */
export const makeIsEvaluationEmpty: makeIsEvaluationEmpty = (
  averageEvaluation
  ) => {
  return averageEvaluation.map((score, index) =>
      Object.values(averageEvaluation[index]).every((value) => value === null)
        ? true : false)
}

/**
 * 처음에 아무 것도 선택 안 됐을 때 reviewList를 기반으로 교수자가 없는 리뷰는 reviewList에서 삭제
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
 * @param lectuerSection
 */
export const spliceEmptyProfLectureInfo = (lectureSection: LectureSectionInfo[]) => {
  lectureSection.map((section: LectureSectionInfo, index) => 
    section.Professor.length === 0 
      ? lectureSection.splice(index, 1)
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
      main.map((review) => (
        selectedReview.slice(mIndex + 1).map((compare) => 
          compare.some((value) => review.id === value.id) && 
          selectedReview.splice(mIndex, 1))
      ))
    )
}