import styled from "styled-components";
import { theme } from "../style/theme";
import Header from "../components/Header";
import { tempdb } from "../tempdb/tempdb";
import Reply from "../components/Reply";

import Title from "../components/Title";

/** 각 세부평가를 구분짓는 가로선 */
const HorizontalLine = styled.div<{ borderColor: string }>`
  width: 87vw;
  margin: 25px auto 0 auto;
  border-bottom: 0.4px solid ${(props) => props.borderColor};
`;

export default function DetailedCE() {
  return (
    <>
      <Header text={"세부 강의평가"}></Header>
      <Title></Title>
      {tempdb[0].detailedReview.map((i) => (
        <div key={i.id}>
          <Reply replyData={i} isMine={true} />
          <HorizontalLine
            borderColor={theme.colors.secondaryText}
          ></HorizontalLine>
        </div>
      ))}
    </>
  );
}
