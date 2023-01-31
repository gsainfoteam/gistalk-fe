import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/style/theme";

import Hexagon from "@/components/Hexagon";
import Header from "@/components/Header";
import Button from "@/components/Button";
import DescriptionModal from "@/components/DescriptionModal";

import QuestionMark_svg from "../assets/svgs/circledQuestionMark.svg";
import NavigationArrow_Svg from "../assets/svgs/navigationArrow.svg";

const TitleWrap = styled.div<{ color: string }>`
  width: 87vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto 0 auto;
  padding-bottom: 13px;
  border-bottom: ${(props) => props.color} 1.5px solid;
  border-radius: 0;
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

const MyReviewsText = styled(theme.universalComponent.DivTextContainer)`
  width: 87vw;
  height: 42px;
  font-family: NSBold;
  border-radius: 0;
  margin: 20px auto 0 auto;
  text-align: center;
  line-height: 42px;
`;

const Point = styled.div`
  display: flex;
  color: "gray";
  font: 12px;
  font-weight: bold;
`;

const PointValue = styled.div`
  display: flex;
  color: ${theme.colors.primary};
  font: 12px;
`;

const HelperIcon = styled(theme.universalComponent.SvgIcon)`
  margin-left: 4px;
`;

const Semester = styled(theme.universalComponent.DivTextContainer)`
  border-bottom: ${(props) => props.color} 1.5px solid;
  display: flex;
  font-family: NSBold;
  width: 40vw;
  border-radius: 0;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;
`;

const Subject = styled.div`
  display: flex;
  text-align: center;
  padding: 0.4em 0;
`;

const SubjectName = styled(theme.universalComponent.DivTextContainer)`
  font-weight: bold;
`;
const ProfessorName = styled(theme.universalComponent.DivTextContainer)`
  margin-left: 1em;
`;
const ArrowIcon = styled(theme.universalComponent.SvgIcon)`
  transform: rotate(180deg);
  margin-left: auto;
`;

const ContentWrap = styled.div`
  width: 87vw;
  margin: 10px auto 0 auto;
`;

const MyEvaluationWrap = styled.div`
  margin-top: 1em;
`;

export default function ProfilePage() {
  const [isOpen, setIsOpen] = useState(false);

  const USER_NAME = "HongGilDong";
  const POINT_VALUE = 54;
  const CLASS_LIST = [
    {
      time: "2022년 1학기",
      subjects: [
        {
          className: "컴퓨터 프로그래밍",
          professor: "Suman Pandey",
        },
        {
          className: "일반물리학 및 연습",
          professor: "박찬용  ",
        },
      ],
    },
    {
      time: "2022년 2 학기",
      subjects: [
        {
          className: "컴퓨터 프로그래밍",
          professor: "Suman Pandey",
        },
        {
          className: "일반물리학 및 연습",
          professor: "박찬용  ",
        },
      ],
    },
  ];
  return (
    <>
      <Header text={"MY"} />
      <TitleWrap color={theme.colors.grayStroke}>
        <div>
          <SubjectTitle fontSize={16} color={theme.colors.primaryText}>
            ID: {USER_NAME}
          </SubjectTitle>
          <Point>
            <PointValue>{POINT_VALUE}</PointValue>
            <div>P</div>
            <HelperIcon
              src={QuestionMark_svg}
              size={16}
              onClick={() => setIsOpen(true)}
            />
          </Point>
        </div>

        <Button
          text="프로필 관리"
          onClick={() => {}}
          color={"white"}
          background={theme.colors.primary}
        />
      </TitleWrap>
      <ContentWrap>
        <MyReviewsText fontSize={16} color={theme.colors.primaryText}>
          · 내가 쓴 강의평 ·
        </MyReviewsText>

        {CLASS_LIST.map((list) => (
          <MyEvaluationWrap>
            <Semester fontSize={14} color={theme.colors.primary}>
              {list.time}
            </Semester>
            {list.subjects.map((subject) => (
              <Subject>
                <SubjectName fontSize={16} color={theme.colors.primaryText}>
                  {subject.className}
                </SubjectName>
                <ProfessorName fontSize={14} color={theme.colors.grayStroke}>
                  {subject.professor}
                </ProfessorName>
                <ArrowIcon size={12} src={NavigationArrow_Svg} />
              </Subject>
            ))}
          </MyEvaluationWrap>
        ))}
      </ContentWrap>
      <DescriptionModal isOpen={isOpen} setOpen={setIsOpen} />
    </>
  );
}
