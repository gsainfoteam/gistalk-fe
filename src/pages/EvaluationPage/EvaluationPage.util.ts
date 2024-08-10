import { recordInfo } from "@/Interfaces/interfaces";
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

export const reviewAmount = (selectedReview: recordInfo[][]) => {
    let count = 0;
    selectedReview.map((review) => count += review.length)

    return count;
  };

export const makeSelectedData: makeSelectedData = (selectedId, selectedData, profEvaluation) => {
  selectedId.map((select, index) =>
    select != null
      ? (selectedData[index] = profEvaluation[index]?.data)
      : null
  );
  return selectedData;
}

export const makeReviewData: makeReviewData = (selectedId, selectedReview, reviewList) => {
  selectedId.map((select, index) =>
    select != null ? (selectedReview[index] = reviewList[index]?.data) : null
  );
  return selectedReview;
}

export const makeIsEvaluationEmpty: makeIsEvaluationEmpty = (selectedId, selectedEvaluation) => {
  return (
    selectedId.map((id, index) => 
      id != null 
        ? (selectedEvaluation[index] !== undefined && 
        Object.values(selectedEvaluation[index]).every((value) => value === null) 
          ? index : null) 
        : null));
}