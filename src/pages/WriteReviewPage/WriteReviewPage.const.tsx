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

export const RATING_QUESTIONS = [
  {
    id: 1,
    question: "수업 난이도는 어땠나요?",
    description: "과제, 시험 등 강의의 모든 부분을 고려하여 선택해주세요.",
    leftText: "쉬움",
    rightText: "어려움",
  },
  {
    id: 2,
    question: "수업 난이도는 어땠나요?",
    description: "과제, 시험 등 강의의 모든 부분을 고려하여 선택해주세요.",
    leftText: "쉬움",
    rightText: "어려움",
  },
];

export const RECOMMEND_TEXT = {
  question: "이 강의를 추천하시겠어요?",
  options: ["추천", "보통", "추천하지 않음"],
};

export const EMPTY_STAR = "☆";
export const FILLED_STAR = "★";
