import styled from "styled-components";
import { theme } from "@/style/theme";
import { useEffect, useState } from "react";

import ThumbUp_Svg from "@/assets/svgs/thumbUp.svg";
import ThumbUpBlack_Svg from "@/assets/svgs/thumbUp_Black.svg";
import { likeState } from "@/Interfaces/interfaces";
import { deleteRecordLike, postRecordLike } from "@/apis/records";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LIKE = "like";
const NONE = "none";

interface IProps {
  like: number;
  recordId: number;
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

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

export default function LikeButton({ like, recordId }: IProps) {
  const [likeState, setLikeState] = useState<likeState>(NONE);
  const [likeNum, setLikeNum] = useState(0);

  const handleLike = () => {
    if (likeState === LIKE) {
      deleteRecordLike(recordId);
      setLikeState(NONE);
      setLikeNum(0);
    } else {
      postRecordLike(recordId);
      setLikeState(LIKE);
      setLikeNum(1);
    }
  };

  return (
    <ButtonContainer>
      <Button
        onClick={handleLike}
        color={
          likeState === LIKE ? theme.colors.primary : theme.colors.primaryText
        }
        bgColor={theme.colors.inputBg}
        fontSize={11}
      >
        <Svg
          src={likeState === LIKE ? ThumbUp_Svg : ThumbUpBlack_Svg}
          size={16}
        />
        <div>{likeNum === 1 ? like + likeNum : like}</div>
      </Button>
    </ButtonContainer>
  );
}
