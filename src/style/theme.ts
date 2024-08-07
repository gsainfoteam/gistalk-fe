import styled from "styled-components";

const PrimaryOpaqueColor = {
  blue: "rgb(125,211,252,0.6)",
  green: "rgb(74,222,128,0.6)",
  yellow: "rgb(253,224,71,0.6)",
  purple: "rgb(139,92,246,0.6)",
  orange: "rgb(234,179,8,0.6)",
  mint: "rgb(94,234,212,0.6)",
  brown: "rgb(113,63,18,0.6)",
  pink: "rgb(167,139,250,0.6)",
  dark_purple: "rgb(76,29,149,0.6)",
  dark_red: "rgb(136,19,55,0.6)",
  indigo: "rgb(30,58,138,0.6)",
  dark_green: "rgb(6,78,61,0.6)",
  light_green: "rgb(190,242,100,0.6)",
  light_yellow: "rgb(254,240,138,0.6)"
}

const PrimaryColor = {
  blue: "rgb(125,211,252)",
  green: "rgb(74,222,128)",
  yellow: "rgb(253,224,71)",
  purple: "rgb(139,92,246)",
  orange: "rgb(234,179,8)",
  mint: "rgb(94,234,212)",
  brown: "rgb(113,63,18)",
  pink: "rgb(167,139,250)",
  dark_purple: "rgb(76,29,149)",
  dark_red: "rgb(136,19,55)",
  indigo: "rgb(30,58,138)",
  dark_green: "rgb(6,78,61)",
  light_green: "rgb(190,242,100)",
  light_yellow: "rgb(254,240,138)"
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
  PrimaryOpaqueColor,
  PrimaryColor,
  colors,
  universalComponent,
};
