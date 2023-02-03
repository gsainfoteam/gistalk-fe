import { theme } from "../style/theme";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { sortOptionAtom } from "@/store";

import done_Svg from "../assets/svgs/done_Black.svg";
import {ISortOption} from "@/Interfaces/interfaces";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortList: { id: number; content: string; std: ISortOption }[];
}

const Option = styled(theme.universalComponent.DivTextContainer)<{
  borderColor: string;
}>`
  width: 80vw;
  margin: 0 auto;
  height: 3.5em;
  line-height: 3.5em;
  font-family: NSBold;
  text-align: left;
  border-bottom: 1px solid ${(props) => props.borderColor};
  
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrap = styled.div`
  div:last-child{
    border-bottom: none;
  }
`;

const DoneSvg = styled(theme.universalComponent.SvgIcon)``

export default function SortSelectModal({ isOpen, setOpen, sortList }: IProps) {
  const [sortStd, setSortStd] = useAtom(sortOptionAtom);
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[450]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Wrap>
            <Option
              color={theme.colors.primaryText}
              borderColor={theme.colors.inputBorder}
              fontSize={16}
              onClick={()=>{setSortStd("평균점수"); setOpen(false);}}
            >
              평균점수 순
              {sortStd == "평균점수" ? <DoneSvg size={20} src={done_Svg}></DoneSvg> : null}
            </Option>
            {sortList.map((item) => (
              <Option
                key={item.id}
                color={theme.colors.primaryText}
                borderColor={theme.colors.inputBorder}
                fontSize={16}
                onClick={()=>{setSortStd(item.std); setOpen(false);}}
              >
                {item.content}
                {sortStd == item.std ? <DoneSvg size={20} src={done_Svg}></DoneSvg> : null}
              </Option>
            ))}
          </Wrap>
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  );
}
