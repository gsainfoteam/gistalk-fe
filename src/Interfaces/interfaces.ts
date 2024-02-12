/** Search.tsx에서 각 분과의 데이터를 저장할 때 쓰임,
 * 예시 : { subjectCode: "GS", korean: "기초", fullKorean: "기초교육학부", id: 1 }, */
export interface IDepartment {
  subjectCode: string;
  korean: string;
  fullKorean: string;
  id: number;
}

/** Search.tsx에서 DepartmentGridItemWrapComponent 컴포넌트에 분과 정보와 텍스트, 아이콘 컬러를 전달하기 위해 쓰임 */
export interface IDepartmentGridItemWrapComponent {
  item: IDepartment;
  iconColor: string;
  textColor: string;
}

/** Search.tsx에서 (임시로 쓰일진 모르겠지만 어쨌든) 각 SearchCard.tsx로 전달해야 하는 오브젝트 형식 */
export interface ISearchCard {
  id: number;
  subjectCode: string;
  professorName: string;
  subjectName: string;
  subjectScore: string;
}

/** Radar Chart에 들어가는 데이터 형식 */
export interface IHexData {
  subject: string;
  score: number;
}

export interface IHeader {
  prevUrl?: string;
  text: string;
}

export interface IButton {
  text: string;
  onClick: () => void;
  color: string;
  background: string;
}

/** like : 좋아요 누름 / dislike : 싫어요 누름 / none : 둘 다 안 누름 */
export type pushedLike = "like" | "dislike" | "none";

/**
 * 
 *     "difficulty" : 1,
    "strength" : 1,
    "helpful" : 1,
    "interest" : 1,
    "lots" : 1,
    "satisfy" : 1,
    "review" : "한줄평1",
    "lecture_id" : 1,
    "prof_id" : 3,
    "semester_id" : 1,
    "year" : "2022",
    "recommend" : 1,

 */

export interface IReply {
  record_id: number;
  prof_id: number;
  user_id: number;
  writer_id: number;
  /** 봄: 1, 여름: 2, 가을: 3, 가을:4 */
  semester: number;
  year: string;
  difficulty: number;
  strength: number;
  helpful: number;
  interest: number;
  lots: number;
  satisfy: number;
  review: string;
  /** 강의를 추천하는지 여부, 1: 추천, 0: 비추천, 2:보통 */
  recommend?: number;
}

/** 받아야 할 과목 데이터 형식 */
export interface ISubjectData {
  id: number;

  /** 과목 이름 */
  subjectName: string;
  /** 교수명 */
  professorName: string;
  /** 과목코드 */
  subjectCode: string[];
  /** Radar Chart에 들어갈 데이터 */
  hexData: IHexData[];
  /** 한줄평 리스트 */
  oneLineReview: IReply[];
  /** 세부평가 리스트*/
  detailedReview: IReply[];
  /** 중복도 */
  redundancy: number;
}

export type ISortOption =
  | "평균점수"
  | "수업 난이도"
  | "유익함"
  | "성적 만족도"
  | "과제량"
  | "재미 / 흥미"
  | "강의력";

export interface UserInfo {
  user_uuid: string;
  user_email_id: string;
  user_name: string;
  user_phone_number: string;
  student_id: string;
}

export interface lectureInfo {
  /** 강의 id */
  id: number;
  /** 강의 코드, "['GS0000']" 형식이기 때문에 다시 필요한 경우 array로 분리해서 써야 함 */
  lecture_code: string;
  /** 강의 이름 */
  lecture_name: string;
}

export interface lectureInfoWithProf extends lectureInfo {
  prof: professorInfo[];
}

export interface professorInfo {
  id: number;
  prof_name: string;
}
export interface reviewInfo {
  id: number;
  difficulty: number;
  strength: number;
  helpful: number;
  interest: number;
  lots: number;
  satisfy: number;
  review: string;
  evaluation: number;
  lecture: lectureInfo;
  prof: professorInfo;
}
