import styled, { css } from "styled-components";
import { theme } from "@/style/theme";
import { convertLectureCodeToList } from "@/utils";
import useSubjectCode from "@/hooks/useSubjectCode";
import { LectureCode } from "@/Interfaces/interfaces";
import DepartmentIcon from "@/pages/SearchPage/components/DepartmentIcon";
import { showSkeleton, skeletonGradient } from "@/pages/skeletonComponents/Keyframes";
import { IconWrap, SkeletonDiv, ProfCodeBox } from "@/pages/skeletonComponents/Skeleton.styled";

interface IProps {
  subjectCode?: LectureCode[];
  professorName?: string;
  subjectName?: string;
  isLoading: boolean;
}

const SearchCardWrap = styled.div<{ hoverColor: string; isSkeleton: boolean; }>`
  margin-bottom: 3px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  ${(props) => !props.isSkeleton &&
  `:hover {
    background-color: ${props.hoverColor};
    transition: 0.2s;
    transform: scale(0.96);`
  }}
`;

const CardContentWrap = styled.div<{ color: string }>`
  padding: 0.4rem 0.6rem;
  color: ${(props) => props.color};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap; // 개행 방지
  overflow: hidden; // 넘치는 문자열 숨김
  width: calc(
    100% - 50px
  ); //100%에서 TempIcon width, AverageScoreWrap width 뺀 값

  p {
    font-family: NSRegular;
    font-size: 13px;
    position: relative;
  }

  span {
    font-family: NSMedium;
    text-overflow: ellipsis;
  }

  div {
    font-family: NSBold;
    font-size: 16px;
    position: relative;
    white-space: nowrap; // 개행 방지
    overflow: hidden; // 넘치는 문자열 숨김
    text-overflow: ellipsis;
  }
`;

/** 검색했을 때 뜨는 강의평가를 표시하는 카드 */
export default function SearchCard({
  subjectCode,
  professorName,
  subjectName,
  isLoading,
}: IProps) {
  const lectureCodeList = subjectCode 
    ? convertLectureCodeToList(subjectCode) //lecture_code가 string list로 되어있어서 배열로 변경
    : undefined;
  const targetLectureCode = lectureCodeList 
    ? useSubjectCode(lectureCodeList)
    : undefined;

  const division = targetLectureCode 
    ? targetLectureCode.slice(0, 2)
    : undefined;

  return (
    <SearchCardWrap hoverColor={theme.colors.inputBg} isSkeleton={isLoading}>
      <IconWrap isSkeleton={isLoading}>
        <DepartmentIcon
          text={division ?? ""}
          color={theme.colors["gray-50"]}
          isChecked={false}
          isLoading={isLoading}
        />
      </IconWrap>
      <CardContentWrap color={theme.colors.primaryText}>
      {subjectName ? <div>{subjectName}</div>
        : <SkeletonDiv>&nbsp;</SkeletonDiv>}
        {/* 과목 이름 */}
        <ProfCodeBox isSkeleton={isLoading}>
          {!isLoading 
          ? <>
            <span>{professorName}</span> &nbsp; |&nbsp; &nbsp;
            {(lectureCodeList ?? [""]).join(", ")} 
          </>
          : <>&nbsp;</>}
        </ProfCodeBox>
      </CardContentWrap>
    </SearchCardWrap>
  );
}
