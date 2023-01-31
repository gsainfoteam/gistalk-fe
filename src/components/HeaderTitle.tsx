import Header from "@/components/Header";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface IProps {
  headerText: string;
  subjectTitle: string;
  professorName: string;
  subjectCode: string;
  avgScore: string;
}

// 2022/05/11 - 스로틀 헬퍼 함수 - by 1-blue

const Wrap = styled.div<{ hide: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  transition: 0.3s;
  transform: ${(props) =>
    props.hide ? "translateY(-116px)" : "translateY(0px)"};
`;

export default function HeaderTitle({
  headerText,
  subjectTitle,
  professorName,
  subjectCode,
  avgScore,
}: IProps) {
  const throttleHelper = (callback: () => void, waitTime: number) => {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return () => {
      if (timerId) return;
      timerId = setTimeout(() => {
        callback();
        timerId = null;
      }, waitTime);
    };
  };

  // 2022/05/11 - 헤더 숨김 여부 변수 - by 1-blue
  const [hide, setHide] = useState(false);
  // 2022/05/11 - 현재 스크롤 위치값 저장할 변수 - by 1-blue
  const [pageY, setPageY] = useState(0);
  // 2022/05/11 - 현재 스크롤을 내렸는지 올렸는지 확인할 스크롤 이벤트 함수 - by 1-blue
  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };
  // 2022/05/11 - 스크롤 이벤트에 스로틀링 적용 - by 1-blue
  const throttleScroll = throttleHelper(handleScroll, 50);
  // 2022/05/11 - 스크롤 이벤트 등록 - by 1-blue
  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);
  return (
    <Wrap hide={hide}>
      <Header text={headerText}></Header>
      <Title
        subjectTitle={subjectTitle}
        professorName={professorName}
        subjectCode={subjectCode}
        avgScore={avgScore}
      ></Title>
    </Wrap>
  );
}
