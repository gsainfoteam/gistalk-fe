import styled from "styled-components";
import { theme } from "@/style/theme";

interface IProps {
  subjectTitle: string;
  professorName: string;
  subjectCode: string;
}

const TitleWrap = styled.div<{ color: string; bgColor: string }>`
  width: 100%;
  margin: 0 auto 0 auto;

  padding-top: 13px;
  padding-bottom: 13px;
  border-bottom: ${(props) => props.color} 1.5px solid;
  border-radius: 0;
  background-color: ${(props) => props.bgColor};

  z-index: 10;

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  word-break: keep-all;
  margin-bottom: 3px;

  span {
    font-size: 14px;
    font-family: NSRegular;
    color: ${theme.colors.secondaryText};
  }
`;

/** 이 title 부분이 detailedCE에도 똑같이 들어가므로 function으로 묶어 export 함 */
export default function Title({
  subjectTitle,
  professorName,
  subjectCode,
}: IProps) {
  return (
    <TitleWrap color={theme.colors.grayStroke} bgColor={theme.colors.white}>
      <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
        {subjectTitle || "ERR"} <span> {subjectCode || "ERR"}</span>
        {/* 비어 있는 string이라면 ERR을 출력하도록 함 */}
      </SubjectTitle>
      <div>
        <SubjectTitle fontSize={15} color={theme.colors.secondaryText}>
          {professorName || "ERR"}
        </SubjectTitle>
      </div>
    </TitleWrap>
  );
}
