import styled, { css } from "styled-components";

const RadarColor = (opacity: number) => { 
  const colors = [
    `rgb(56, 189, 248,${opacity})`, 
    `rgb(251, 146, 60,${opacity})`,
    `rgb(163, 230, 53,${opacity})`,
    `rgb(192, 132, 252,${opacity})`,
    `rgb(45, 212, 191,${opacity})`,
    `rgb(251, 113, 133,${opacity})`,
    `rgb(96, 165, 250,${opacity})`,
    `rgb(167, 139, 250,${opacity})`,
    `rgb(129, 140, 248,${opacity})`,
    `rgb(74, 222, 128,${opacity})`,
    `rgb(232, 121, 249,${opacity})`,
    `rgb(52, 211, 153,${opacity})`,
    `rgb(34, 211, 238,${opacity})`,
    `rgb(250, 204, 21,${opacity})`,
    `rgb(244, 114, 182,${opacity})`,
    `rgb(251, 191, 36,${opacity})`,
    `rgb(248, 113, 113,${opacity})`,
    `rgb(56, 189, 248,${opacity})`, 
    `rgb(251, 146, 60,${opacity})`,
    `rgb(163, 230, 53,${opacity})`,
    `rgb(192, 132, 252,${opacity})`,
    `rgb(45, 212, 191,${opacity})`,
    `rgb(251, 113, 133,${opacity})`,
    `rgb(96, 165, 250,${opacity})`,
    `rgb(167, 139, 250,${opacity})`,
    `rgb(129, 140, 248,${opacity})`,
    `rgb(74, 222, 128,${opacity})`,
    `rgb(232, 121, 249,${opacity})`,
    `rgb(52, 211, 153,${opacity})`,
    `rgb(34, 211, 238,${opacity})`,
    `rgb(250, 204, 21,${opacity})`,
    `rgb(244, 114, 182,${opacity})`,
    `rgb(251, 191, 36,${opacity})`,
    `rgb(248, 113, 113,${opacity})`
  ]

  return colors
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

  "gray-50": "#f9fafb",
  "cyan-50": "#ecfeff",
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
  RadarColor,
  colors,
  universalComponent,
};

export const opacity = {
  none: 1,
  true: 0.6,
  background: 0.2
}

export const inputSize = {
  small: "18px",
  big: "20px"
}

export const borderRadius = {
  none: "0px",
  circle: "10px"
}
