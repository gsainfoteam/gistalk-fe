import axios from "axios";
import axiosInstance from "./axiosInstance";
import { RatingQuestionId } from "@/pages/WriteReviewPage/WriteReviewPage.const";
import {
  CLIENT_NOT_RECOMMEND,
  CLIENT_RECOMMEND,
  NORMAL,
  NOT_RECOMMEND,
  RECOMMEND,
} from "@/constants/recommand";
import { convertSemesterToString } from "@/utils";

//auth 정보를 사용하지 않으므로 axiosInstance를 사용하지 않음
export const getLectureList = () => {
  return axiosInstance.get(`/lecture`);
};

export const getLectureEachEvaluation = (
  lectureId: number,
  professorId: number | null
) => {
  const params = {
    lectureId: lectureId,
    professorId: professorId,
    type: "evaluation",
  };

  return axiosInstance.get(`/record`, {
    params: params,
  });
};

export const getLectureTotalEvaluationForProf = (
  lectureId: number,
  professorId: number | null
) => {
  const params = {
    lectureId: lectureId,
    professorId: professorId,
  };

  return axiosInstance.get(`/lecture/evaluation`, { params: params });
};

/** 강의의 총합 강의평가를 로드합니다. */
export const getLectureTotalEvaluation = (lectureId: number) => {
  const params = {
    lectureId: lectureId,
  };

  return axiosInstance.get(`/lecture/evaluation`, {
    params: params,
  });
};

/**
 * 최근 4개의 강의평을 로드합니다.
 */
export const getRecentEvaluation = () => {
  return axiosInstance.get(`/record?take=4&type=recent`);
};

export const getLectureSingleInfo = (lectureId: number) => {
  return axiosInstance.get(`/lecture/${lectureId}`);
};

export const postLectureEvaluation = (
  review: string,
  lectureId: number,
  professorId: number | null,
  semesterId: number,
  year: string,
  recommend: number | null,
  ratings: { [key: number]: number | null }
) => {
  // 현재 추천이 1, 비추천이 0, 보통이 2로 서버에 저장되나, 비추천 0, 보통 1, 추천 2로 저장되어 있음. 따라서 보통과 추천을 바꿔줘야 함

  const fixedRecommend =
    recommend === CLIENT_NOT_RECOMMEND
      ? NOT_RECOMMEND
      : recommend === CLIENT_RECOMMEND
      ? RECOMMEND
      : NORMAL;

  const payload = {
    difficulty: ratings[RatingQuestionId.Difficulty],
    skill: ratings[RatingQuestionId.TeachingSkills],
    helpfulness: ratings[RatingQuestionId.ContentUsefulness],
    interest: ratings[RatingQuestionId.LectureEnjoyment],
    load: ratings[RatingQuestionId.AssignmentAmount],
    generosity: ratings[RatingQuestionId.GradeSatisfaction],
    review: review,
    lectureId: lectureId,
    professorId: professorId,
    semester: convertSemesterToString(semesterId),
    year: parseInt(year),
    recommendation: fixedRecommend,
  };

  return axiosInstance.post(`/record`, payload);
};
