import { useQuery } from "@tanstack/react-query";

import Card from "@components/Card";
import { StyledLink } from "@components/StyledLink";
import WithTitleAndDescription from "@components/TitleWithDescription";
import { recordInfo } from "@/Interfaces/interfaces";
import { getRecentEvaluation } from "@/apis/records";
import { NOT_RECOMMEND, RECOMMEND } from "@/constants/recommand";
import { convertProfessorNameToString, convertSemesterToNumber } from "@/utils";
import LectureInformation, { LectureInformationWrapper, RecommendWrapper } from "./components/LectureInformation";
import LectureReview from "./components/LectureReview";
import { MockSearchBar } from "./components/MockSearchBar";
import useTabParam from "@/hooks/useTabParam";
import { GuideWritingReview } from "./components/GuideWritingReview";
import MoveGuideCard from "@components/MoveGuideCard";

export default function MainPage() {
  useTabParam();

  const { isLoading, data } = useQuery({
    queryKey: [`recentEvaluation`],
    queryFn: getRecentEvaluation,
    retry: 0,
  });

  function DisplayRecentList() {
    const skeletonNumber = new Array(4).fill(null);

    if (isLoading && !data) {
      return (
        skeletonNumber.map((skeleton, index) =>
          <Card key={index} isSkeleton={isLoading}>
              <LectureInformationWrapper isSkeleton={isLoading}>
                &nbsp;
              </LectureInformationWrapper>
              <RecommendWrapper isSkeleton={isLoading}>
                &nbsp;
              </RecommendWrapper>
            <LectureReview isSkeleton={isLoading}>&nbsp;</LectureReview>
          </Card> 
        )
      )
    }

    return (
      recentEvaluation.map((evaluation: recordInfo) => (
        <StyledLink
          to={`/evaluation/${evaluation.LectureSection.Lecture.id}`}
          key={evaluation.id}
        >
          <Card isInteractive={true}>
            <LectureInformation
              LectureName={evaluation.LectureSection.Lecture.name}
              ProfessorName={convertProfessorNameToString(
                evaluation.LectureSection.Professor
              ).join(", ")}
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
      ))
    );
  }

  const { data: recentEvaluation } = { ...data };
  return (
    <>
      <WithTitleAndDescription
        title={"강의 평가 검색"}
        description={"기초과목부터 버클리까지 검색해보세요"}
      >
        <StyledLink to="/search" state={{ focus: true }}>
          <MockSearchBar />
        </StyledLink>
      </WithTitleAndDescription>

      <StyledLink to="/write">
        <MoveGuideCard>
          <GuideWritingReview />
        </MoveGuideCard>
      </StyledLink>

      <WithTitleAndDescription title={"최근 올라온 강의평가"}>
        {DisplayRecentList()}
      </WithTitleAndDescription>
    </>
  );
}
