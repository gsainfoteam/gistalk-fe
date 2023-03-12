import React, { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../style/theme";

/**ContentBox 내부의 text(children)를 하이라이팅, 줄바꿈하는 함수
 * |하이라이팅|
 * 첫째 줄\n둘째 줄
 */

interface ContentProps {
  children: ReactNode;
  fontSize: number;
  color: string;
  fontFamily: string;
}

//본문을 감싸는 컴포넌트
const ContentBox = styled(theme.universalComponent.DivTextContainer)<{
  fontFamily: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 8vw;
  white-space: pre-wrap;
  font-family: ${(props) => props.fontFamily};
`;

//글자색을 하이라이트하는 span 컴포넌트
const HighLight = styled.span`
  color: ${theme.colors.primary};
`;

export default function Content({
  children,
  fontSize,
  color,
  fontFamily,
}: ContentProps) {
  const content = String(children);
  return (
    <ContentBox fontSize={fontSize} color={color} fontFamily={fontFamily}>
      {content.split("\\n").map((line, index) => (
        <p key={index}>
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
}
