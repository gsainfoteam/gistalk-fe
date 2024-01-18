import Card from "@components/Card";
import { StyledLink } from "@components/StyledLink";
import WithTitleAndDescription from "@components/TitleWithDescription";
import { SearchBar } from "../SearchPage/components/SearchBar";

import LectureInformation from "./components/LectureInformation";
import LectureReview from "./components/LectureReview";

export default function MainPage() {
  return (
    <>
      <WithTitleAndDescription
        title={"강의 평가 검색"}
        description={"기초과목부터 버클리까지 검색해보세요"}
      >
        <SearchBar />
      </WithTitleAndDescription>

      <StyledLink to="/">
        <Card>
          <div> 이번 학기 어떻게 보내셨나요? </div>
          <div> 강의평가 등록하러 가기 </div>
        </Card>
      </StyledLink>

      <WithTitleAndDescription title={"최근 올라온 강의평가"}>
        <Card>
          <LectureInformation
            LectureName={"거시경제학원론"}
            ProfessorName={"홍길동"}
            CourseTakenYear={2021}
            CourseTakenSemester={1}
            CourseRecommendation={true}
          />
          <LectureReview>
            여름학기를 즐길 생각이라면 로드가 많아서 비추천, 하지만 수업 자체로
            놓고 본다면 지스트에서 하는 것보다 환경이 잘 정리되어 있고 신기술
            adoption이 빨라 많은 도움이 됨
          </LectureReview>
        </Card>

        <Card>
          <LectureInformation
            LectureName={"거시경제학원론"}
            ProfessorName={"홍길동"}
            CourseTakenYear={2021}
            CourseTakenSemester={1}
            CourseRecommendation={true}
          />
          <LectureReview>
            여름학기를 즐길 생각이라면 로드가 많아서 비추천, 하지만 수업 자체로
            놓고 본다면 지스트에서 하는 것보다 환경이 잘 정리되어 있고 신기술
            adoption이 빨라 많은 도움이 됨
          </LectureReview>
        </Card>
      </WithTitleAndDescription>
    </>
  );
}
