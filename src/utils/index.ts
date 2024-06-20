/**
 *
 * @param lectureCode '["CS101", "CS102"]'와 같은 형태의 string
 * @returns 배열로 변환
 */
export const convertLectureCodeToList = (lectureCode: string) => {
  return JSON.parse(lectureCode);
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
