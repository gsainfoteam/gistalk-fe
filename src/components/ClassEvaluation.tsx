import Hexagon from "./Hexagon";
import {theme} from "../style/theme";
import Header from "./Header";
import styled from "styled-components";
import {useState} from "react";


import ArrowL_Svg from "../assets/svgs/arrowL.svg";
import {IHexData} from "../Interfaces/interfaces";
import {tempdb} from "../tempdb/tempdb";
import RecommendTextForm from "./RecommendTextForm";
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

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`

/** · 수강생들의 평가 · 를 표시하는 div */
const EvaluationText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  margin: 30px auto 0 auto;
  text-align: center;
`

/** 방사형 그래프인 Hexagon component를 감싸는 div */
const GraphWrap = styled.div`
  position: relative;
  top: -35px;
`

/** '구체적인 수치 보기' 담당하는 wrap */
const SeeConcreteInfoWrap = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ArrowLSvg = styled(theme.universalComponent.SvgIcon)<{ open: boolean }>`
  transform: ${(props) => props.open && "rotate(-90deg)"};
  transition: 0.1s;
`;

const ConcreteInfoGrid = styled.div`
  width: 87vw;
  margin: 10px auto 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 25px);
`

/** 구체적인 수치 보기를 클릭했을 보여주는 info */
const ConcreteInfo = styled(theme.universalComponent.DivTextContainer)<{ colorP: string }>
    `
      font-family: NSMedium;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div:nth-child(1) {
        margin-left: 10px;
      }

      div:nth-child(2) {
        font-family: NSRegular;

        span {
          color: ${props => props.colorP}
        }

        margin-right: 10px;
      }
    `

/** 세부 강의평가 보러 가는 버튼 */
const GotoDetailedCEBtn = styled(theme.universalComponent.DivTextContainer)`
  width: 200px;
  height: 40px;
  font-family: NSBold;
  border: 1.5px solid ${props => props.color};
  margin: 30px auto 0 auto;
  text-align: center;
  line-height: 40px;
`

const OneLineReviewText = styled(theme.universalComponent.DivTextContainer)<{ borderColor: string }>`
  width: 87vw;
  height: 42px;
  font-family: NSBold;
  border-top: 1.5px solid ${props => props.borderColor};
  border-bottom: 1.5px solid ${props => props.borderColor};
  border-radius: 0;
  margin: 20px auto 0 auto;
  text-align: center;
  line-height: 42px;
`

/** Hexagon position 처리 때문에 밀려난 부분들 싹 다 위로 올리는 컴포넌트 */
const Upper = styled.div`
  position: relative;
  top: -85px;
`

/** Radar Chart에 들어갈 임시 데이터 */
const tempData: IHexData[] = tempdb[0].hexData

export default function ClassEvaluation() {
    const [concreteOpen, setConcreteOpen] = useState(false)

    const toggleDetailedOpen = () => {
        setConcreteOpen(!concreteOpen)
    }

    /** 강의평가 응답자 수 */
    const NumberOfResponse: number = 79

    /** 평균 점수 계산 */
    let avgScore: number = 0
    tempData.map(i => avgScore += i.score)
    avgScore /= 6
    avgScore = Math.round((avgScore + Number.EPSILON) * 100) / 100 //소수점 둘째자리에서 반올림

    /** 세부 강의평가 개수 */
    const NumberOfDetailedCE: number = 16

    return <>
        <Header text={"강의"}></Header>
        <TitleWrap color={theme.colors.grayStroke}>
            <SubjectTitle fontSize={20} color={theme.colors.primaryText}>거시경제학</SubjectTitle>
            <SubjectTitle fontSize={15} color={theme.colors.secondaryText}>김상호 / EB2724</SubjectTitle>
        </TitleWrap>
        <EvaluationText fontSize={16} color={theme.colors.primaryText}>· 수강생들의 평가 ·</EvaluationText>
        <GraphWrap>
            <Hexagon HexData={tempData}></Hexagon>
        </GraphWrap>
        <Upper>
            <SeeConcreteInfoWrap fontSize={15} color={theme.colors.secondaryText} onClick={toggleDetailedOpen}>
                구체적인 수치 보기
                <ArrowLSvg size={22} src={ArrowL_Svg} open={concreteOpen}/>
            </SeeConcreteInfoWrap>
            {concreteOpen && <ConcreteInfoGrid>
                <ConcreteInfo color={theme.colors.secondaryText} colorP={theme.colors.primary} fontSize={15}>
                    <div>전체 응답자</div>
                    <div><span>{NumberOfResponse}</span>명</div>
                </ConcreteInfo>
                <ConcreteInfo color={theme.colors.secondaryText} colorP={theme.colors.primary} fontSize={15}>
                    <div>평균</div>
                    <div><span>{avgScore}</span></div>
                </ConcreteInfo>
            </ConcreteInfoGrid>}
            <GotoDetailedCEBtn fontSize={16} color={theme.colors.primary}>세부 강의평가 ({NumberOfDetailedCE})
                →</GotoDetailedCEBtn>

            <OneLineReviewText fontSize={18} color={theme.colors.primaryText} borderColor={theme.colors.grayStroke}>
                · 한줄평 ·
            </OneLineReviewText>
            {
                //여기서 i는 tempdb[0]이 가리키는 강의평가에 해당하는 각 한줄평을 가리킴
                tempdb[0].oneLineReview.map(i => <Reply key={i.id} replyData={i}></Reply>)
            }</Upper>
    </>
}