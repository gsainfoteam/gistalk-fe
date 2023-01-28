import styled from "styled-components";
import { theme } from "../style/theme";
import TempIcon from "./TempIcon";
import { major, minor } from "./StdSet";

interface IProps {
  subjectCode: string;
  professorName: string;
  subjectName: string;
  subjectScore: string;
}

const SearchCardWrap = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
`;

const CardContentWrap = styled.div<{ color: string }>`
  padding-left: 10px;
  color: ${(props) => props.color};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap; // 개행 방지
  overflow: hidden; // 넘치는 문자열 숨김
  width: calc(
    100% - 50px - 65px
  ); //100%에서 TempIcon width, AverageScoreWrap width 뺀 값
  p {
    font-family: NSRegular;
    font-size: 14px;
    position: relative;
    top: 1px;
  }

  span {
    font-family: NSMedium;
    text-overflow: ellipsis;
  }

  div {
    font-family: NSBold;
    font-size: 19px;
    position: relative;
    top: -1px;
    white-space: nowrap; // 개행 방지
    overflow: hidden; // 넘치는 문자열 숨김
    text-overflow: ellipsis;
  }
`;

const AverageScoreWrap = styled.div<{ color: string }>`
  text-align: center;
  width: 55px;
  color: ${(props) => props.color};
  font-family: NSBold;

  p {
    font-size: 13px;
    position: relative;
    top: 4px;
  }

  span {
    font-size: 13px;
  }

  div {
    font-size: 25px;
    position: relative;
    top: -4px;
  }
`;

/** 검색했을 때 뜨는 강의평가를 표시하는 카드 */
export default function SearchCard({
  subjectCode,
  professorName,
  subjectName,
  subjectScore,
}: IProps) {
  const Division = subjectCode.slice(0, 2);
  /**major, minor 강의 코드와 대조해서 일치하면 전공/부전공/공통 과목 색상 부여 */
  const IconColor: string = major
    .map((item) => Division === item.subjectCode)
    .includes(true)
    ? "#FFCF23"
    : minor.map((item) => Division === item.subjectCode).includes(true)
    ? "#8CBAFF"
    : "#E0E0E0";
  return (
    <SearchCardWrap>
      <TempIcon text={Division} color={IconColor} isChecked={false}></TempIcon>
      <CardContentWrap color={theme.colors.primaryText}>
        <p>
          {subjectCode}&nbsp;&nbsp;|&nbsp;&nbsp; {/* 과목 코드 */}
          <span>{professorName}</span> {/* 교수 이름 */}
        </p>
        <div>{subjectName}</div>
        {/* 과목 이름 */}
      </CardContentWrap>
      <AverageScoreWrap color={theme.colors.primaryText}>
        <p>평균점수</p>
        <div>
          {subjectScore}
          <span>/5</span>
        </div>
      </AverageScoreWrap>
    </SearchCardWrap>
  );
}
