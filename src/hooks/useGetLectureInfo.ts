import { lectureInfoWithProf } from "@/Interfaces/interfaces";
import { getLectureList } from "@/apis/lectures";
import { useQuery } from "@tanstack/react-query";

export const useGetLectureInfo = (id: number) => {
  const {
    isLoading: isLectureInfoLoading,
    data: lectureInfoList,
    isError,
  } = useQuery({
    queryKey: ["getEvaluationList"],
    queryFn: getLectureList,
  });

  const lectureInfo = lectureInfoList?.data.find(
    (i: lectureInfoWithProf) => i.id === id
  );

  return { isLectureInfoLoading, lectureInfo, isError };
};
