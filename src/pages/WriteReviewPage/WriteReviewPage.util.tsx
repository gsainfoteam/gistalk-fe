import { LectureSectionInfo, professorInfo } from "@/Interfaces/interfaces";

export const checkValidation = (
  selectedId: number | null,
  selectedValues: { year: number | null; semester: string | null },
  ratings: { [key: number]: number | null },
  recommendation: number,
  text: string
) => {
  if (selectedId === null) {
    alert("교수자를 선택해주세요");
    return false;
  }
  if (selectedValues.year === null) {
    alert("수강 년도를 선택해주세요");
    return false;
  }
  if (selectedValues.semester === null) {
    alert("수강 학기를 선택해주세요");
    return false;
  }
  if (Object.values(ratings).some((rating) => rating === 0)) {
    alert("평가하지 않은 항목이 있습니다. 모든 항목을 평가해주세요.");
    return false;
  }
  if (recommendation === -1) {
    alert("강의를 추천하시는지 선택해주세요");
    return false;
  }
  if (text === "") {
    alert("총평을 작성해주세요");
    return false;
  }
  // 15자 이상으로 작성해야 함
  if (text.length < 15) {
    alert("총평을 15자 이상으로 작성해주세요");
    return false;
  }
  return true;
};

/*
lectureSectionInfo에서 분반 정보를 id로 가지고 교수자명을 name으로 가지는 json 배열을 반환
*/
export const getProfessorData = (data: LectureSectionInfo[]) => {
  const result = data.map((item: LectureSectionInfo) => {
    return {
      id: item.id,
      name: item.Professor.map((prof: professorInfo) => prof.name).join(", "),
    };
  });

  //결과물 json array에서 name이 다른 것과 같은 경우에는 배열에서 제거한다.
  const uniqueResult = result.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );

  return uniqueResult;
};
