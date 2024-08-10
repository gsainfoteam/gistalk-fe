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

/** `/lecture` path api 호출에 대해서 사용하는 info  */
export interface lectureInfo {
  /** 강의 id */
  id: number;
  /** 강의 이름 */
  name: string;
  /** 강의 코드, "['GS0000']" 형식이기 때문에 다시 필요한 경우 array로 분리해서 써야 함 */
  LectureCode: LectureCode[];
  LectureSection: LectureSectionInfo[];
}

export interface professorInfo {
  id: number;
  name: string;
}
interface lecture {
  id: number;
  name: string;
}

export interface LectureSectionInfo {
  id: number;
  lectureId: number;
  Professor: professorInfo[];
  year: number;
  semester: string;
  capacity: number;
  registrationCount: number;
  fullCapacityTime: number;
}

export interface RecordLectureSectionInfo extends LectureSectionInfo {
  Lecture: lecture;
}

interface evaluationData {
  /**난이도*/
  difficulty: number;
  /**강의력 */
  skill: number;
  /**유익함 */
  helpfulness: number;
  /** 흥미도 */
  interest: number;
  /** 과제량 */
  load: number;
  /** 성적 후한 정도 */
  generosity: number;
}

/** `/record` path api 호출에 대해서 사용하는 info  */
export interface recordInfo extends evaluationData {
  isLiked: Boolean;
  _count: { RecordLike: number };
  id: number;
  review: string;
  lectureId: number;
  professorId: number;
  LectureSection: RecordLectureSectionInfo;
  recommendation: string;
  sectionId: number;
  semester: string; //위는 semesterID인데 여기는 semester임
  year: number;
  createdAt: string;
  userUuid: string;
}
