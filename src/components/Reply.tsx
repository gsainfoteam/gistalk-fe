import {theme} from "../style/theme";
import styled from "styled-components";
import {IReply} from "../Interfaces/interfaces";
import RecommendTextForm from "./RecommendTextForm";
import LikeDislikeBtnWrap from "./LikeDislikeBtnWrap";
import React, {createContext, useContext, useState} from "react";

import lock_Svg from "../assets/svgs/lock.svg";
import UnlockModal from "./UnlockModal";

interface IProps {
    replyData: IReply
}

/** 전체 Wrap */
const Wrap = styled.div`
    width: 87vw;
    margin: 20px auto 0 auto;
`

/** 추천 or 비추천, 몇 학기 수강자인지, 좋아요/싫어요 수는 몇개인지 표시하는 전체 부분 Wrap */
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

/** InfoWrap 안에 들어가는 왼쪽 부분(추천 or 비추천, 몇 학기 수강자인지) */
const LeftWrap = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`

const RightWrap = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  
`

const SemesterText = styled(theme.universalComponent.DivTextContainer)`
  margin-left: 7px;
  font-family: NSBold;
`

const ContentWrap = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
  word-break: break-all;
`

const DetailedCESubtitle = styled(theme.universalComponent.DivTextContainer)`
  margin-top: 12px;
  margin-bottom: 3px;
  font-family: NSBold;
`

const LockBox = styled(theme.universalComponent.DivTextContainer)<{ borderColor: string }>`
  width:87vw;
  height: 200px;
  margin: 5px auto 0 auto;
  border: 3px solid ${props => props.borderColor};
  display: flex;
  justify-content: center;
  align-items: center;
`

const LockBoxInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const LockSvgWrap = styled.div<{ bgColor:string }>`
  width: 45px;
  height: 45px;
  background-color: ${props => props.bgColor};
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LockSvg = styled(theme.universalComponent.SvgIcon)``

/** '몇p 써서 보기' 와 'n자' 표시하는 글자 */
const LockViewText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold
`

export default function Reply({replyData}: IProps) {
    const [isOpen,setIsOpen] = useState(false);

    return (
    <Wrap>
        <InfoWrap>
            <LeftWrap>
                <RecommendTextForm like={replyData.recommend}></RecommendTextForm>
                <SemesterText fontSize={13}
                              color={theme.colors.secondaryText}>{replyData.year}년 {replyData.semester}학기</SemesterText>
            </LeftWrap>
            <RightWrap>
                <LikeDislikeBtnWrap like={replyData.like} dislike={replyData.dislike} pushedLike={replyData.pushedLike}></LikeDislikeBtnWrap>
            </RightWrap>
        </InfoWrap>
        {
            (replyData.content.length == 1) && <ContentWrap fontSize={13} color={theme.colors.primaryText}>
                {replyData.content[0]}</ContentWrap>
        }
        {
            (replyData.content.length == 3) && (!replyData.isLocked) && <ContentWrap fontSize={13} color={theme.colors.primaryText}>
                {['시험 문제 유형', '과제 유형', '학점 잘 받는 팁'].map((i, index) => <>
                    <DetailedCESubtitle color={theme.colors.primaryText} fontSize={17}>{i}</DetailedCESubtitle>
                    {replyData.content[index]}
                </>)}
            </ContentWrap>
        }
        {
            (replyData.content.length == 3) && (replyData.isLocked) &&
            <LockBox fontSize={15} color={theme.colors.primaryText} borderColor={theme.colors.primary} onClick={()=>setIsOpen(true)}>
                <LockBoxInfo>
                    <LockSvgWrap bgColor={theme.colors.primary}>
                        <LockSvg size={30} src={lock_Svg} />
                    </LockSvgWrap>
                    <LockViewText fontSize={13} color={theme.colors.primary}>10p 써서 보기</LockViewText>
                    <LockViewText fontSize={11} color={theme.colors.primaryText}>(1234자)</LockViewText>
                </LockBoxInfo>
            </LockBox>
        }
    <UnlockModal
    recommend={replyData.recommend}
    year={replyData.year}
    semester={replyData.semester}
    like={replyData.like}
    dislike={replyData.dislike}
    pushedLike={replyData.pushedLike}
    isOpen={isOpen}
    setOpen={setIsOpen}
    currentPoint={100} />
    </Wrap>
    )
}