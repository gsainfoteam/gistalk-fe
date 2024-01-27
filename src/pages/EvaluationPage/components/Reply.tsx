import { theme } from "@/style/theme";
import styled from "styled-components";
import { IReply } from "@/Interfaces/interfaces";

import LikeButton from "./LikeButton";
import RecommendationStatus from "../../../components/RecommendationStatus";

interface IProps {
  replyData: IReply;

  /** 내 글인지 확인하기 위함 (댓글 옆에 '(MY)' 붙이는 용도) */
  isMine: boolean;
}

/** 전체 Wrap */
const Wrap = styled.div`
  margin: 20px auto 0 auto;
`;

/** 추천 or 비추천, 몇 학기 수강자인지, 좋아요/싫어요 수는 몇개인지 표시하는 전체 부분 Wrap */
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

/** InfoWrap 안에 들어가는 왼쪽 부분(추천 or 비추천, 몇 학기 수강자인지) */
const LeftWrap = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

/** 몇 년도 몇 학기인지 표시하는 컴포넌트 */
const SemesterText = styled(theme.universalComponent.DivTextContainer)`
  margin-left: 7px;
  font-family: NSRegular;
`;

/** 댓글 내용 Wrap */
const ContentWrap = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
  word-break: break-all;
`;

export default function Reply({ replyData, isMine }: IProps) {
  return (
    <Wrap>
      <InfoWrap>
        <LeftWrap>
          <RecommendationStatus like={replyData.recommend} />
          <SemesterText fontSize={13} color={theme.colors.secondaryText}>
            {replyData.year}년 {replyData.semester}학기
          </SemesterText>
        </LeftWrap>
        <LikeButton like={0} dislike={0} />
      </InfoWrap>
      {/** content를 배열로 받아서 배열 길이가 1이면 한줄평, 배열 길이가 3이면 세부 강의평가로 인식되도록 만듦
         수정이 필요할 듯 함. */}
      {replyData.content.length == 1 && (
        <ContentWrap fontSize={13} color={theme.colors.primaryText}>
          {replyData.content[0]}
        </ContentWrap>
      )}
    </Wrap>
  );
}
