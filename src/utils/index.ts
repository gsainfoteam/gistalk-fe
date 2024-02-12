/**
 *
 * @param lectureCode '["CS101", "CS102"]'와 같은 형태의 string
 * @returns 배열로 변환
 */
export const convertLectureCodeToList = (lectureCode: string) => {
  return lectureCode.replace(/[\[\]']+/g, "").split(", ");
};
