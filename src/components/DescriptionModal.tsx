import { theme } from "../style/theme";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import React, { ReactNode, useState } from "react";
import done_Svg from "../assets/svgs/done.svg";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ContentProps {
  children: ReactNode;
  fontSize: number;
  color: string;
}

// DescriptionModal 내부의 컴포넌트 전체를 감싸는 Wrapper
const Wrap = styled.div`
  font-family: NSBold;

  flex-direction: column;
  display: flex;
  align-items: center;
`;
//모달 제목 부분 (GISTALK POINT)
const Title = styled(theme.universalComponent.DivTextContainer)`
  font-family: Aharoni;
  margin-top:15px;
`;
//모달 부제목 부분 (지스톡 포인트란?)
const SubTitle = styled(theme.universalComponent.DivTextContainer)``;
//부제목과 본문 사이의 수평줄
const HorizontalSolidLine = styled.hr`
  width: 131px;
  border: 0px;
  border-top: 1.5px solid ${theme.colors.secondaryText};
  margin-top: 14px;
`;
//글자색을 하이라이트하는 span 컴포넌트
const HighLight = styled.span`
  color: ${theme.colors.primary};
`;
//본문을 감싸는 컴포넌트
const ContentBox = styled(theme.universalComponent.DivTextContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 11px 8vw 34px 8vw;
  white-space: pre-wrap;
  font-family: NSMedium;
`;
/**ContentBox 내부의 text(children)를 하이라이팅, 줄바꿈하는 함수
 * |하이라이팅|
 * 첫째 줄\n둘째 줄
 */
const Content = ({ children, fontSize, color }: ContentProps) => {
  const content = String(children);
  return (
    <ContentBox fontSize={fontSize} color={color}>
      {content.split("\\n").map((line, index) => (
        <p>
          {line
            .split("|")
            .map((text, subIndex) =>
              subIndex % 2 === 1 ? <HighLight>{text}</HighLight> : <>{text}</>
            )}
          <br />
        </p>
      ))}
    </ContentBox>
  );
};
/**포인트 제도 설명 부분
 * rule={"강의평가 작성"}, point={5}이면,
 * (point>0: boolean)값에 따라 글자색 변경
 * 디자인 템플릿에 따라 설명부 출력
 */
const PointRule = ({ rule, point }: { rule: string; point: number }) => {
  //포인트 적립/차감 조건과 대쉬선, 적립/차감 포인트 부분 전체를 감싸는 Wrap
  const PointRuleWrap = styled.div`
    width: 310px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: ${theme.colors.secondaryText};
    font-size: 14px;
    font-family: NSMedium;
  `;
  //대쉬선(점선)
  const DashedLine = styled.hr`
    height: 1px;
    flex-basis: 1px;
    flex-grow: 1;
    margin: 0 12px;
    border: 0px;
    border-top: 1px dashed ${theme.colors.secondaryText};
  `;
  //point가 양수, 음수인지에 따라 글자색 변경
  const PointRulePoint = styled.span<{ point: number }>`
    color: ${(props) =>
      props.point > 0 ? theme.colors.primary : theme.colors.reverse};
  `;
  //P의 글자색을 검은색으로 설정하는 span 컴포넌트
  const P = styled.span`
    color: ${theme.colors.black};
  `;
  return (
    <PointRuleWrap>
      {rule}
      <DashedLine />
      <PointRulePoint point={point}>
        {Math.abs(point)}
        <P>P</P> {point > 0 ? "적립" : "차감"}
      </PointRulePoint>
    </PointRuleWrap>
  );
};
//모달을 닫는 버튼 (확인했어요)
const Button = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-family: NSBold;
  height: 40px;
  width: 218px;
  margin: 35px auto 19px auto;
`;
//체크 아이콘
const DoneSvg = styled(theme.universalComponent.SvgIcon)`
  margin: 0 3px;
`;

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
            <HorizontalSolidLine />
            <Content fontSize={14} color={theme.colors.primaryText}>
              |강의 후기를 작성|하시면 포인트를 지급하며, \n |세부 강의평가
              열람| 시 차감됩니다. \n \n 세부 강의평가에서는 \n |시험 유형 /
              과제 유형 / 학점 잘 받는 팁|\n과 같은 실질적인 수강 꿀팁들을
              만나볼 수 있습니다.
            </Content>
            <PointRule rule={"강의평가 작성"} point={5} />
            <PointRule rule={"세부 강의평가 작성"} point={10} />
            <PointRule rule={"세부 강의평가 열람"} point={-5} />
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              확인했어요
              <DoneSvg size={19} src={done_Svg} />
            </Button>
          </Wrap>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
