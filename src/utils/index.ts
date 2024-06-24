import { LectureCode } from "@/Interfaces/interfaces";

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
