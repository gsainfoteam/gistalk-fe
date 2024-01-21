import styled from "styled-components";
import { theme } from "@/style/theme";

const ConcreteInfoGrid = styled.div`
  margin: 10px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 25px);
`;

/** 구체적인 수치 보기를 클릭했을 보여주는 info */
const ConcreteInfo = styled(theme.universalComponent.DivTextContainer)<{
  colorP: string;
}>`
  font-family: NSMedium;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  div:nth-child(1) {
    margin-left: 10px;
  }

  div:nth-child(2) {
    font-family: NSRegular;

    span {
      color: ${(props) => props.colorP};
    }

    margin-right: 10px;
  }
`;

export default function EvaluationSummary() {
  return (
    <ConcreteInfoGrid>
      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      >
        <div>수업 난이도</div>
        <div>
          <span>{3.0}</span>명
        </div>
      </ConcreteInfo>
      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      >
        <div>과제량</div>
        <div>
          <span>{3.4}</span>명
        </div>
      </ConcreteInfo>
      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      >
        <div>유익함</div>
        <div>
          <span>{2}</span>명
        </div>
      </ConcreteInfo>
      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      >
        <div>재미/흥미</div>
        <div>
          <span>{1.8}</span>명
        </div>
      </ConcreteInfo>
      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      >
        <div>성적 만족도</div>
        <div>
          <span>{2.5}</span>명
        </div>
      </ConcreteInfo>
      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      >
        <div>강의력</div>
        <div>
          <span>{4.1}</span>명
        </div>
      </ConcreteInfo>

      <ConcreteInfo
        color={theme.colors.secondaryText}
        colorP={theme.colors.primary}
        fontSize={15}
      ></ConcreteInfo>
    </ConcreteInfoGrid>
  );
}
