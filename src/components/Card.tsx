import { ReactNode } from "react";
import styled from "styled-components";

// Styles for the container
const CardContainer = styled.div`
  border-radius: 10px;
  background: #f7f7f7;
  padding: 20px;
  margin-bottom: 5%;
`;

function Card({ children }: { children?: ReactNode }) {
  return <CardContainer>{children}</CardContainer>;
}

export default Card;
