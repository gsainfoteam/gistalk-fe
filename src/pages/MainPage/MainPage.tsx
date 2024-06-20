import Card from "@components/Card";
import { StyledLink } from "@components/StyledLink";
import WithTitleAndDescription from "@components/TitleWithDescription";

import LectureInformation from "./components/LectureInformation";
import LectureReview from "./components/LectureReview";
import { MockSearchBar } from "./components/MockSearchBar";
import { useQuery } from "@tanstack/react-query";
import { getRecentEvaluation } from "@/apis/lectures";
import { reviewInfo } from "@/Interfaces/interfaces";
import { NOT_RECOMMEND, RECOMMEND } from "@/constants/recommand";
import { convertSemesterToNumber } from "@/utils";

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

      <WithTitleAndDescription title={"최근 올라온 강의평가"}>
        {!isLoading &&
          data &&
          recentEvaluation.map((evaluation: reviewInfo) => (
            <StyledLink
              to={`/${evaluation.lectureId}/evaluation`}
              key={evaluation.id}
            >
              <Card>
                <LectureInformation
                  LectureName={"강의 이름"}
                  ProfessorName={"교수 이름"}
                  CourseTakenYear={parseInt(
                    evaluation.year.toString().substring(0, 4)
                  )}
                  CourseTakenSemester={convertSemesterToNumber(
                    evaluation.semester
                  )}
                  CourseRecommendation={
                    evaluation.recommendation === RECOMMEND
                      ? true
                      : evaluation.recommendation === NOT_RECOMMEND
                      ? false
                      : null
                  }
                />
                <LectureReview>{evaluation.review}</LectureReview>
              </Card>
            </StyledLink>
          ))}
      </WithTitleAndDescription>
    </>
  );
}
