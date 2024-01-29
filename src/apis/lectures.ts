import axiosInstance from "./axiosInstance";

export const getLectureList = () => {
  return axiosInstance.get(`/lectures/all`);
};
