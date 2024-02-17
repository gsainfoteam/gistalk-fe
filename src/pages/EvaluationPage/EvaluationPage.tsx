import Hexagon from "./components/Hexagon";
import { theme } from "@/style/theme";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Reply from "./components/Reply";

import CatBlankList_Svg from "@/assets/svgs/catBlankList.svg";
import Title from "../../components/Title";
import ScrolledHeader from "@components/ScrolledHeader";
import NavigationHeader from "../../components/NavigationHeader";
import EvaluationSummary from "./components/EvaluationSummary";
import { StyledLink } from "@components/StyledLink";
import {
  getLectureEachEvaluation,
  getLectureSingleInfo,
  getLectureTotalEvaluation,
  getLectureTotalEvaluationForProf,
} from "@/apis/lectures";
import { useQuery } from "@tanstack/react-query";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import { convertLectureCodeToList } from "@/utils";
import { IReply, professorInfo } from "@/Interfaces/interfaces";
import Card from "@components/Card";

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
  const isValidToken = useCheckValidToken();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCheckboxChange = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
    // checkVaildEmail();
  }, []);

  /** Radar Chart에 들어갈 임시 데이터 */
  const params = useParams() as { id: string };
  /**강의별 id */
  const id = Number(params.id);

  const { isLoading: evaluationLoading, data: evaluationData } = useQuery({
    queryKey: [`getEvaluation/${id}/${selectedId}`],
    queryFn: () => getLectureEachEvaluation(id, selectedId),
    retry: 0,
  });

  const { isLoading, data: profEvaluationScore } = useQuery({
    queryKey: [`getEvaluationScore/${id}/${selectedId}`],
    queryFn: () => getLectureTotalEvaluationForProf(id, selectedId),
    retry: 0,
    enabled: !!selectedId, //교수를 아무도 선택하지 않을때, 즉 null일때는 쿼리를 보내지 않음
  });

  const { isLoading: totalLoading, data: totalEvaluationData } = useQuery({
    queryKey: [`getEvaluationScore/${id}`],
    queryFn: () => getLectureTotalEvaluation(id),
    retry: 0,
  });

  const {
    isLoading: isLectureInfoLoading,
    data: lectureInfoData,
    isError,
  } = useQuery({
    queryKey: [`getLectureSingleInfo/${id}`],
    queryFn: () => getLectureSingleInfo(id),
    retry: 0,
  });

  const { data: lectureInfo } = { ...lectureInfoData };
  const { data: reviewList } = { ...evaluationData };
  const { data: totalEvaluation } = { ...totalEvaluationData };

  return (
    <>
      <NavigationHeader prevUrl={"/search"} text={"강의평"} />
      <Wrap>
        {!isLectureInfoLoading && lectureInfo && (
          <Title
            handleCheckboxChange={handleCheckboxChange}
            subjectTitle={lectureInfo[0].lecture_name}
            professorInfo={lectureInfo[0].prof}
            subjectCode={convertLectureCodeToList(lectureInfo[0].lecture_code)}
            selectedId={selectedId}
          />
        )}

        {selectedId === null && <Card>교수자를 선택해주세요</Card>}

        <GraphWrap>
          <Hexagon HexData={profEvaluationScore?.data ?? null} />
        </GraphWrap>

        <Upper>
          <EvaluationSummary
            evaluationData={profEvaluationScore?.data ?? null}
          />

          <OneLineReviewText
            fontSize={18}
            color={theme.colors.primaryText}
            borderColor={theme.colors.grayStroke}
          >
            한줄평
            {!evaluationLoading && (
              <span>
                {" "}
                이 강의에 {reviewList.length ?? 0}명이 평가를 남겼어요
              </span>
            )}
          </OneLineReviewText>

          {!evaluationLoading && //로딩이 완료되고 나서 강의평이 존재하지 않는 경우를 핸들링
            ((reviewList ?? []).length === 0 ? (
              <BlankWrap>
                <BlankSvg size={120} src={CatBlankList_Svg} />
                <BlankText fontSize={14} color={theme.colors.secondaryText}>
                  아직 한줄평이 작성되지 않았네요.
                </BlankText>
              </BlankWrap>
            ) : (
              <>
                {reviewList.map((review: IReply) => (
                  <Reply key={review.record_id} replyData={review} />
                ))}
              </>
            ))}
        </Upper>
      </Wrap>

      {isValidToken ? (
        <StyledLink to={`/${params.id}/write`}>
          <GoWriteBtn
            fontSize={20}
            bgColor={theme.colors.primary}
            color={theme.colors.white}
          >
            강의평 작성하기
          </GoWriteBtn>
        </StyledLink>
      ) : (
        <StyledLink to="/login" state={{ prevPath: `/${params.id}/write` }}>
          <GoWriteBtn
            fontSize={20}
            bgColor={theme.colors.primary}
            color={theme.colors.white}
          >
            로그인 하고 강의평 작성하기
          </GoWriteBtn>
        </StyledLink>
      )}

      {!isLectureInfoLoading && lectureInfo && (
        <ScrolledHeader
          professor={lectureInfo[0].prof
            .map((prof: professorInfo) => prof.prof_name)
            .join(", ")}
          title={lectureInfo[0].lecture_name}
        />
      )}
    </>
  );
}
