import { createGlobalStyle } from "styled-components";
import NSBold from "./noto-sans-kr-bold.woff2";
import NSMedium from "./noto-sans-kr-medium.woff2";
import NSRegular from "./noto-sans-kr-regular.woff2";

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
      src: url("//db.onlinewebfonts.com/t/22db60d19480ba0274c9eb6ba877ea9b.eot"); 
      src: url("//db.onlinewebfonts.com/t/22db60d19480ba0274c9eb6ba877ea9b.eot?#iefix") 
      format("embedded-opentype"), url("//db.onlinewebfonts.com/t/22db60d19480ba0274c9eb6ba877ea9b.woff2") 
      format("woff2"), url("//db.onlinewebfonts.com/t/22db60d19480ba0274c9eb6ba877ea9b.woff") format("woff"), 
      url("//db.onlinewebfonts.com/t/22db60d19480ba0274c9eb6ba877ea9b.ttf") format("truetype"), 
      url("//db.onlinewebfonts.com/t/22db60d19480ba0274c9eb6ba877ea9b.svg#Aharoni") format("svg"); 
    }
`;
