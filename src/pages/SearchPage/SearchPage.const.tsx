import { ISortOption, lectureInfoWithProf } from "@/Interfaces/interfaces";

/** 정렬을 어떻게 할지 선택할 수 있는 리스트: std 기준으로 sort*/
export const sortList: { id: number; content: string; std: ISortOption }[] = [
  { id: 1, content: "수업 쉬운 순", std: "수업 난이도" },
  { id: 2, content: "유익한 순", std: "유익함" },
  { id: 3, content: "성적 만족도 순", std: "성적 만족도" },
  { id: 4, content: "과제 적은 순", std: "과제량" },
  { id: 5, content: "수업 재밌는 순", std: "재미 / 흥미" },
  { id: 6, content: "강의력 좋은 순", std: "강의력" },
];

/** 사용자의 필터와 입력한 검색어에 해당하는 강의만 필터링 */
export const filterLectureList = (
  lectureList: lectureInfoWithProf[],
  departmentOption: string[][],
  searchTextEnter: string
) => {
  if (lectureList == null || lectureList == undefined) {
    return null;
  }

  const filteredLectureList = lectureList.filter(
    (item: lectureInfoWithProf) => {
      //professor list에 있는 professor name을 모두 꺼내서 merge
      const professorNames = item.LectureProfessor.map(
        (prof) => prof.professor.name
      ).join(", ");
      const lectureCodes = item.LectureCode.map((code) => code.code).join(", ");
      //검색어가 존재하는 경우 해당되는 강의만 display함
      const isNoDepartmentSelected = departmentOption[2].length === 0;
      const isDepartmentSelected = departmentOption[2].some((code) =>
        lectureCodes.includes(code)
      );

      const isProfessorNameMatched = professorNames.includes(searchTextEnter);
      const isLectureNameMatched = item.lectureName.includes(searchTextEnter);

      if (
        (isNoDepartmentSelected || isDepartmentSelected) &&
        (isProfessorNameMatched || isLectureNameMatched)
      ) {
        return true;
      } else {
        return false;
      }
    }
  );

  if (filteredLectureList.length === 0) {
    return null;
  }

  return filteredLectureList;
};
