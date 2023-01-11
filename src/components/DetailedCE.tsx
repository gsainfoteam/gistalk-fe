import styled from "styled-components";
import {theme} from "../style/theme";
import Header from "./Header";
import {tempdb} from "../tempdb/tempdb";
import Reply from "./Reply";

const TitleWrap = styled.div<{ color: string }>`
  width: 87vw;
  display: flex;
  align-items: center;
  margin: 10px auto 0 auto;

  div:nth-child(1) {
    margin-right: 8px;
  }

  padding-bottom: 13px;
  border-bottom: ${props => props.color} 1.5px solid;
  border-radius: 0;
`

/** 각 세부평가를 구분짓는 가로선 */
const HorizontalLine = styled.div<{ borderColor: string }>`
  width:87vw;
  margin:25px auto 0 auto;
  border-bottom: 0.4px solid ${props => props.borderColor};
`
/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`

export default function DetailedCE() {
    const isLocked = true;

    return <>
        <Header text={"세부 강의평가"}></Header>
        <TitleWrap color={theme.colors.grayStroke}>
            <SubjectTitle fontSize={20} color={theme.colors.primaryText}>거시경제학</SubjectTitle>
            <SubjectTitle fontSize={15} color={theme.colors.secondaryText}>김상호 / EB2724</SubjectTitle>
        </TitleWrap>
        {
            tempdb[0].detailedReview.map(i => <>
                <Reply key={i.id} replyData={i} />
                <HorizontalLine borderColor={theme.colors.secondaryText}></HorizontalLine>
            </>)
        }
    </>
}