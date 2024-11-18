import { LectureSectionInfo, professorInfo, recordInfo } from "@/Interfaces/interfaces";
import { evaluationData, HexagonData } from "./EvaluationPage.const";
import { convertSemesterToNumber, extractProfessors } from "@/utils";

type makeReviewData = (
  selectedId: (number | null)[],
  selectedReview: recordInfo[][],
  reviewList: recordInfo[][]
) => recordInfo[][];

type makeIsEvaluationEmpty = (
  averageEvaluation: evaluationData[],
) => boolean[];

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
 * @param {(number | null)[]} selectedId 
 * @param {recordInfo[][]} selectedReview 
 * @param {recordInfo[][]} reviewList 
 * @returns {recordInfo[][]}
 */
export const makeReviewData: makeReviewData = (selectedId, selectedReview, reviewList) => {
  selectedId.map((select, index) =>
    select != null && (selectedReview[index] = reviewList[index])
  );
  return selectedReview;
}

/**
 * 선택한 교수의 강의평 작성 여부를 알려주는 함수.
 * 
 * @param {evaluationData[]} averageEvaluation 
 * @returns {boolean} -특정 교수의 강의평이 작성되지 않았다면 true 반환. 작성 되었다면 false 반환
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
 * @param {recordInfo[]} reviews 
 */
export const spliceEmptyProfReviewList = (reviews: recordInfo[]) => {
  reviews.map((review, index) => 
    review.LectureSection.Professor.length === 0 
      && reviews.splice(index, 1));
}

/**
 * 교수자가 없는 lectureInfo는 그 배열 삭제
 * 
 * @param {LectureSectionInfo[]} lectuerSection
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
 * @param {recordInfo[][]} selectedReview 
 */
export const spliceSameReviewAsOne = (selectedReview: recordInfo[][]) => {
  selectedReview.map(
    (main, mIndex) =>
      main.map((review) => (
        selectedReview.slice(mIndex + 1).map((compare) => 
          compare.some((value) => review.id === value.id) && 
          selectedReview.splice(mIndex, 1))
      ))
    )
}

/**
 * 아무런 교수도 선택하지 않았을 때 true 반환
 * 
 * @param {(number | null)[]} selectedId 
 * @returns {boolean}
 */
export const isAllSelectedIdNull = (selectedId: (number | null)[]) => {
  return selectedId.every((value) => value === null);
}

/**
 * 리뷰 데이터가 있는 교수자의 index 반환
 * 
 * @param {evaluationData[]} selectedEvaluation 
 * @returns {number}
 */
export const indexOfExistData = (selectedEvaluation: evaluationData[]) => {
  return selectedEvaluation.findIndex((select) => 
    Object.values(select).every((value) => value !== null));
}

/**
 * 시간 순으로 강의평 데이터 정렬(1차원 배열)
 * 
 * @param {recordInfo[]} data 
 * @returns {recordInfo[]}
 */
export const alignReviewByTime = (data: recordInfo[]) => {
  const returnData: recordInfo[] = [];

  data.map((target) => {
    let listAddress = 0;

    data.filter((value) => value.id != target.id).map((review) => 
      {
        const compareSemesterN = convertSemesterToNumber(review.semester);
        const targetSemesterN = convertSemesterToNumber(target.semester);

        if (review.year > target.year) listAddress++;
        else if (review.year === target.year) 
          if (compareSemesterN > targetSemesterN) listAddress++;
          else if (compareSemesterN === targetSemesterN) 
            if (review.id < target.id) listAddress++; //년도, 학기가 모두 같을 시 id가 낮은 데이터가 먼저 보이도록 배치
      }
    )

    returnData[listAddress] = target;
  });

  return returnData;
}