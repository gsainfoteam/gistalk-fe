import styled from "styled-components";

const colors = {
  primary: "#FF6565",
  secondary: "#FF8282",
  grayStroke: "#B6B6B6",
  reverse: "#5D5FEF",

  inputBg: "#F3F3F3",
  inputBorder: "#E4E4E4",

  primaryText: "#4C4C4C",
  secondaryText: "#959595",

  black: "#000000",
  white: "#ffffff",
};

const universalComponent = {
  SvgIcon: styled.img<{ size: number }>`
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
  `,
  DivTextContainer: styled.div<{ color: string; fontSize: number }>`
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize}px;
  `,
};

export const theme = {
  colors,
  universalComponent,
};
