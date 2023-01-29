import { theme } from "../style/theme";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import React, { ReactNode, useState } from "react";
import { elements } from "chart.js";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Wrap = styled.div`
  font-family: NSBold;

  flex-direction: column;
  display: flex;
  align-items: center;
`;
const Title = styled(theme.universalComponent.DivTextContainer)``;
const SubTitle = styled(theme.universalComponent.DivTextContainer)``;
const HighLight = styled.span`
  color: ${theme.colors.primary};
`;
const ContentBox = styled(theme.universalComponent.DivTextContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 11px 8vw 34px 8vw;
  white-space: pre-wrap;
`;
const Content = ({ children }: { children: ReactNode }): JSX.Element => {
  const content = String(children);
  return (
    <>
      {content.split("\\n").map((text) => (
        <>
          {text}
          <br />
        </>
      ))}
    </>
  );
};

export default function DescriptionModal({ isOpen, setOpen }: IProps) {
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[448]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <Wrap>
            <Title fontSize={33} color={theme.colors.primary}>
              GISTALK POINT
            </Title>
            <SubTitle fontSize={16} color={theme.colors.primaryText}>
              <HighLight>지스톡 포인트</HighLight>란?
            </SubTitle>
            <ContentBox fontSize={14} color={theme.colors.primaryText}>
              <Content>
                강의 후기를 작성하시면 포인트를 지급하며, \n 세부 강의평가 열람
                시 차감됩니다. \n \n 세부 강의평가에서는 \n 시험 유형 / 과제
                유형 / 학점 잘 받는 팁과 \n 같은 실질적인 수강 꿀팁들을 만나볼
                수 있습니다.
              </Content>
            </ContentBox>
          </Wrap>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
