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

export interface IReply extends lectureInfo {
  id: number;
  review: string;
  recommendation: string;
  semester: string;
  year: number;
  createdAt: string;
  userUuid: string;
  lectureId: number;
  professorId: number;
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

export interface LectureCode {
  code: string;
  lectureId: number;
}

export interface lectureInfo {
  /** 강의 id */
  id: number;
  /** 강의 코드, "['GS0000']" 형식이기 때문에 다시 필요한 경우 array로 분리해서 써야 함 */
  LectureCode: LectureCode[];
  /** 강의 이름 */
  lectureName: string;
}

export interface lectureInfoWithProf extends lectureInfo {
  LectureProfessor: professorInfo[];
}

export interface professorInfo {
  lectureId: number;
  professorId: number;
  professor: {
    id: number;
    name: string;
  };
}
interface lecture {
  id: number;
  lectureName: string;
}
interface lectureProfessorInfo extends professorInfo {
  lecture: lecture;
}

interface evaluationData {
  difficulty: number /*난이도*/;
  skill: number /*강의력 */;
  helpfulness: number /*유익함 */;
  interest: number /*흥미도 */;
  load: number /*과제량 */;
  generosity: number /* 성적 후한 정도 */;
}

export interface reviewInfo extends evaluationData {
  createdAt: string;
  id: number;
  lectureId: number;
  professorId: number;
  recommendation: string /*추천*/;
  review: string;
  semester: string;
  userUuid: string;
  year: number;
  lectureProfessor: lectureProfessorInfo;
}

export interface recordInfo extends evaluationData {
  id: number;
  review: string;
  evaluation: number;

  lecture_id: number;
  lecture_name: string;
  lecture_code: string;
  prof_id: number;
  prof_name: string;

  recommend: number;
  semester: number; //위는 semesterID인데 여기는 semester임
  year: string;
}
