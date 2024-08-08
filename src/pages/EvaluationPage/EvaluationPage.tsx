import Hexagon from "./components/Hexagon";
import { theme } from "@/style/theme";
import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { useQueries, useQuery } from "@tanstack/react-query";
import { useCheckValidToken } from "@/hooks/useCheckTokenValid";
import { concatProfessorNames, convertLectureCodeToList } from "@/utils";
import { IReply, LectureSectionWithProfessorInfo, reviewInfo } from "@/Interfaces/interfaces";
import Card from "@components/Card";
import { evaluationData, HexagonData } from "./EvaluationPage.const";

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
`

const ScrollBarWrapper = styled.div<{ isFade?: boolean }>`
  width: 7px;
  height: 100%;
  opacity: 1;
  transition: opacity 0.5s ease;
  animation-name: ${(props) => props.isFade ? boxFade : null};
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
  const [clickedId, setClickedId] = useState<number | null>(null); //isEvaluationEmpty 구별할 때 사용
  const isValidToken = useCheckValidToken();
  const [selectedId, setSelectedId] = useState<(number | null)[]>([null]);
  const [isFade, setIsFade] = useState(false);

  const navigate = useNavigate();

  const handleCheckboxChange = (id: number, profNumber: number) => {
    for(let k = 0; k < profNumber; k++) {
      selectedId[k] = selectedId[k] ? selectedId[k] : null;
    }
    id === selectedId[profNumber] ? 
      (selectedId[profNumber] = null) : 
      (selectedId[profNumber] = id);
    setSelectedId([...selectedId]);
    setClickedId(profNumber);

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

  const evaluationData = useQueries({queries: selectedId.map((select) => { //selectedId가 null일 때는 특정 lectureId의 전체값을 가져옴
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
      }
    }
  });

  const profLectures = useQueries({queries: selectedId.map((select) => {
    return {
      queryKey: [`getEvaluationScore/${id}/${select}`],
      queryFn: () => getLectureTotalEvaluationForProf(id, select),
      retry: 0,
      enabled: !!selectedId, //교수를 아무도 선택하지 않을때, 즉 null일때는 쿼리를 보내지 않음
    };  
    }),
    combine: (profLectures) => {
      return {
        data: profLectures.map((lecture) => lecture.data),
        isLoading: profLectures.some((lecture) => lecture.isLoading),
      }
    }
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
  const reviewList = { ...evaluationData.data };
  const profEvaluation = { ...profLectures.data };
  const { data: totalEvaluation } = { ...totalEvaluationData };
  
  const evaluationLoading = evaluationData.isLoading;
  const isLoading = profLectures.isLoading;

  const averageData = [totalEvaluation]; //평균 정보를 배열로 변환해 저장
  const selectedData: HexagonData[] = []; //선택된 교수 정보를 배열로 변환해 저장
  !isLoading && selectedId.map((select, index) => (select != null ? 
    selectedData[index] = profEvaluation[index]?.data : null));
  const selectedReview: reviewInfo[][] = []; //리뷰 정보를 배열로 변환해 저장
  !evaluationLoading && selectedId.map((select, index) => (select != null ? 
    selectedReview[index] = reviewList[index]?.data : null));

  const selectedEvaluation = //선택한 교수가 없는 경우 전체를 보여주고, 선택한 교수가 있는 경우 그 교수의 평가만 보여줌. 만약에 데이터가 모두 없는 경우 null을 로드
    selectedId.every((value) => value == null)  ? averageData : selectedData; 
  const isEvaluationEmpty = //선택한 강의의 데이터 유무를 보여줌, 데이터가 있으면 배열의 위치를 반환
  selectedId.map((id, index) => (id != null ? 
    (selectedEvaluation[index] !== undefined && 
    Object.values(selectedEvaluation[index]).every((value) => value === null) ? index : null) 
    : null));
  const emptyValues = isEvaluationEmpty.filter((id) => id != null);

  const noComment = (
  <BlankWrap>
    <BlankSvg size={120} src={CatBlankList_Svg} />
      <BlankText fontSize={14} color={theme.colors.secondaryText}>
        아직 한줄평이 없습니다. 첫 번째로 한줄평을 남겨보세요!
    </BlankText>
  </BlankWrap>
  );

  const ReviewAmount = () => {
    let count = 0;
    selectedReview.map((review) => count += review.length)

    return count;
  };

  return (
    <>
      <NavigationHeader text={"강의평"} />
      <Wrap>
        {!isLectureInfoLoading && lectureInfo && (
          <Title
            handleCheckboxChange={handleCheckboxChange}
            subjectTitle={lectureInfo.name}
            sectionInfo={lectureInfo.LectureSection}
            subjectCode={convertLectureCodeToList(lectureInfo.LectureCode)}
            selectedId={selectedId}
            isWrite={false}
          />
        )}

        {!isLoading && 
        !isLectureInfoLoading && 
        !totalLoading && 
        isEvaluationEmpty.filter((value) => value != null)[0] != undefined &&
        <Card>
          {isEvaluationEmpty.map((empty, index) => empty !== null && (
          `${lectureInfo.LectureSection[empty].Professor[0].name}
          ${emptyValues[emptyValues.length - 1] !== empty ? ", " : ""}`))} 교수님의 데이터가 없습니다.
        </Card>}

        {!isLoading && !totalLoading && selectedEvaluation && (
        <GraphWrap>
          <Hexagon HexData={selectedEvaluation ?? null} averageData={averageData} />
        </GraphWrap>
        )}

        <Upper>
        {!isLoading && !totalLoading && selectedEvaluation && (
          <SummaryWrapper>
            <SummaryScroll>
              <EvaluationSummary 
              evaluationData={selectedEvaluation ?? null} 
              averageData={averageData}
              />
              <ScrollBarWrapper className="barWrapper" isFade={isFade} />
            </SummaryScroll>
          </SummaryWrapper>
        )}
          <OneLineReviewText
            fontSize={18}
            color={theme.colors.primaryText}
            borderColor={theme.colors.grayStroke}
          >
            한줄평
            {!evaluationLoading && (
              selectedId.every((value) => value === null) ? (//아무런 교수도 선택하지 않았을 때
              <span>
                {" "}
                이 강의에 {(reviewList[0]?.data ?? []).length ?? 0}명이 평가를 남겼어요
              </span> )
              :
              <span>
                {" "}
                이 강의에 {ReviewAmount()}명이 평가를 남겼어요
              </span>
            )}
          </OneLineReviewText>

          {!evaluationLoading && //로딩이 완료되고 나서 강의평이 존재하지 않는 경우를 핸들링
          !totalLoading && 
          selectedReview.every((value) => value != undefined) && 
          !isLectureInfoLoading && 
          lectureInfo &&
            selectedId.every((value) => value === null) ? //아무런 교수도 선택하지 않았을 때
              (Object.values(totalEvaluation).every((value) => value === null) 
              ? (noComment) : ( 
                  reviewList[0]?.data.map((reviewContent: reviewInfo) => ( //아무 선택도 안 했을 때 모든 리뷰 나타내기
                  <Reply key={reviewContent.id} replyData={reviewContent}/>))
              ))
            : //교수를 선택했을 때
            !evaluationLoading && (selectedReview.every((value) => value != undefined && value.length === 0)
              ? (noComment) : (
              selectedReview.map((select, index) => (
              <div key={selectedId[index]}>
                {select.map((review: reviewInfo) => (
                  <Reply key={review.id} replyData={review} />
                ))}
              </div>
            ))
          ))
            }
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
          professor={concatProfessorNames(lectureInfo.LectureSection)}
          title={lectureInfo.name}
        />
      )}
    </>
  );
}
