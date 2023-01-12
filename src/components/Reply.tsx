import { theme } from "../style/theme";
import styled from "styled-components";
import { IReply } from "../Interfaces/interfaces";
import RecommendTextForm from "./RecommendTextForm";
import LikeDislikeBtnWrap from "./LikeDislikeBtnWrap";
import React, { createContext, useContext, useState } from "react";

import lock_Svg from "../assets/svgs/lock.svg";
import UnlockModal from "./UnlockModal";

interface IProps {
  replyData: IReply;

  /** 내 글인지 확인하기 위함 (댓글 옆에 '(MY)' 붙이는 용도) */
  isMine: boolean;
}

/** 전체 Wrap */
const Wrap = styled.div`
  width: 87vw;
  margin: 20px auto 0 auto;
`;

/** 추천 or 비추천, 몇 학기 수강자인지, 좋아요/싫어요 수는 몇개인지 표시하는 전체 부분 Wrap */
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/** InfoWrap 안에 들어가는 왼쪽 부분(추천 or 비추천, 몇 학기 수강자인지) */
const LeftWrap = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

/** 댓글에서 오른쪽 부분에 좋아요 싫어요 버튼 들어가는 컴포넌트 */
const RightWrap = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

/** 몇 년도 몇 학기인지 표시하는 컴포넌트 */
const SemesterText = styled(theme.universalComponent.DivTextContainer)`
  margin-left: 7px;
  font-family: NSBold;
`;

/** (ME) 표시하는 컴포넌트 */
const ME = styled(theme.universalComponent.DivTextContainer)`
  margin-left: 7px;
  font-family: NSBold;
`;

/** 댓글 내용 Wrap */
const ContentWrap = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
  word-break: break-all;
`;

/** 세부 강의평가일 경우 '시험 문제 유형', '과제 유형' 이런거 띄워주는 부제목 컴포넌트 */
const DetailedCESubtitle = styled(theme.universalComponent.DivTextContainer)`
  margin-top: 5px;
  margin-bottom: 3px;
  font-family: NSBold;
`;

/** 세부 강의평가가 잠겨있을 경우 나오는 테두리 있는 흰 box */
const LockBox = styled(theme.universalComponent.DivTextContainer)<{
  borderColor: string;
}>`
  width: 87vw;
  height: 200px;
  margin: 5px auto 0 auto;
  border: 3px solid ${(props) => props.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 몇 자인지, 몇 P 써서 볼 수 있는지 알려주는 텍스트 */
const LockBoxInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

/** 자물쇠 svg wrap */
const LockSvgWrap = styled.div<{ bgColor: string }>`
  width: 45px;
  height: 45px;
  background-color: ${(props) => props.bgColor};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LockSvg = styled(theme.universalComponent.SvgIcon)``;

/** '몇p 써서 보기' 와 'n자' 표시하는 글자 */
const LockViewText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

export default function Reply({ replyData, isMine }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrap>
      <InfoWrap>
        <LeftWrap>
          <RecommendTextForm like={replyData.recommend}></RecommendTextForm>
          <SemesterText fontSize={13} color={theme.colors.secondaryText}>
            {replyData.year}년 {replyData.semester}학기
          </SemesterText>
          {isMine && (
            <ME fontSize={13} color={theme.colors.primary}>
              (ME)
            </ME>
          )}
        </LeftWrap>
        <RightWrap>
          <LikeDislikeBtnWrap
            like={replyData.like}
            dislike={replyData.dislike}
            pushedLike={replyData.pushedLike}
          ></LikeDislikeBtnWrap>
        </RightWrap>
      </InfoWrap>
      {/** content를 배열로 받아서 배열 길이가 1이면 한줄평, 배열 길이가 3이면 세부 강의평가로 인식되도록 만듦
         수정이 필요할 듯 함. */}
      {replyData.content.length == 1 && (
        <ContentWrap fontSize={13} color={theme.colors.primaryText}>
          {replyData.content[0]}
        </ContentWrap>
      )}
      {replyData.content.length == 3 && !replyData.isLocked && (
        <ContentWrap fontSize={13} color={theme.colors.primaryText}>
          {["시험 문제 유형", "과제 유형", "학점 잘 받는 팁"].map(
            (i, index) => (
              <div key={index}>
                <DetailedCESubtitle
                  color={theme.colors.primaryText}
                  fontSize={15}
                >
                  {i}
                </DetailedCESubtitle>
                {replyData.content[index]}
              </div>
            )
          )}
        </ContentWrap>
      )}
      {replyData.content.length == 3 && replyData.isLocked && (
        <LockBox
          fontSize={15}
          color={theme.colors.primaryText}
          borderColor={theme.colors.primary}
          onClick={() => setIsOpen(true)}
        >
          <LockBoxInfo>
            <LockSvgWrap bgColor={theme.colors.primary}>
              <LockSvg size={30} src={lock_Svg} />
            </LockSvgWrap>
            <LockViewText fontSize={13} color={theme.colors.primary}>
              10p 써서 보기
            </LockViewText>
            <LockViewText fontSize={11} color={theme.colors.primaryText}>
              (1234자)
            </LockViewText>
          </LockBoxInfo>
        </LockBox>
      )}
      <UnlockModal
        recommend={replyData.recommend}
        year={replyData.year}
        semester={replyData.semester}
        like={replyData.like}
        dislike={replyData.dislike}
        pushedLike={replyData.pushedLike}
        isOpen={isOpen}
        setOpen={setIsOpen}
        isMine={isMine}
        currentPoint={100}
      />
    </Wrap>
  );
}
