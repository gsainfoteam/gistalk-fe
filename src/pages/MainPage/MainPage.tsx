import Card from "@components/Card";
import { StyledLink } from "@components/StyledLink";
import WithTitleAndDescription from "@components/TitleWithDescription";

import LectureInformation from "./components/LectureInformation";
import LectureReview from "./components/LectureReview";
import WriteReview from "./components/WriteReview";
import { MockSearchBar } from "./components/MockSearchBar";
import { useQuery } from "@tanstack/react-query";
import { getRecentEvaluation } from "@/apis/lectures";
import { reviewInfo } from "@/Interfaces/interfaces";

export default function MainPage() {
  const { isLoading, data } = useQuery({
    queryKey: [`recentEvaluation`],
    queryFn: getRecentEvaluation,
    retry: 0,
  });

  const { data: recentEvaluation } = { ...data };

  return (
    <>
      <WithTitleAndDescription
        title={"강의 평가 검색"}
        description={"기초과목부터 버클리까지 검색해보세요"}
      >
        <StyledLink to="/search">
          <MockSearchBar />
        </StyledLink>
      </WithTitleAndDescription>

      <StyledLink to="/">
        <Card>
          <WriteReview>
            <div className="question"> 이번 학기 어떻게 보내셨나요? </div>
            <div className="guide"> 강의평가 등록하러 가기 </div>
          </WriteReview>
        </Card>
      </StyledLink>
      <WithTitleAndDescription title={"최근 올라온 강의평가"}>
        {!isLoading &&
          data &&
          recentEvaluation.map((evaluation: reviewInfo) => (
            <Card>
              <LectureInformation
                LectureName={evaluation.lecture.lecture_name}
                ProfessorName={evaluation.prof.prof_name}
                CourseTakenYear={2021}
                CourseTakenSemester={1}
                CourseRecommendation={true}
              />
              <LectureReview>
                여름학기를 즐길 생각이라면 로드가 많아서 비추천, 하지만 수업
                자체로 놓고 본다면 지스트에서 하는 것보다 환경이 잘 정리되어
                있고 신기술 adoption이 빨라 많은 도움이 됨
              </LectureReview>
            </Card>
          ))}
      </WithTitleAndDescription>
    </>
  );
}
