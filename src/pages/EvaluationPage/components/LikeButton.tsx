import styled from "styled-components";
import { theme } from "@/style/theme";
import { useState } from "react";

import ThumbUp_Svg from "@/assets/svgs/thumbUp.svg";
import ThumbUpBlack_Svg from "@/assets/svgs/thumbUp_Black.svg";
import ThumbDown_Svg from "@/assets/svgs/thumbDown.svg";
import ThumbDownBlack_Svg from "@/assets/svgs/thumbDown_Black.svg";
import { deleteRecordLikeNum, postRecordLikeNum } from "@/apis/records";
import { useParams } from "react-router-dom";
import { error } from "console";

const LIKE = "like";
const DISLIKE = "dislike";
const NONE = "none";

interface IProps {
  like: number;
  //dislike: number;
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
//resolve no overload matches this call error

const Button = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  font-family: NSBold;
  padding-right: 5px;
  div {
    margin-left: 5px;
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
export default function LikeButton({ like }: IProps) {
  const [pushedLike, setLikeState] = useState("none");
  const [likeNum, setLikeNum] = useState(like);
  const { stringRecordId } = useParams();
  const recordId = Number(stringRecordId);

  return (
    <ButtonContainer>
      <Button
        onClick={() => {
          if (pushedLike == LIKE) {
            deleteRecordLikeNum(recordId);
            setLikeState(NONE);
          } else if (pushedLike == NONE) {
            postRecordLikeNum(recordId);
            setLikeState(LIKE);
          }
          setLikeNum(likeNum !== 1 ? 1 : 0);
        }}
        color={
          pushedLike === LIKE ? theme.colors.primary : theme.colors.primaryText
        }
        bgColor={theme.colors.inputBg}
        fontSize={11}
      >
        <Svg
          src={pushedLike === LIKE ? ThumbUp_Svg : ThumbUpBlack_Svg}
          size={16}
        />
        <div>{likeNum === 1 ? like + likeNum : like}</div>
      </Button>
    </ButtonContainer>
  );
}
