import styled from "styled-components";
import { theme } from "@/style/theme";
import TempIcon from "@/pages/SearchPage/components/TempIcon";
import { major, minor, underG } from "@/constants/StdSet";
import { departmentColors } from "@/constants/departmentColors";
import { convertLectureCodeToList } from "@/utils";
import useSubjectCode from "@/hooks/useSubjectCode";

interface IProps {
  subjectCode: string;
  professorName: string;
  subjectName: string;
}

const SearchCardWrap = styled.div<{ hoverColor: string }>`
  width: 100%;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  :active {
    background-color: ${(props) => props.hoverColor};
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
  const lectureCodeList = convertLectureCodeToList(subjectCode); //lecture_code가 string list로 되어있어서 배열로 변경
  const targetLectureCode = useSubjectCode(lectureCodeList);
  const Division = targetLectureCode.slice(0, 2);

  /**major, minor 강의 코드와 대조해서 일치하면 전공/부전공/공통 과목 색상 부여 */
  const IconColor: string = major
    .map((item) => Division === item.subjectCode)
    .includes(true)
    ? departmentColors.major
    : minor.map((item) => Division === item.subjectCode).includes(true)
    ? departmentColors.minor
    : underG.map((item) => Division === item.subjectCode).includes(true)
    ? departmentColors.underGraduate
    : "#E0E0E0";
  return (
    <SearchCardWrap hoverColor={theme.colors.inputBg}>
      <TempIcon text={Division} color={IconColor} isChecked={false} />
      <CardContentWrap color={theme.colors.primaryText}>
        <div>{subjectName}</div>
        {/* 과목 이름 */}

        <p>
          <span>{professorName}</span> {/* 교수 이름 */}&nbsp; |&nbsp; &nbsp;
          {lectureCodeList.join(", ")} {/* 과목 코드 */}
        </p>
      </CardContentWrap>
    </SearchCardWrap>
  );
}
