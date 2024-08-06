import styled from "styled-components";

const PrimaryColor = {
  blue: "#7dd3fc",
  pink: "#a78bfa",
  green: "#4ade80",
  yellow: "#fde047",
  purple: "#8b5cf6",
  orange: "#eab308",
  mint: "#5eead4",
  brown: "#713f12",
  dark_purple: "#4c1d95",
  dark_red: "#881337",
  indigo: "#1e3a8a",
  dark_green: "#064e3d",
  light_green: "#bef264",
  light_yellow: "#fef08a"
}

const colors = {
  primary: "#FF6565",
  secondary: "#FF8282",
  primaryLight: "#FFECEC",
  grayStroke: "#B6B6B6",
  reverse: "#5D5FEF",
  //reverse보다 진하면서 명도와 채도가 primary랑 비슷한 색
  reverseDark: "#3A3AEF",
  primaryHover: "#FF8282",

  inputBg: "#F3F3F3",
  inputBorder: "#E4E4E4",

  primaryText: "#4C4C4C",
  secondaryText: "#959595",
  cardBackGround: "#F7F9FB",

  active: "#26D681",

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
  PrimaryColor,
  colors,
  universalComponent,
};
