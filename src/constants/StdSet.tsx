import { IDepartment } from "@/Interfaces/interfaces";

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
  { subjectCode: "MC", korean: "기계", fullKorean: "기계공학부", id: 8 },
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
    korean: "문학·역사",
    fullKorean: "문학과 역사 부전공",
    id: 6,
  },
  {
    subjectCode: "PP",
    korean: "공공정책",
    fullKorean: "공공정책(법정치사회) 부전공",
    id: 7,
  },
  {
    subjectCode: "EB",
    korean: "경제·경영",
    fullKorean: "경제·경영 부전공",
    id: 8,
  },
  {
    subjectCode: "SS",
    korean: "기술사회",
    fullKorean: "과학기술과 사회 부전공",
    id: 9,
  },
  {
    subjectCode: "MB",
    korean: "마음·행동",
    fullKorean: "마음과 행동 부전공",
    id: 10,
  },
  { subjectCode: "AI", korean: "AI융합", fullKorean: "AI융합 부전공", id: 11 },
];

export const underG: IDepartment[] = [
  { subjectCode: "CC", korean: "공통", fullKorean: "공통과목", id: 1 },
  { subjectCode: "MS", korean: "신소재", fullKorean: "신소재공학부", id: 2 },
  { subjectCode: "ME", korean: "기계", fullKorean: "기계공학부", id: 3 },
  { subjectCode: "EN", korean: "지환공", fullKorean: "지구환경공학부", id: 4 },
  { subjectCode: "LS", korean: "생명", fullKorean: "생명과학부", id: 5 },
  {
    subjectCode: "RT",
    korean: "융합지능",
    fullKorean: "융합기술 지능로봇프로그램",
    id: 5,
  },
  {
    subjectCode: "FE",
    korean: "에너지융합",
    fullKorean: "에너지융합대학원",
    id: 5,
  },
  {
    subjectCode: "PH",
    korean: "물리광과학",
    fullKorean: "물리광과학과",
    id: 5,
  },
  {
    subjectCode: "PH",
    korean: "물리광과학",
    fullKorean: "물리·광과학과",
    id: 5,
  },
  {
    subjectCode: "MI",
    korean: "기술혁신",
    fullKorean: "기술혁신 부전공",
    id: 5,
  },
];
