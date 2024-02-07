import Hexagon from "./components/Hexagon";
import { theme } from "@/style/theme";
import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { tempdb } from "@/tempdb/tempdb";

import Reply from "./components/Reply";

import CatBlankList_Svg from "@/assets/svgs/catBlankList.svg";
import Title from "../../components/Title";
import ScrolledHeader from "@components/ScrolledHeader";
import NavigationHeader from "../../components/NavigationHeader";
import EvaluationSummary from "./components/EvaluationSummary";
import { StyledLink } from "@components/StyledLink";
import {
  getLectureEachEvaluation,
  getLectureTotalEvaluation,
} from "@/apis/lectures";
import { evaluationData } from "./EvaluationPage.const";
import { useQuery } from "@tanstack/react-query";

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
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

  span {
    font-size: 14px;
    color: ${theme.colors.secondaryText};
  }
`;

/** Hexagon position 처리 때문에 밀려난 부분들 싹 다 위로 올리는 컴포넌트 */
const Upper = styled.div`
  position: relative;
  top: -70px;
`;

/** '강의평 쓰러가기' 버튼, 가로로 꽉 차야 함 */
const GoWriteBtn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  position: fixed;

  text-align: center;
  max-width: 480px;
  background-color: ${(props) => props.bgColor};
  line-height: 50px;
  bottom: 0;
  height: 50px;
  width: 100%;
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

export function EvaluationPage() {
  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
    // checkVaildEmail();
  }, []);

  /** Radar Chart에 들어갈 임시 데이터 */
  const params = useParams() as { id: string };
  /**강의별 id */
  const id = Number(params.id);
  const tempData = tempdb.find((value) => value.id === id) || tempdb[0]; //undefined인 경우 default 값: tempdb[0]

  const { isLoading: evaluationLoading, data: evaluationData } = useQuery({
    queryKey: [`getEvaluation/${id}`],
    queryFn: () => getLectureEachEvaluation(id),
  });

  const { isLoading, data: totalEvaluationScore } = useQuery({
    queryKey: [`getEvaluationScore/${id}`],
    queryFn: () => getLectureTotalEvaluation(id),
  });

  const reviewList = (evaluationData?.data ?? []).map(
    (i: evaluationData) => i.review
  );

  return (
    <>
      <NavigationHeader text={"강의평"} />
      <Wrap>
        <Title
          subjectTitle={tempData.subjectName}
          professorName={tempData.professorName}
          subjectCode={tempData.subjectCode}
        />

        <GraphWrap>
          <Hexagon HexData={totalEvaluationScore?.data ?? null} />
        </GraphWrap>

        <Upper>
          <EvaluationSummary
            evaluationData={totalEvaluationScore?.data ?? null}
          />
          <OneLineReviewText
            fontSize={18}
            color={theme.colors.primaryText}
            borderColor={theme.colors.grayStroke}
          >
            한줄평 <span> 이 강의는 {tempData.redundancy}명이 수강했어요</span>
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

      <StyledLink to={`/${params.id}/write`}>
        <GoWriteBtn
          fontSize={20}
          bgColor={theme.colors.primary}
          color={theme.colors.white}
        >
          강의평 쓰러가기
        </GoWriteBtn>
      </StyledLink>

      <ScrolledHeader
        professor={tempData.professorName}
        title={tempData.subjectName}
      ></ScrolledHeader>
    </>
  );
}
