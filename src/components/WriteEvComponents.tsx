import styled from "styled-components";
import { theme } from "@/style/theme";
import React from "react";


const MarginTop = styled.div<{
  marginTop: number;
}>`
  margin-top: ${(props) => props.marginTop};
`;

export const QuestionDiv = styled(MarginTop)`
  span {
    color: ${theme.colors.primary};
  }

  font-family: NSBold;
  font-size: 25px;
  color: ${theme.colors.primaryText};
`;

export const DescDiv = styled(MarginTop)`
  font-family: NSMedium;
  font-size: 12px;
  color: ${theme.colors.primaryText};
`;

export const UnderlinedTxt = styled(MarginTop)`
  text-decoration: underline;
  cursor: pointer;
  font-family: NSRegular;
`;

export const InnerCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
