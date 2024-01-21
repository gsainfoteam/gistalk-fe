import { theme } from "@/style/theme";
import { ReactNode } from "react";
import styled from "styled-components";

// Styles for the container
const CardContainer = styled.div`
  border-radius: 10px;
  background: ${theme.colors.cardBackGround};
  padding: 20px;
  margin-bottom: 5%;
`;

function Card({ children }: { children?: ReactNode }) {
  return <CardContainer>{children}</CardContainer>;
}

export default Card;
