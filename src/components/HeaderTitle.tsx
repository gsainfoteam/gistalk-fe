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

const Wrap = styled.div`
`;

export default function HeaderTitle({
  headerText,
  subjectTitle,
  professorName,
  subjectCode,
  avgScore,
}: IProps) {


  return (
    <Wrap >
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
