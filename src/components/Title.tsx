import styled from "styled-components";
import {theme} from "../style/theme";

const TitleWrap = styled.div<{ color: string; bgColor: string }>`
  width: 87vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 0 auto;

  div:nth-child(1) {
    margin-right: 8px;
    display: flex;
    align-items: center;
  }

  padding-top: 13px;
  padding-bottom: 13px;
  border-bottom: ${(props) => props.color} 1.5px solid;
  border-radius: 0;
  background-color: ${(props) => props.bgColor};
  
  top:0px;
  position: sticky;
  z-index: 10;
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

/** 평균 점수 표시 */
const AverageScore = styled(theme.universalComponent.DivTextContainer)<{
  primaryColor: string;
}>`
  font-family: NSMedium;
  span {
    font-family: NSBold;
    color: ${(props) => props.primaryColor};
  }
`;

/** 이 title 부분이 detailedCE에도 똑같이 들어가므로 function으로 묶어 export 함 */
export default function Title() {
    

    return (
        <TitleWrap color={theme.colors.grayStroke} bgColor={theme.colors.white}>
            <div>
                <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
                    거시경제학
                </SubjectTitle>
                <SubjectTitle fontSize={15} color={theme.colors.secondaryText}>
                    김상호 / EB2724
                </SubjectTitle>
            </div>
            <AverageScore
                primaryColor={theme.colors.primary}
                fontSize={15}
                color={theme.colors.secondaryText}
            >
                평균 <span>2.35</span>
            </AverageScore>
        </TitleWrap>
    );
}