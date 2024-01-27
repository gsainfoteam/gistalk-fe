import { theme } from "@/style/theme";
import styled from "styled-components";

import ThumbUp_Svg from "@/assets/svgs/thumbUp.svg";
import ThumbDown_Svg from "@/assets/svgs/thumbDown.svg";
import Neutral_Svg from "@/assets/svgs/neutral.svg";

interface IProps {
  like: string;
}

const Wrap = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSRegular;
  display: flex;
  align-items: center;
`;

const RecommendSvg = styled(theme.universalComponent.SvgIcon)<{
  like: number;
}>`
  position: relative;
  margin-right: 5px;
  bottom: ${(props) => props.like == 1 && "2px"};
  top: ${(props) => props.like == 2 && "2px"};
  top: ${(props) => props.like == 3 && "1px"};
`;

/** like에 string으로 true, false, 다른 값을 넣으면 그에 따른 상태가 렌더링됨*/
export default function RecommendationStatus({ like }: IProps) {
  const defineUsage = (like: string): [string, string, string, number] => {
    switch (like) {
      case "true":
        return [theme.colors.primary, ThumbUp_Svg, "추천", 1];
      case "false":
        return [theme.colors.reverse, ThumbDown_Svg, "비추천", 2];
      default:
        return [theme.colors.primaryText, Neutral_Svg, "보통", 3];
    }
  };

  return (
    <Wrap fontSize={14} color={defineUsage(like)[0]}>
      <RecommendSvg
        size={20}
        src={defineUsage(like)[1]}
        like={defineUsage(like)[3]}
      />
      {defineUsage(like)[2]}
    </Wrap>
  );
}
