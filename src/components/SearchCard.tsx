import styled from "styled-components";
import {theme} from "../style/theme";
import TempIcon from "./TempIcon";

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
  width: calc(100% - 50px - 65px); //100%에서 TempIcon width, AverageScoreWrap width 뺀 값
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

    return (
        <SearchCardWrap>
            <TempIcon text={Division} color={"#FFCF23"} isChecked={false}></TempIcon>
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
