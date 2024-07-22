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

export const getLectureTotalEvaluationForProf = (
  lectureId: number,
  sectionId: number | null
) => {
  const params = {
    lectureId: lectureId,
    sectionId: sectionId,
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

export const getLectureSingleInfo = (lectureId: number) => {
  return axiosInstance.get(`/lecture/${lectureId}`);
};
