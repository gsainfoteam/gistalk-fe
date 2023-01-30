import { createGlobalStyle } from "styled-components";
import NSBold from "./noto-sans-kr-bold.woff2";
import NSMedium from "./noto-sans-kr-medium.woff2";
import NSRegular from "./noto-sans-kr-regular.woff2";
import Aharoni from "./Aharoni.woff2";

export default createGlobalStyle`
    @font-face {
        font-family: "NSBold";
        src: url(${NSBold}) format('woff2');
    }
    @font-face {
        font-family: "NSRegular";
        src: url(${NSRegular}) format('woff2');
    }
    @font-face {
        font-family: "NSMedium";
        src: url(${NSMedium}) format('woff2');
    }
    @font-face {
      font-family: "Aharoni";
      src: url(${Aharoni}) format('woff2');
    }
`;
