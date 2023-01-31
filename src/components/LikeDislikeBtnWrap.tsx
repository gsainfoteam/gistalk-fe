import styled from "styled-components";
import { theme } from "../style/theme";
import { useState } from "react";

import ThumbUp_Svg from "../assets/svgs/thumbUp.svg";
import ThumbUpBlack_Svg from "../assets/svgs/thumbUp_Black.svg";
import ThumbDown_Svg from "../assets/svgs/thumbDown.svg";
import ThumbDownBlack_Svg from "../assets/svgs/thumbDown_Black.svg";

interface IProps {
  like: number;
  dislike: number;
}

const Btn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 20px;
  font-family: NSBold;
  margin-left: 5px;
  div {
    margin-right: 5px;
  }
`;

const Svg = styled(theme.universalComponent.SvgIcon)`
  margin-left: 5px;
`;

/** Dislike Svg는 약간 아래로 내려주는 처리를 위해서.. */
const DislikeSvg = styled(Svg)`
  position: relative;
  top: 2px;
`;

//pushedLike none으로 설정후에 Btn이 눌리면 바뀌는 형식으로
export default function LikeDislikeBtnWrap({ like, dislike }: IProps) {
  const [pushedLike, setLikeState] = useState("none");
  const [likeNum, setLikeNum] = useState(0);

  return (
    <>
      <Btn
        onClick={() => {
          setLikeState(pushedLike === "like" ? "none" : "like");
          setLikeNum(likeNum !== 1 ? 1 : 0);
        }}
        color={
          pushedLike === "like"
            ? theme.colors.primary
            : theme.colors.primaryText
        }
        bgColor={theme.colors.inputBg}
        fontSize={11}
      >
        <Svg
          src={pushedLike === "like" ? ThumbUp_Svg : ThumbUpBlack_Svg}
          size={16}
        ></Svg>
        <div>{likeNum === 1 ? like + likeNum : like}</div>
      </Btn>
      <Btn
        onClick={() => {
          setLikeState(pushedLike === "dislike" ? "none" : "dislike");
          setLikeNum(likeNum !== -1 ? -1 : 0);
        }}
        color={
          pushedLike == "dislike"
            ? theme.colors.reverse
            : theme.colors.primaryText
        }
        bgColor={theme.colors.inputBg}
        fontSize={11}
      >
        <DislikeSvg
          src={pushedLike === "dislike" ? ThumbDown_Svg : ThumbDownBlack_Svg}
          size={16}
        ></DislikeSvg>
        <div>{likeNum === -1 ? dislike + likeNum : dislike}</div>
      </Btn>
    </>
  );
}
