import { IDepartment } from "../Interfaces/interfaces";

/** 전공 분과 선택을 위한 오브젝트 리스트 */
export const major: IDepartment[] = [
  { subjectCode: "GS", korean: "기초", fullKorean: "기초교육학부", id: 1 },
  { subjectCode: "BS", korean: "생명", fullKorean: "생명과학부", id: 2 },
  { subjectCode: "CH", korean: "화학", fullKorean: "화학과", id: 3 },
  {
    subjectCode: "EC",
    korean: "전컴",
    fullKorean: "전기전자컴퓨터공학부",
    id: 4,
  },
  { subjectCode: "EV", korean: "지환공", fullKorean: "지구·환경공학부", id: 5 },
  { subjectCode: "MA", korean: "신소재", fullKorean: "신소재공학부", id: 6 },
  { subjectCode: "PS", korean: "물리", fullKorean: "물리·광과학과", id: 7 },
  { subjectCode: "ME", korean: "기계", fullKorean: "기계공학부", id: 8 },
];

/** 부전공 분과 선택을 위한 오브젝트 리스트 */
export const minor: IDepartment[] = [
  { subjectCode: "MM", korean: "수학", fullKorean: "수학 부전공", id: 1 },
  {
    subjectCode: "MD",
    korean: "의생공",
    fullKorean: "의생명공학 부전공",
    id: 2,
  },
  { subjectCode: "ET", korean: "에너지", fullKorean: "에너지 부전공", id: 3 },
  {
    subjectCode: "CT",
    korean: "문화기술",
    fullKorean: "문화기술 부전공",
    id: 4,
  },
  {
    subjectCode: "IR",
    korean: "지능로봇",
    fullKorean: "지능로봇 부전공",
    id: 5,
  },
  {
    subjectCode: "LH",
    korean: "인문사회",
    fullKorean: "인문사회 부전공",
    id: 6,
  },
  { subjectCode: "AI", korean: "AI융합", fullKorean: "AI융합 부전공", id: 7 },
];
