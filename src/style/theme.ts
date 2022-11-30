import styled from "styled-components";

const colors = {
    primary: "#FF6565",
    secondary: "#FF8282",

    inputBg: "#F3F3F3",

    primaryText: "#4C4C4C",
    secondaryText: "#959595",

    black: "#000000",
};

const universalComponent = {
    SvgIcon: styled.img<{ size: number }>`
      height: ${(props) => props.size}px;
      width: ${(props) => props.size}px;
    `
}

export const theme = {
    colors,
    universalComponent
};
