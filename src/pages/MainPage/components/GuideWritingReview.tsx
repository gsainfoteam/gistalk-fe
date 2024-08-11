import Card from "@components/Card";
import styled from "styled-components";

const LargeText = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
`;

export function GuideWritingReview() {
  return (
    <Wrap>
      <div> 이번 학기 어떻게 보내셨나요? </div>
      <LargeText> 강의평 등록하러 가기 </LargeText>
    </Wrap>
  );
}
