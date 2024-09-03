import { lectureInfo, LectureSectionInfo } from "@/Interfaces/interfaces";
import { concatProfessorNames } from "@/utils";

const CURRENT_YEAR = 2024;
const CURRENT_SEMESTER = "FALL";

/** 사용자의 필터와 입력한 검색어에 해당하는 강의만 필터링 */
export const filterLectureList = (
  lectureList: lectureInfo[],
  departmentOption: string[][],
  searchTextEnter: string
) => {
  if (lectureList == null || lectureList == undefined) {
    return null;
  }

  const filteredLectureList = lectureList.filter((item: lectureInfo) => {
    //professor list에 있는 professor name을 모두 꺼내서 merge
    const professorNames = concatProfessorNames(item.LectureSection);
    const lectureCodes = item.LectureCode.map((code) => code.code).join(", ");
    //검색어가 존재하는 경우 해당되는 강의만 display함
    const isNoDepartmentSelected = departmentOption[2].length === 0;
    const isDepartmentSelected = departmentOption[2].some((code) =>
      lectureCodes.includes(code)
    );

    const isProfessorNameMatched = professorNames.includes(searchTextEnter);
    const isLectureNameMatched = item.name.includes(searchTextEnter);

    if (
      (isNoDepartmentSelected || isDepartmentSelected) &&
      (isProfessorNameMatched || isLectureNameMatched)
    ) {
      return true;
    } else {
      return false;
    }
  });

  if (filteredLectureList.length === 0) {
    return null;
  }

  return filteredLectureList;
};

export const filterLectureByYearSemester = (
  lectureList: lectureInfo[] | null
) => {
  if (lectureList == null || lectureList == undefined) {
    return null;
  }

  const isCurrentYearAndSemester = (section: LectureSectionInfo) =>
    section.year === CURRENT_YEAR && section.semester === CURRENT_SEMESTER;

  const filteredLectureArray = lectureList
    .filter((lecture) => lecture.LectureSection.some(isCurrentYearAndSemester))
    .map((lecture) => ({
      ...lecture,
      LectureSection: lecture.LectureSection.filter(isCurrentYearAndSemester),
    }));

  return filteredLectureArray;
};
