import {theme} from "../style/theme";
import styled from "styled-components";
import {IReply} from "../Interfaces/interfaces";
import RecommendTextForm from "./RecommendTextForm";
import LikeDislikeBtnWrap from "./LikeDislikeBtnWrap";
import {createContext, useContext} from "react";

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
  margin:25px auto 0 auto;
  border: 3px solid ${props => props.borderColor};
`

export default function Reply({replyData}: IProps) {
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
            (replyData.content.length == 3) && <ContentWrap fontSize={13} color={theme.colors.primaryText}>
                {['시험 문제 유형', '과제 유형', '학점 잘 받는 팁'].map((i, index) => <>
                    <DetailedCESubtitle color={theme.colors.primaryText} fontSize={17}>{i}</DetailedCESubtitle>
                    {replyData.content[index]}
                </>)}
            </ContentWrap>
        }
        {
            <LockBox fontSize={15} color={theme.colors.primaryText} borderColor={theme.colors.primary}></LockBox>
        }

    </Wrap>
    )
}