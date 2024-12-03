import styled from "styled-components";
import { theme } from "@/style/theme";
import useSubjectCode from "@/hooks/useSubjectCode";
import DepartmentIcon from "@/pages/SearchPage/components/DepartmentIcon";

interface IProps {
  subjectCode: string[];
  professorName: string;
  subjectName: string;
}

const SearchCardWrap = styled.div<{ hoverColor: string }>`
  margin-bottom: 3px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  :hover {
    background-color: ${(props) => props.hoverColor};
    transition: 0.2s;
    transform: scale(0.96);
  }
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
}: IProps) {
  const targetLectureCode = useSubjectCode(subjectCode);

  if (targetLectureCode === undefined) {
    return <></>;
  }

  const division = targetLectureCode.slice(0, 2);

  return (
    <SearchCardWrap hoverColor={theme.colors.inputBg}>
      <DepartmentIcon
        text={division}
        color={theme.colors["gray-50"]}
        isChecked={false}
      />
      <CardContentWrap color={theme.colors.primaryText}>
        <div>{subjectName}</div>
        {/* 과목 이름 */}
        <p>
          <span>{professorName}</span> {/* 교수 이름 */}&nbsp; |&nbsp; &nbsp;
          {subjectCode.join(", ")} {/* 과목 코드 */}
        </p>
      </CardContentWrap>
    </SearchCardWrap>
  );
}
