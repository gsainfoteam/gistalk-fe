import {theme} from "../style/theme";
import styled from "styled-components";
import Sheet from 'react-modal-sheet';
import React, {useState} from "react";

import {tempdb} from "../tempdb/tempdb";
import RecommendTextForm from "./RecommendTextForm";
import LikeDislikeBtnWrap from "./LikeDislikeBtnWrap";
import {pushedLike} from "../Interfaces/interfaces";

import lock_Svg from "../assets/svgs/lock.svg";
import done_Svg from "../assets/svgs/done.svg";
import cancel_Svg from "../assets/svgs/cancel.svg";

interface IProps {
    recommend:boolean,
    year:number,
    semester:string,
    like:number,
    dislike:number,
    pushedLike:pushedLike,
    isOpen:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    currentPoint:number
}

/** 추천 or 비추천, 몇 학기 수강자인지, 좋아요/싫어요 수는 몇개인지 표시하는 전체 부분 Wrap */
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 87vw;
  margin: 0 auto 0 auto;
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

/** 상단 InfoWrap을 제외한 부분을 감싸는 Wrap */
const ModalContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`

const LockSvgWrap = styled.div<{ bgColor:string }>`
  width: 55px;
  height: 55px;
  background-color: ${props => props.bgColor};
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 5px 0;
`

const LockSvg = styled(theme.universalComponent.SvgIcon)``
const DoneSvg = styled(theme.universalComponent.SvgIcon)`
  position: relative;
  top:3px;
  margin-left: 2px;
`
const CancelSvg = styled(theme.universalComponent.SvgIcon)`
  position: relative;
  top:3px;
  margin-left: 2px;
`

/** '몇p 써서 보기' 와 'n자' 표시하는 글자 */
const LockViewText = styled(theme.universalComponent.DivTextContainer)<{ primaryTextColor:string }>`
  font-family: NSBold;
  
  span {
    color:${props => props.primaryTextColor};
  }
`

/** 네, 아니오 버튼 감싸는 Wrap */
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width:87vw;
  margin:0 auto;
`

/** 세부 수강평가 볼지 말지 선택하는 버튼 */
const Button = styled(theme.universalComponent.DivTextContainer)<{ whiteColor:string, reverse:boolean }>`
  border:1.5px solid ${props => props.color};
  background-color: ${props => props.reverse ? props.whiteColor : props.color};
  color: ${props => props.reverse ? props.color : props.whiteColor};
  font-family: NSBold;
  height: 35px;
  width:42vw;
  line-height: 35px;
  text-align: center;
`

export default function UnlockModal({recommend, year, semester, like, dislike, pushedLike, isOpen, setOpen, currentPoint}:IProps) {
    return <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[300]}>
        <Sheet.Container>
            <Sheet.Header />
            <Sheet.Content>
                <InfoWrap>
                    <LeftWrap>
                        <RecommendTextForm like={recommend}></RecommendTextForm>
                        <SemesterText fontSize={13}
                                      color={theme.colors.secondaryText}>{year}년 {semester}학기</SemesterText>
                    </LeftWrap>
                    <RightWrap>
                        <LikeDislikeBtnWrap like={like} dislike={dislike} pushedLike={pushedLike}></LikeDislikeBtnWrap>
                    </RightWrap>
                </InfoWrap>
                <ModalContentWrap>
                    <LockSvgWrap bgColor={theme.colors.primary}>
                        <LockSvg size={35} src={lock_Svg} />
                    </LockSvgWrap>
                    <LockViewText
                        fontSize={17}
                        color={theme.colors.primaryText}
                        primaryTextColor={theme.colors.primary}>
                        <span>10</span>P를 소모하여 이 세부평가를 봅니다.
                    </LockViewText>
                    <LockViewText
                        fontSize={15}
                        color={theme.colors.primaryText}
                        primaryTextColor={theme.colors.primary}>
                        (현재 : <span>{currentPoint}</span>P)
                    </LockViewText>
                </ModalContentWrap>
                <ButtonWrap>
                    <Button fontSize={15} color={theme.colors.primary} whiteColor={theme.colors.white} reverse={false}>
                        네<DoneSvg size={20} src={done_Svg}></DoneSvg>
                    </Button>
                    <Button fontSize={15} color={theme.colors.primary} whiteColor={theme.colors.white} reverse={true}>
                        아니오<CancelSvg size={20} src={cancel_Svg}></CancelSvg>
                    </Button>
                </ButtonWrap>
            </Sheet.Content>
        </Sheet.Container>

        <Sheet.Backdrop />
    </Sheet>
}