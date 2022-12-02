import styled from "styled-components";
import {theme} from "../style/theme";
import {pushedLike} from "../Interfaces/interfaces";

import ThumbUp_Svg from "../assets/svgs/thumbUp.svg";
import ThumbUpBlack_Svg from "../assets/svgs/thumbUp_Black.svg";
import ThumbDown_Svg from "../assets/svgs/thumbDown_Selected.svg";
import ThumbDownBlack_Svg from "../assets/svgs/thumbDown_Black.svg";

interface IProps {
    like: number;
    dislike: number;
    pushedLike: pushedLike;
}

const Btn = styled(theme.universalComponent.DivTextContainer)<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 20px;
  font-family: NSBold;
  margin-left: 5px;
  
  div{
    margin-right: 5px
  }
`

const Svg = styled(theme.universalComponent.SvgIcon)`
  margin-left: 5px
`

/** Dislike Svg는 약간 아래로 내려주는 처리를 위해서.. */
const DislikeSvg = styled(Svg)`
  position: relative;
  top:2px;
`

export default function LikeDislikeBtnWrap({like, dislike, pushedLike}: IProps) {
    return <>
        <Btn color={pushedLike == 'like' ? theme.colors.primary : theme.colors.primaryText}
             bgColor={theme.colors.inputBg} fontSize={11}>
            <Svg src={pushedLike == 'like' ? ThumbUp_Svg : ThumbUpBlack_Svg} size={16}></Svg>
            <div>{like}</div>
        </Btn>
        <Btn color={pushedLike == 'dislike' ? theme.colors.primary : theme.colors.primaryText}
             bgColor={theme.colors.inputBg} fontSize={11}>
            <DislikeSvg src={pushedLike == 'dislike' ? ThumbDown_Svg : ThumbDownBlack_Svg} size={16}></DislikeSvg>
            <div>{dislike}</div>
        </Btn>
    </>
}