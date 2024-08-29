import {
  evaluationData,
  LectureCode,
  lectureInfo,
  LectureSectionInfo,
  professorInfo,
  recordInfo,
} from "@/Interfaces/interfaces";
import { SUBJECT_SHOW_ORDER } from "@/pages/EvaluationPage/EvaluationPage.const";
import { isAllSelectedIdNull } from "@/pages/EvaluationPage/EvaluationPage.util";

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
 * 특정 수업의 리뷰 점수를 합산하여 평균을 구한다. 
 * 
 * @param selectedId 
 * @param reviewList 
 * @param isEvaluationLoading 
 * @returns {evaluationData[]}
 */
export const extractEvaluationData = (
  selectedId: (number | null)[], 
  reviewList: recordInfo[][],
  lectureInfo: lectureInfo) => {
  const professorArray = extractProfessors(lectureInfo.LectureSection);
  let selectedData = professorArray.map(() => new Array());

  isAllSelectedIdNull(selectedId)
    ? professorArray.map((prof, pIndex) => 
      reviewList[0].map((review: recordInfo) => review.LectureSection.Professor.map((member) => 
        prof.name === member.name 
          ? selectedData[pIndex].push(review) 
          : null)))
    : selectedData = selectedId.filter((id) => id !== null).map((id) => 
        reviewList[selectedId.indexOf(id)]);
    
  const result = selectedData.map((data) => {
    return (
      SUBJECT_SHOW_ORDER.reduce((acc: any, key) => {
        acc[key] = data === null || data.every((review: recordInfo) => review === undefined) 
          ? null
          : data.reduce((avg: number, num: any) => avg += num[key], 0)/data.length; 
        return acc;}, {})
      )
    }
  );

  const averageResult = 
    result.map((review) => //교수진 개수 만큼 같은 내용의 평균 리뷰 배열로 생성
      SUBJECT_SHOW_ORDER.reduce((acc: any, key) => {
        const scoreSum = result.reduce((acc, value) => {
          value[key] !== null 
            ? (acc[0] += value[key], acc[1]++)
            : acc[0] += 0
          return acc;}, [0, 0]);
        
        acc[key] = review[key] !== null ? scoreSum[0]/scoreSum[1] : null;
        return acc;}, {})
    );

  return isAllSelectedIdNull(selectedId) 
    ? averageResult
    : result;
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
