export enum Recommendation {
  NotRecommend = 0,
  Normal = 1,
  Recommend = 2,
}

export const COURSE_TAKEN_YEAR = [
  { value: 2023, label: "2023" },
  { value: 2022, label: "2022" },
  { value: 2021, label: "2021" },
  { value: 2020, label: "2020" },
  { value: 2019, label: "2019" },
  { value: 2018, label: "2018" },
  { value: 2017, label: "2017" },
  { value: 2016, label: "2016" },
];
export const COURSE_TAKEN_SEMESTER = [
  { value: 1, label: "봄학기" },
  { value: 2, label: "여름학기" },
  { value: 3, label: "가을학기" },
  { value: 4, label: "겨울학기" },
];

export enum RatingQuestionId {
  Difficulty = 1,
  AssignmentAmount = 2,
  ContentUsefulness = 3,
  LectureEnjoyment = 4,
  TeachingSkills = 5,
  GradeSatisfaction = 6,
}

export const RATING_QUESTIONS = [
  {
    id: RatingQuestionId.Difficulty,
    question: "강의 난이도는 어땠나요?",
    description: "과제, 시험 등 강의의 모든 부분을 고려하여 평가해주세요.",
    leftText: "쉬움",
    rightText: "어려움",
  },
  {
    id: RatingQuestionId.AssignmentAmount,
    question: "과제량은 어땠나요?",
    description: "과제의 양이 얼마나 많았는지 평가해주세요.",
    leftText: "적음",
    rightText: "많음",
  },
  {
    id: RatingQuestionId.ContentUsefulness,
    question: "강의 내용의 유익함은 어땠나요?",
    description: "강의 내용이 얼마나 도움이 됐는지 평가해주세요.",
    leftText: "무익함",
    rightText: "유익함",
  },
  {
    id: RatingQuestionId.LectureEnjoyment,
    question: "강의 재미와 흥미도는 어땠나요?",
    description: "강의 내용이 얼마나 흥미로웠는지 평가해주세요.",
    leftText: "지루함",
    rightText: "흥미로움",
  },

  {
    id: RatingQuestionId.TeachingSkills,
    question: "교수자의 강의력은 어땠나요?",
    description: "교수자의 강의력, 전달력 등을 평가해주세요.",
    leftText: "나쁨",
    rightText: "좋음",
  },

  {
    id: RatingQuestionId.GradeSatisfaction,
    question: "받은 성적의 만족도는 어땠나요?",
    description: "강의에서 받은 성적에 대한 만족도를 평가해주세요.",
    leftText: "불만족",
    rightText: "만족",
  },
];

export const RECOMMEND_TEXT = {
  question: "이 강의를 추천하시겠어요?",
  options: ["추천하지 않음", "보통", "추천"],
};

export const EMPTY_STAR = "☆";
export const FILLED_STAR = "★";
