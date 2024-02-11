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

export const getRecentEvaluation = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/records/latest/2`);
};
