import axios from "axios";
import axiosInstance from "./axiosInstance";
import { RatingQuestionId } from "@/pages/WriteReviewPage/WriteReviewPage.const";

//auth 정보를 사용하지 않으므로 axiosInstance를 사용하지 않음
export const getLectureList = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/lectures/all`);
};

export const getLectureEachEvaluation = (
  lectureId: number,
  professorId: number | null
) => {
  const params = {
    lecture_id: lectureId,
    prof_id: professorId,
  };

  return axios.get(`${import.meta.env.VITE_API_URL}/lectures/get`, {
    params: params,
  });
};

export const getLectureTotalEvaluation = (
  lectureId: number,
  professorId: number | null
) => {
  return axios.get(
    `${import.meta.env.VITE_API_URL}/scoring/get/${lectureId}/${professorId}`
  );
};

/**
 * 최근 2개의 강의평을 로드합니다.
 */
export const getRecentEvaluation = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/records/latest/2`);
};

export const getLectureSingleInfo = (lectureId: number) => {
  const params = {
    lecture_id: lectureId,
  };

  return axios.get(`${import.meta.env.VITE_API_URL}/lectures/info/id`, {
    params: params,
  });
};

// TODO: 추천, 비추 변환해야 함, 그리고 rating을 추가해야 함
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

  const RECOMMEND = 1;
  const NOT_RECOMMEND = 0;
  const NORMAL = 2;

  const CLIENT_RECOMMEND = 2;
  const CLIENT_NOT_RECOMMEND = 0;

  const fixedRecommend =
    recommend === CLIENT_NOT_RECOMMEND
      ? NOT_RECOMMEND
      : recommend === CLIENT_RECOMMEND
      ? RECOMMEND
      : NORMAL;

  const payload = {
    difficulty: ratings[RatingQuestionId.Difficulty],
    strength: ratings[RatingQuestionId.TeachingSkills],
    helpful: ratings[RatingQuestionId.ContentUsefulness],
    interest: ratings[RatingQuestionId.LectureEnjoyment],
    lots: ratings[RatingQuestionId.AssignmentAmount],
    satisfy: ratings[RatingQuestionId.GradeSatisfaction],
    review: review,
    lecture_id: lectureId,
    prof_id: professorId,
    semester_id: semesterId,
    year: year,
    recommend: fixedRecommend,
  };

  return axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/records/add`,
    payload
  );
};
