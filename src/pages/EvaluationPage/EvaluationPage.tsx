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
import { concatProfessorNames, convertLectureCodeToList, extractEvaluationData, extractProfessors, makeSelectedIdNull } from "@/utils";
import { recordInfo } from "@/Interfaces/interfaces";
import Card from "@components/Card";
import { evaluationData, HexagonData } from "./EvaluationPage.const";
import { getLectureEachEvaluation } from "@/apis/records";
import { NoComment } from "./components/NoComment";
import { isAllSelectedIdNull, makeIsEvaluationEmpty, makeReviewData, spliceSameReviewAsOne, reviewAmount, spliceEmptyProfLectureInfo, spliceEmptyProfReviewList } from "./EvaluationPage.util";
import { SkeletonDiv, skeletonReview } from "../skeletonComponents/Skeleton.styled";
import { HexagonSkeleton } from "../skeletonComponents/Hexagon.skeleton";

const Wrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;

/** 방사형 그래프인 Hexagon component를 감싸는 div */
const GraphWrap = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OneLineReviewText = styled(theme.universalComponent.DivTextContainer)<{
  borderColor: string;
  isSkeleton: boolean;
}>`
  height: 42px;
  font-family: NSRegular;
  border-bottom: 1.5px solid ${(props) => props.isSkeleton ? "white" : props.borderColor};
  border-radius: 0;
  margin: 20px auto 0 auto;
  line-height: 42px;

  span {
    font-size: 14px;
    color: ${theme.colors.secondaryText};
  }
`;

/** Hexagon 때문에 밀려난 부분들 싹 다 위로 올리는 컴포넌트 */
const Upper = styled.div`
  top: -70px;
  margin-bottom: 100px;
`;

const SummaryWrapper = styled.div`
  position: relative;

  &:hover .barWrapper {
    opacity: 0;
    transition: opacity 0.1s ease;
  }
`;

const SummaryScroll = styled.div`
  height: 80px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #b1b8c0;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
`;

const boxFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ScrollBarWrapper = styled.div<{ isFade?: boolean }>`
  width: 7px;
  height: 100%;
  opacity: 1;
  transition: opacity 0.5s ease;
  animation-name: ${(props) => (props.isFade ? boxFade : null)};
  animation-duration: 2s;

  position: absolute;
  top: 0;
  right: 0;

  background: white;
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
  const [isFade, setIsFade] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (id: number, profNumber: number) => {
    makeSelectedIdNull(profNumber, selectedId);

    const _selectedId = selectedId;
    _selectedId[profNumber] = id === selectedId[profNumber] ? null : id;
    setSelectedId([..._selectedId]);

    selectedId[profNumber] != null ? (
    document.addEventListener('mousedown', () => setIsFade(false)), //마우스 클릭하면 무조건 crollBar 반짝임
    document.addEventListener('mouseup', () => setIsFade(true))) : null;
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
  if (!isLectureInfoLoading && lectureInfo) spliceEmptyProfLectureInfo(lectureInfo.LectureSection);

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

  const isEvaluationEmpty = 
    averageEvaluation &&
    (selectedId.filter((id) => id !== null).some((id) => 
      makeIsEvaluationEmpty(averageEvaluation)[selectedId.indexOf(id)]) ||
    makeIsEvaluationEmpty(averageEvaluation).every((empty) => empty))

  const isReviewNotExist = //교수자가 선택되지 않았을 땐 전체 리뷰의 존재를 판단하고 선택됐을 땐 선택된 리뷰를 판단
    selectedEvaluation &&
    selectedEvaluation.every((value) => 
    Object.values(value).every((content) => content === null));

  const skeletonLoading = !selectedEvaluation ? true : false;

  return (
    <>
      <NavigationHeader text={"강의평"} isNavigateHome={true} />
      <Wrap>
          <Title
            handleCheckboxChange={handleCheckboxChange}
            subjectTitle={lectureInfo?.name}
            sectionInfo={lectureInfo?.LectureSection}
            subjectCode={lectureInfo ? convertLectureCodeToList(lectureInfo?.LectureCode) : undefined}
            selectedId={selectedId}
            isWrite={false}
            isLoading={skeletonLoading}
          />
        {isEvaluationEmpty && !skeletonLoading &&
        <Card>
          데이터가 없습니다.
        </Card>}

        <GraphWrap>
        {selectedEvaluation ? (
          <Hexagon 
            HexData={selectedEvaluation ?? null} 
            selectedId={selectedId} />
            )
          : HexagonSkeleton}
        </GraphWrap>

        <Upper>
          <SummaryWrapper>
            <SummaryScroll>
              <EvaluationSummary 
                selectedEvaluation={selectedEvaluation ?? undefined} 
                selectedId={selectedId}
                isLoading={skeletonLoading}
              />
              <ScrollBarWrapper className="barWrapper" isFade={isFade} />
            </SummaryScroll>
          </SummaryWrapper>

          <OneLineReviewText
            fontSize={18}
            color={theme.colors.primaryText}
            borderColor={theme.colors.grayStroke}
            isSkeleton={skeletonLoading}
          >
            {skeletonLoading 
              ? <div style={{display: "flex", alignItems: "center"}}>
                  <SkeletonDiv widthSize="50px" heightSize="25px"/>
                  &nbsp; <SkeletonDiv widthSize="180px" heightSize="20px"/>
                </div>
              : <>한줄평</>}
            {reviewList && selectedEvaluation &&
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

          {skeletonLoading && 
            skeletonReview.map((skeleton, index) => <Reply key={index} isLoading={skeletonLoading} />)
          }
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

      {selectedEvaluation && (
        <ScrolledHeader
          professor={concatProfessorNames(lectureInfo.LectureSection)}
          title={lectureInfo.name}
        />
      )}
    </>
  );
}
