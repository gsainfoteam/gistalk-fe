import axiosInstance from "./axiosInstance";

export const getLectureList = () => {
  return axiosInstance.get(`/lectures/all`);
};

export const getLectureEvaluation = (lectureId: number) => {
  return axiosInstance.get(`/lectures/get/${lectureId}`);
};
