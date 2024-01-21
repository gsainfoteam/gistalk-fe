import Hexagon from "./components/Hexagon";
import { theme } from "@/style/theme";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { tempdb } from "@/tempdb/tempdb";

import Reply from "./components/Reply";

import CatBlankList_Svg from "@/assets/svgs/catBlankList.svg";
import useSubjectCode from "@/hooks/useSubjectCode";
import Title from "./components/Title";
import ScrolledHeader from "@components/ScrolledHeader";
import NavigationHeader from "../../components/NavigationHeader";
import EvaluationSummary from "./components/EvaluationSummary";

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

/** · 수강생들의 평가를 표시하는 div */
const EvaluationText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  margin: 30px auto 0 auto;
  text-align: center;
`;

/** 방사형 그래프인 Hexagon component를 감싸는 div */
const GraphWrap = styled.div`
  position: relative;
  top: -30px;
`;

const OneLineReviewText = styled(theme.universalComponent.DivTextContainer)<{
  borderColor: string;
}>`
  height: 42px;
  font-family: NSRegular;
  border-bottom: 1.5px solid ${(props) => props.borderColor};
  border-radius: 0;
  margin: 20px auto 0 auto;
  line-height: 42px;
`;

/** Hexagon position 처리 때문에 밀려난 부분들 싹 다 위로 올리는 컴포넌트 */
const Upper = styled.div`
  position: relative;
  top: -70px;
`;

/** '강의평 쓰러가기' 버튼 */
const GoWriteBtn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  text-align: center;
  width: 95vw;
  background-color: ${(props) => props.bgColor};
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 2.5vw;
  font-family: NSBold;
  margin: 0 2.5vw;
`;

/** Search 리스트가 비었을 떄 나오는 고양이 일러스트, 문구 Wrap */
const BlankWrap = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlankSvg = styled(theme.universalComponent.SvgIcon)``;
const BlankText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

export default function ClassEvaluation() {
  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
    // checkVaildEmail();
  });

  /** Radar Chart에 들어갈 임시 데이터 */
  const params = useParams() as { id: string };
  /**강의별 id */
  const id = Number(params.id);
  const tempData = tempdb.find((value) => value.id === id) || tempdb[0]; //undefined인 경우 default 값: tempdb[0]

  return (
    <>
      <NavigationHeader text={"강의평"} />
      <Wrap>
        <Title
          subjectTitle={tempData.subjectName}
          professorName={tempData.professorName}
          subjectCode={useSubjectCode(tempData.subjectCode)}
        />
        <EvaluationText fontSize={16} color={theme.colors.primaryText}>
          {tempData.redundancy}명의 수강생들이 남긴 평가에요
        </EvaluationText>
        <GraphWrap>
          <Hexagon HexData={tempData.hexData}></Hexagon>
        </GraphWrap>

        <Upper>
          <EvaluationSummary />
          <OneLineReviewText
            fontSize={18}
            color={theme.colors.primaryText}
            borderColor={theme.colors.grayStroke}
          >
            한줄평
          </OneLineReviewText>
          {
            //여기서 i는 tempdb[0]이 가리키는 강의평가에 해당하는 각 한줄평을 가리킴
            tempData.oneLineReview.map((i) => (
              <Reply key={i.id} replyData={i} isMine={false}></Reply>
            ))
          }

          {tempData.oneLineReview.length === 0 && (
            <BlankWrap>
              <BlankSvg size={120} src={CatBlankList_Svg} />
              <BlankText fontSize={14} color={theme.colors.secondaryText}>
                아직 한줄평이 작성되지 않았네요.
              </BlankText>
            </BlankWrap>
          )}
        </Upper>
      </Wrap>

      <GoWriteBtn
        fontSize={20}
        bgColor={theme.colors.primary}
        color={theme.colors.white}
        onClick={() => {
          window.open("https://forms.gle/DS4ZXU5xQ3UPbyR68");
        }}
      >
        강의평 쓰러가기
      </GoWriteBtn>
      <ScrolledHeader
        professor={tempData.professorName}
        title={tempData.subjectName}
      ></ScrolledHeader>
    </>
  );
}
