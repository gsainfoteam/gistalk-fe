import axios from "axios";

//auth 정보를 사용하지 않으므로 axiosInstance를 사용하지 않음
export const getLectureList = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/lectures/all`);
};

export const getLectureEachEvaluation = (lectureId: number) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/lectures/get/${lectureId}`);
};

export const getLectureTotalEvaluation = (lectureId: number) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/scoring/get/${lectureId}`);
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
