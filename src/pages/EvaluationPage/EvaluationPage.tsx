import Hexagon from "./components/Hexagon";
import { theme } from "@/style/theme";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Reply from "./components/Reply";

import Title from "../../components/Title";
import ScrolledHeader from "@components/ScrolledHeader";
import NavigationHeader from "../../components/NavigationHeader";
import EvaluationSummary from "./components/EvaluationSummary";
import { StyledLink } from "@components/StyledLink";
import {
  getLectureSingleInfo,
  getLectureTotalEvaluation,
  getLectureTotalEvaluationForProf,
} from "@/apis/lectures";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import { concatProfessorNames, convertLectureCodeToList, extractEvaluationData, extractProfessors } from "@/utils";
import { recordInfo } from "@/Interfaces/interfaces";
import Card from "@components/Card";
import { evaluationData, HexagonData } from "./EvaluationPage.const";
import { getLectureEachEvaluation } from "@/apis/records";
import { NoComment } from "./components/NoComment";
import { isAllSelectedIdNull, makeIsEvaluationEmpty, makeReviewData, spliceSameReviewAsOne, reviewAmount, spliceEmptyProfLectureInfo, spliceEmptyProfReviewList } from "./EvaluationPage.util";

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

const SummaryWrapper = styled.div`
  position: relative;
  height: 80px;
`;

const SummaryScroll = styled.div`
  height: 80px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.grayStroke};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
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

let averageEvaluation: evaluationData[];

export function EvaluationPage() {
  const isValidToken = useCheckValidToken();
  const [selectedId, setSelectedId] = useState<(number | null)[]>([null]);
  const [isProfEmpty, setIsProfEmpty] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (id: number, profNumber: number) => {
    const _selectedId = selectedId;

    setIsProfEmpty(false);
    if (makeIsEvaluationEmpty(averageEvaluation)[profNumber]) {
      setTimeout(() => {setIsProfEmpty(true);}, 50);
      _selectedId[profNumber] = null;
      setSelectedId([..._selectedId]);
    }
    else {
      _selectedId[profNumber] = id === selectedId[profNumber] ? null : id;
      setSelectedId([..._selectedId]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 리스트뷰에서 강의평을 들어갈 경우 스크롤 위치가 그대로 남아있는 것을 방지
    // checkVaildEmail();
  }, []);

  /** Radar Chart에 들어갈 임시 데이터 */
  const params = useParams() as { id: string };
  /**강의별 id */
  const id = Number(params.id);

  const {data: evaluationData, isLoading: isEvaluationLoading} = useQueries({
    queries: selectedId.map((select) => {
      //selectedId가 null일 때는 특정 lectureId의 전체값을 가져옴
      return {
        queryKey: [`getEvaluation/${id}/${select}`],
        queryFn: () => getLectureEachEvaluation(id, select),
        retry: 0,
      };
    }),
    combine: (evaluationData) => {
      return {
        data: evaluationData.map((evaluation) => evaluation.data),
        isLoading: evaluationData.some((evaluation) => evaluation.isLoading),
      };
    },
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
  if (!isLectureInfoLoading && lectureInfo) {
    spliceEmptyProfLectureInfo(lectureInfo.LectureSection);
  }
  useEffect(() => { //처음 selectedId 모두 null로 설정하기
    !isLectureInfoLoading && 
      setSelectedId(extractProfessors(lectureInfo.LectureSection).map(() => null));
  }, [lectureInfo]);

  const reviewList = !isEvaluationLoading 
    ? evaluationData.map((test) => test !== undefined && test.data) 
    : undefined;
  reviewList && spliceEmptyProfReviewList(reviewList[0]);
    
  const selectedReview: recordInfo[][] = []; //리뷰 정보를 배열로 변환해 저장
  !isEvaluationLoading && reviewList && makeReviewData(selectedId, selectedReview, reviewList);
  spliceSameReviewAsOne(selectedReview)

  const selectedEvaluation = //선택한 교수가 없는 경우 전체 점수의 평균을 보여주고, 선택한 교수가 있는 경우 그 교수의 점수의 평균만 보여줌. 만약에 데이터가 모두 없는 경우 각 값에 null을 할당
    !isLectureInfoLoading && !isEvaluationLoading && reviewList
      ? extractEvaluationData(selectedId, reviewList, lectureInfo)
      : undefined;

  isAllSelectedIdNull(selectedId) && selectedEvaluation ? averageEvaluation = selectedEvaluation : null;

  const isDataEmpty = 
    selectedEvaluation && selectedReview && //다른 데이터들이 전부 로딩이 끝나면 실행
    averageEvaluation &&
    (isProfEmpty ||
    makeIsEvaluationEmpty(averageEvaluation).every((empty) => empty))

  const isReviewNotExist = //교수자가 선택되지 않았을 땐 전체 리뷰의 존재를 판단하고 선택됐을 땐 선택된 리뷰를 판단
    selectedEvaluation &&
    selectedEvaluation.every((value) => 
    Object.values(value).every((content) => content === null));

  return (
    <>
      <NavigationHeader text={"강의평"} isNavigateHome={true} />
      <Wrap>
        {!isLectureInfoLoading && lectureInfo && averageEvaluation && (
          <Title
            handleCheckboxChange={handleCheckboxChange}
            subjectTitle={lectureInfo.name}
            sectionInfo={lectureInfo.LectureSection}
            subjectCode={convertLectureCodeToList(lectureInfo.LectureCode)}
            selectedId={selectedId}
            isWrite={false}
            evaluationEmptyList={makeIsEvaluationEmpty(averageEvaluation)}
          />
        )}

        {isDataEmpty && 
        <Card 
          isProfEmpty={isProfEmpty} 
          isAllEmpty={makeIsEvaluationEmpty(averageEvaluation).every((empty) => empty)}
          >
          데이터가 없습니다.
        </Card>}

        <GraphWrap>
        {selectedEvaluation && (
          <Hexagon 
            HexData={selectedEvaluation ?? null} 
            selectedId={selectedId} />
            )}
        </GraphWrap>

        <Upper>
          <SummaryWrapper>
          {selectedEvaluation && (
            <SummaryScroll>
              <EvaluationSummary 
                selectedEvaluation={selectedEvaluation ?? null} 
                selectedId={selectedId}
              />
            </SummaryScroll>)}
          </SummaryWrapper>
          <OneLineReviewText
            fontSize={18}
            color={theme.colors.primaryText}
            borderColor={theme.colors.grayStroke}
          >
            한줄평
            {reviewList &&
              (isAllSelectedIdNull(selectedId) ? ( 
                <span>
                  {" "}
                  이 강의에 {(reviewList[0] ?? []).length ?? 0}명이 평가를
                  남겼어요
                </span>
              ) : (
                <span> 이 강의에 {reviewAmount(selectedReview)}명이 평가를 남겼어요</span>
              ))}
          </OneLineReviewText>

          {isAllSelectedIdNull(selectedId)
            ? isReviewNotExist 
              ? <NoComment />
              : reviewList && reviewList[0].map( //아무 선택도 안 했지만 데이터가 있을 때 모든 리뷰 나타내기
                  (
                    reviewContent: recordInfo 
                  ) => (
                    <Reply key={reviewContent.id} replyData={reviewContent} />
                  )
                )
            : //교수를 선택했을 때
              !isAllSelectedIdNull(selectedId) && //로딩중일 때 "데이터가 없습니다"가 뜨지 않도록 핸들링
              isReviewNotExist
                ? <NoComment />
                : selectedReview && selectedReview.map((select, index) => (
                    <div key={selectedId[index]}>
                      {select.map((review: recordInfo) => 
                        <Reply key={review.id} replyData={review} />
                      )}
                    </div>
                  ))}
        </Upper>
      </Wrap>

      {isValidToken ? (
        <StyledLink to={`/write/${params.id}`}>
          <GoWriteBtn
            fontSize={20}
            bgColor={theme.colors.primary}
            color={theme.colors.white}
          >
            강의평 작성하기
          </GoWriteBtn>
        </StyledLink>
      ) : (
        <StyledLink to="/login" state={{ prevPath: `/write/${params.id}` }}>
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
          professor={concatProfessorNames(lectureInfo.LectureSection)}
          title={lectureInfo.name}
        />
      )}
    </>
  );
}
