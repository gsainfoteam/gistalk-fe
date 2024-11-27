import styled from "styled-components";
import { theme } from "@/style/theme";
import { useCallback, useEffect, useState } from "react";

import ThumbUp_Svg from "@/assets/svgs/thumbUp.svg";
import ThumbUpBlack_Svg from "@/assets/svgs/thumbUp_Black.svg";
import { deleteRecordLike, postRecordLike } from "@/apis/records";

const LIKE = "like";
const NONE = "none";

interface IProps {
  like: number;
  recordId: number;
  liked: Boolean;
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

export default function LikeButton({ like, recordId, liked }: IProps) {
  const [likeState, setLikeState] = useState(liked ? LIKE : NONE);
  const [likeNum, setLikeNum] = useState<number>(like);

  useEffect(() => {
    setLikeState(liked ? LIKE : NONE);
    setLikeNum(like);
  }, [liked, like]);

  const handleLike = useCallback(async () => {
    if (likeState === LIKE) {
      await deleteRecordLike(recordId);
      setLikeState(NONE);
      setLikeNum((prev) => prev - 1);
    } else {
      await postRecordLike(recordId);
      setLikeState(LIKE);
      setLikeNum((prev) => prev + 1);
    }
  }, [likeState, recordId]);

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
        <div>{likeNum}</div>
      </Button>
    </ButtonContainer>
  );
}
