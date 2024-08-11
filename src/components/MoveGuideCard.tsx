import { ReactNode } from "react";
import Card from "./Card";
import { FaArrowRightLong } from "react-icons/fa6";
import styled from "styled-components";

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  :hover {
    transition: 0.2s;
    transform: scale(0.96);
  }
`;

function MoveGuideCard({ children }: { children?: ReactNode }) {
  return (
    <Card isInteractive={true}>
      <LeftWrapper>
        {children}
        <FaArrowRightLong />
      </LeftWrapper>
    </Card>
  );
}

export default MoveGuideCard;
