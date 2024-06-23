export interface EvaluationData {
  difficulty: number;
  generosity: number;
  helpfulness: number;
  interest: number;
  load: number;
  skill: number;
}
export interface evaluationData extends EvaluationData {
  evaluation: number;
  review: string;
  semester: number;
  writer_id: number;
  year: string;
}

export interface HexagonData extends EvaluationData {
  id: number;
  lecture_id: number;
  people: number;
  [key: string]: number; // Add index signature
}

const AVERAGE_DIFFICULTY = "difficulty";
const AVERAGE_STRENGTH = "skill";
const AVERAGE_HELPFUL = "helpfulness";
const AVERAGE_INTEREST = "interest";
const AVERAGE_LOTS = "load";
const AVERAGE_SATISFY = "generosity";

const INTEREST_LABEL = "재미/흥미";
const LOTS_LABEL = "과제량";
const DIFFICULTY_LABEL = "난이도";
const HELPFUL_LABEL = "유익함";
const STRENGTH_LABEL = "강의력";
const SATISFY_LABEL = "성적 만족도";

const INTEREST_KEY = "interest";
const LOTS_KEY = "load";
const DIFFICULTY_KEY = "difficulty";
const HELPFUL_KEY = "helpfulness";
const STRENGTH_KEY = "skill";
const SATISFY_KEY = "generosity";

export const labels = [
  { key: INTEREST_KEY, label: INTEREST_LABEL },
  { key: LOTS_KEY, label: LOTS_LABEL },
  { key: DIFFICULTY_KEY, label: DIFFICULTY_LABEL },
  { key: HELPFUL_KEY, label: HELPFUL_LABEL },
  { key: STRENGTH_KEY, label: STRENGTH_LABEL },
  { key: SATISFY_KEY, label: SATISFY_LABEL },
];

export const HexLabels = [
  { key: AVERAGE_DIFFICULTY, subject: DIFFICULTY_LABEL },
  { key: AVERAGE_STRENGTH, subject: STRENGTH_LABEL },
  { key: AVERAGE_HELPFUL, subject: HELPFUL_LABEL },
  { key: AVERAGE_INTEREST, subject: INTEREST_LABEL },
  { key: AVERAGE_LOTS, subject: LOTS_LABEL },
  { key: AVERAGE_SATISFY, subject: SATISFY_LABEL },
];

export type SubjectScore = {
  subject: string;
  score: number;
};

export const EVALUATION_TEXT = [
  DIFFICULTY_LABEL,
  LOTS_LABEL,
  HELPFUL_LABEL,
  INTEREST_LABEL,
  SATISFY_LABEL,
  STRENGTH_LABEL,
];

/**
 * 헥사곤 밑에 매핑되는 요소들의 순서의 key 값을 정리함
 */
export const SUBJECT_SHOW_ORDER = [
  AVERAGE_DIFFICULTY,
  AVERAGE_LOTS,
  AVERAGE_HELPFUL,
  AVERAGE_INTEREST,
  AVERAGE_SATISFY,
  AVERAGE_STRENGTH,
];
