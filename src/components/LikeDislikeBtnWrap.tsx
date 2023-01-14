import styled from "styled-components";
import { theme } from "../style/theme";
import { pushedLike } from "../Interfaces/interfaces";
import { useState } from "react";

import ThumbUp_Svg from "../assets/svgs/thumbUp.svg";
import ThumbUpBlack_Svg from "../assets/svgs/thumbUp_Black.svg";
import ThumbDown_Svg from "../assets/svgs/thumbDown_Selected.svg";
import ThumbDownBlack_Svg from "../assets/svgs/thumbDown_Black.svg";

interface IProps {
  like: number;
  dislike: number;
  pushedLike: pushedLike;
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
  return (
    <>
      <Btn
        onClick={() => {
          console.log({ pushedLike });
          setLikeState(pushedLike == "like" ? "none" : "like");
        }}
        color={
          pushedLike == "like" ? theme.colors.primary : theme.colors.primaryText
        }
        bgColor={theme.colors.inputBg}
        fontSize={11}
      >
        <Svg
          src={pushedLike == "like" ? ThumbUp_Svg : ThumbUpBlack_Svg}
          size={16}
        ></Svg>
        <div>{like}</div>
      </Btn>
      <Btn
        onClick={() => {
          console.log(pushedLike);
          setLikeState(pushedLike == "dislike" ? "none" : "dislike");
        }}
        color={
          pushedLike == "dislike"
            ? theme.colors.primary
            : theme.colors.primaryText
        }
        bgColor={theme.colors.inputBg}
        fontSize={11}
      >
        <DislikeSvg
          src={pushedLike == "dislike" ? ThumbDown_Svg : ThumbDownBlack_Svg}
          size={16}
        ></DislikeSvg>
        <div>{dislike}</div>
      </Btn>
    </>
  );
}
