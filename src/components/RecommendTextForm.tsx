import { theme } from "../style/theme";
import styled from "styled-components";

import ThumbUp_Svg from "../assets/svgs/thumbUp.svg";
import ThumbDown_Svg from "../assets/svgs/thumbDown.svg";

interface IProps {
  like: boolean;
}

const Wrap = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  display: flex;
  align-items: center;
  height: 30px;
`;

const RecommendSvg = styled(theme.universalComponent.SvgIcon)<{
  like: boolean;
}>`
  position: relative;
  margin-right: 5px;
  bottom: ${(props) => props.like && "2px"};
  top: ${(props) => !props.like && "2px"};
`;

export default function RecommendTextForm({ like }: IProps) {
  return (
    <Wrap
      fontSize={14}
      color={like ? theme.colors.primary : theme.colors.reverse}
    >
      <RecommendSvg
        size={20}
        src={like ? ThumbUp_Svg : ThumbDown_Svg}
        like={like}
      ></RecommendSvg>
      {like ? "추천" : "비추천"}
    </Wrap>
  );
}
