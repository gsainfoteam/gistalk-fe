import {
  CLIENT_NOT_RECOMMEND,
  CLIENT_RECOMMEND,
  NORMAL,
  NOT_RECOMMEND,
  RECOMMEND,
} from "@/constants/recommand";
import axiosInstance from "./axiosInstance";
import { RatingQuestionId } from "@/pages/WriteReviewPage/WriteReviewPage.const";
import { convertSemesterToString } from "@/utils";

export const getRecentEvaluation = () => {
  return axiosInstance.get(`/record?take=4&type=recent`);
};
export const getLectureEachEvaluation = (
  lectureId: number,
  sectionId: number | null
) => {
  const params = {
    lectureId: lectureId,
    sectionId: sectionId,
    type: "evaluation",
  };

  return axiosInstance.get(`/record`, {
    params: params,
  });
};
export const getLikeStatus = (recordId: string, currentUser: number) => {};
//type이 user일때 유저의 강의평을 조회하는 구현이 되어있지 않음
export const postLectureEvaluation = (
  review: string,
  lectureId: number,
  sectionId: number | null,
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
    sectionId: sectionId,
    semester: convertSemesterToString(semesterId),
    year: parseInt(year),
    recommendation: fixedRecommend,
  };
  return axiosInstance.post(`/record`, payload);
};

/**강의평의 좋아요를 남깁니다*/
export const postRecordLike = async (recordId: number) => {
  const response = await axiosInstance.post(`/record/${recordId}/like`);
  console.log(response.data);
  return response.data;
};
/**강의평의 좋아요를 삭제합니다.*/
export const deleteRecordLike = async (recordId: number) => {
  const response = await axiosInstance.delete(`/record/${recordId}/like`);
  console.log(response.data);
  return response.data;
};
