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

/** 한줄평 또는 세부 강의평가 */
export interface IReply {
  id: number;

  /** 강의를 추천하는지 여부 */
  recommend: boolean;
  /** 몇 학년도 수강자? */
  year: number;
  /** 몇 학기 수강자? (1/2/여름(가을)/겨울) */
  semester: string;
  /** 해당 한줄평(또는 세부평가)에 대한 좋아요 수 */
  like: number;
  /** 해당 한줄평(또는 세부평가)에 대한 싫어요 수 */
  dislike: number;
  /** 한줄평(또는 세부평가) 내용
   * 이 string array의 length가 1이면 한줄평, 3이면 세부평가 글 (1도 3도 아니면 에러 뜨게)
   * 세부평가 글이면, 첫번째에는 시험 문제 유형, 두번째에는 과제 유형, 세번째에는 학점 잘 받는 팁 문단이 들어감*/
  content: string[];
  /** 좋아요/싫어요 중에 사용자가 누른 거 있는지, 있으면 뭐 눌렀는지 */
  //pushedLike:pushedLike;

  /** 해당 수강평이 사용자에게 잠겼는지 여부*/
  isLocked: boolean;
}

/** 받아야 할 과목 데이터 형식 */
export interface ISubjectData {
  id: number;

  /** 과목 이름 */
  subjectName: string;
  /** 교수명 */
  professorName: string;
  /** 과목코드 */
  subjectCode: string;
  /** Radar Chart에 들어갈 데이터 */
  hexData: IHexData[];
  /** 한줄평 리스트 */
  oneLineReview: IReply[];
  /** 세부평가 리스트*/
  detailedReview: IReply[];
}
