import {
  LectureCode,
  LectureSectionInfo,
  professorInfo,
} from "@/Interfaces/interfaces";

/**
 *
 * @param lectureCode '["CS101", "CS102"]'와 같은 형태의 string
 * @returns 배열로 변환
 */
export const convertLectureCodeToList = (lectureCode: LectureCode[]) => {
  return lectureCode.map((lectureCode) => lectureCode.code);
};

/**
 *
 * @param lectureSections
 * @returns professorInfo[] 로 flat하게 변환한다.
 */
export const extractProfessors = (lectureSections: LectureSectionInfo[]) => {
  const seenIds = new Set(); // Set to track unique IDs
  const professorArray = lectureSections.reduce(
    (professors: professorInfo[], section) => {
      if (section.Professor && section.Professor.length > 0) {
        section.Professor.forEach((professor) => {
          if (!seenIds.has(professor.id)) {
            seenIds.add(professor.id);
            professors.push(professor);
          }
        });
      }
      return professors;
    },
    []
  );

  return professorArray;
};

/**
 * LectureSectionInfo[]의 Professor[]의 name을 추출해서 하나의 string으로 변환
 * lectureSection이 array로 오는 경우가 있어서 해당 경우에 교수진 이름 합치는 걸 해결하기 위해 만듬
 */
export const concatProfessorNames = (LectureSection: LectureSectionInfo[]) => {
  const professorArray = convertProfessorNameToString(
    extractProfessors(LectureSection)
  );

  return professorArray.join(", ");
};

/**
 * professorInfo[]의 name을 추출해서 중복을 제거한다.
 */
export const convertProfessorNameToString = (
  LectureSectionProfessor: professorInfo[]
) => {
  return LectureSectionProfessor.map((section) => section.name);
};

/**
 *
 * @param semester 'SPRING', 'SUMMER', 'FALL', 'WINTER' 중 하나
 * @returns 1, 2, 3, 4 중 하나
 */
export const convertSemesterToNumber = (semester: string) => {
  switch (semester) {
    case "SPRING":
      return 1;
    case "SUMMER":
      return 2;
    case "FALL":
      return 3;
    case "WINTER":
      return 4;
    default:
      return 0;
  }
};

/**
 *
 * @param semester 0, 1, 2, 3, 4 중 하나
 * @returns 'SPRING', 'SUMMER', 'FALL', 'WINTER' 중 하나
 */
export const convertSemesterToString = (semester: number) => {
  switch (semester) {
    case 1:
      return "SPRING";
    case 2:
      return "SUMMER";
    case 3:
      return "FALL";
    case 4:
      return "WINTER";
    default:
      return "ALL";
  }
};
