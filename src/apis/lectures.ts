import axios from "axios";
import axiosInstance from "./axiosInstance";

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

export const postLectureEvaluation = (
  review: string,
  lectureId: number,
  professorId: number | null,
  semesterId: number,
  year: string,
  recommend: number | null
) => {
  const payload = {
    difficulty: 1,
    strength: 1,
    helpful: 1,
    interest: 1,
    lots: 1,
    satisfy: 1,
    review: review,
    lecture_id: lectureId,
    prof_id: professorId,
    semester_id: semesterId,
    year: year,
    recommend: recommend,
  };

  return axiosInstance.post(
    `${import.meta.env.VITE_API_URL}/records/add`,
    payload
  );
};
