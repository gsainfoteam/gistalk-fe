import { ISortOption } from "@/Interfaces/interfaces";

export interface evaluationData {
  difficulty: number;
  evaluation: number;
  helpful: number;
  interest: number;
  lots: number;
  review: string;
  satisfy: number;
  semester: number;
  strength: number;
  writer_id: number;
  year: string;
}

export interface HexagonData {
  id: number;
  lecture_id: number;
  people: number;
  diff_aver: number;
  stren_aver: number;
  help_aver: number;
  inter_aver: number;
  lots_aver: number;
  sati_aver: number;
  [key: string]: number; // Add index signature
}

const AVERAGE_DIFFICULTY = "diff_aver";
const AVERAGE_STRENGTH = "stren_aver";
const AVERAGE_HELPFUL = "help_aver";
const AVERAGE_INTEREST = "inter_aver";
const AVERAGE_LOTS = "lots_aver";
const AVERAGE_SATISFY = "sati_aver";

const INTEREST_LABEL = "재미/흥미";
const LOTS_LABEL = "과제량";
const DIFFICULTY_LABEL = "난이도";
const HELPFUL_LABEL = "유익함";
const STRENGTH_LABEL = "강의력";
const SATISFY_LABEL = "성적 만족도";

const INTEREST_KEY = "interest";
const LOTS_KEY = "lots";
const DIFFICULTY_KEY = "difficulty";
const HELPFUL_KEY = "helpful";
const STRENGTH_KEY = "strength";
const SATISFY_KEY = "satisfy";

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
