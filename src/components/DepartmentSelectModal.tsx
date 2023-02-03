import { theme } from "@/style/theme";
import styled from "styled-components";
import Sheet from "react-modal-sheet";
import React, { useEffect, useState } from "react";

import { major, minor } from "@/components/StdSet";
import { IDepartmentGridItemWrapComponent } from "@/Interfaces/interfaces";
import TempIcon from "@/components/TempIcon";
import School_Svg from "@/assets/svgs/school.svg";

import done_Svg from "../assets/svgs/done.svg";
import doneDisabled_Svg from "../assets/svgs/done_Disabled.svg";
import reset_Svg from "../assets/svgs/reset.svg";

import { useAtom } from "jotai";
import { departmentOptionAtom } from "@/store";

interface IProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/** 분과 선택 옵션 부분을 모두 감싸는 div. 검색 옵션-분과를 열었을 때 이것을 보여주게 됨. */
const DepartmentListWrap = styled.div``;

/** ·전공· ·부전공· 써져있는 제목부분 */
const DepartmentListTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  text-align: center;
  margin: 7px 0;
`;

/** 분과 아이콘이 그리드 형태로 들어갈 수 있게 해주는 div */
const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 75px);
  margin: 0 6.5vw;
`;

/** DepartmentGridItemWrapComponent function을 감싸는 div */
const DepartmentGridItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

/** 검색 옵션에서 분과 선택하는 아이콘 밑에 있는 분과 이름 */
const DepartmentGridItemName = styled(
  theme.universalComponent.DivTextContainer
)`
  font-family: NSMedium;
  text-align: center;
  margin-top: 5px;
`;

/** 검색 옵션에서 분과/정렬 선택하는 드롭다운 버튼 */
const SearchDrop = styled.div<{
  color: string;
  afterColor: string;
  option: number;
}>`
  margin: 10px 10vw 0 10vw;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.color};

  div:nth-child(1) {
    font-family: NSRegular;
    font-size: 15px;
    display: flex;
    align-items: center;

    span {
      margin-left: 12px;
    }
  }

  div:nth-child(2) {
    font-family: NSBold;
    font-size: 16px;
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
      color: ${(props) => {
        if (props.option === 0) return props.color;
        else return props.afterColor;
      }};
    }
  }
`;

const ManipulationBtnWrap = styled.div`
  width: 80vw;
  margin: 25px auto 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ApplyBtn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
  bgColorAlt: string;
  colorAlt: string;
  disabled: boolean;
}>`
  background-color: ${(props) =>
    props.disabled ? props.bgColorAlt : props.bgColor};
  color: ${(props) => (props.disabled ? props.colorAlt : props.color)};
  font-family: NSBold;
  height: 35px;
  line-height: 35px;
  width: 57vw;
  text-align: center;
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
`;

const ResetBtn = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  height: 35px;
  line-height: 35px;
  text-align: left;
  cursor: pointer;
`;

const SchoolSvg = styled(theme.universalComponent.SvgIcon)``;
const ResetSvg = styled(theme.universalComponent.SvgIcon)`
  position: relative;
  top: 4px;
  margin-left: 4px;
`;
const DoneSvg = styled(theme.universalComponent.SvgIcon)`
  position: relative;
  top: 4px;
  margin-left: 2px;
`;

export default function DepartmentSelectModal({ isOpen, setOpen }: IProps) {
  /** 검색 옵션-전공에서 분과 선택 시 보이는 부분(선택하세요 / 전공(부전공) 이름) */
  const [displayedDepartmentOption, setDisplayedDepartmentOption] =
    useState<string>("선택하세요");

  /** 담는 형식은 [[...fullKorean],[...korean],[...subjectCode]], 여기에 현재 필터 분과 정보를 저장함. */
  const [departmentOption, setDepartmentOption] = useAtom(departmentOptionAtom);

  /** 초기화 버튼을 누르면 작동되는 function */
  const resetDepartmentOption = () => {
    setDepartmentOption([[], [], []]);
  };

  /** 검색 옵션에서 분과를 선택하면 '선택하세요'가 해당 분과 이름으로 바뀌게 함 */
  useEffect(() => {
    // departmentOption[0]의 array 안에 아무것도 없으면 '선택하세요' 출력
    if (departmentOption[0].length === 0) {
      setDisplayedDepartmentOption("선택하세요");
    } else if (departmentOption[0].length === 1) {
      //어차피 array 길이가 하나뿐이므로 fullKorean의 [0], 그리고 그 안의 내용물 [0]을 지칭함
      setDisplayedDepartmentOption(departmentOption[0][0]);
    } else if (departmentOption[0].length === 2) {
      setDisplayedDepartmentOption(
        `${departmentOption[1][0]}, ${departmentOption[1][1]}`
      );
    } else {
      setDisplayedDepartmentOption(
        `${departmentOption[1][0]} 외 ${departmentOption[0].length - 1}개`
      );
    }
  }, [departmentOption]);

  /** 검색 옵션 State를 바꿔주는 함수 */
  const switchDepartmentOption = (
    fullKorean: string,
    korean: string,
    subjectCode: string
  ) => {
    const findItem = (i: string) => {
      return departmentOption[0].find((j) => j === i) !== undefined;
    };

    if (findItem(fullKorean)) {
      // 이미 있으면
      setDepartmentOption([
        departmentOption[0].filter((i) => i !== fullKorean),
        departmentOption[1].filter((i) => i !== korean),
        departmentOption[2].filter((i) => i !== subjectCode),
      ]);
    } else {
      // 없으면
      setDepartmentOption([
        [...departmentOption[0], fullKorean],
        [...departmentOption[1], korean],
        [...departmentOption[2], subjectCode],
      ]);
    }
    console.log(departmentOption);
  };

  /** 분과 선택하는 아이콘 + 밑에 한글까지 감싸는 Wrap (이걸 DepartmentGrid가 감싸는 구조) */
  function DepartmentGridItemWrapComponent({
    item,
    iconColor,
    textColor,
  }: IDepartmentGridItemWrapComponent) {
    /** departmentOption[0] 안에 item.fullKorean이 있는지 검사하는 함수 */
    const findItem = (i: string) => {
      return departmentOption[0].find((j) => j === i) !== undefined;
    };

    return (
      <DepartmentGridItemWrap
        key={item.id}
        onClick={() =>
          switchDepartmentOption(item.fullKorean, item.korean, item.subjectCode)
        }
      >
        <TempIcon
          text={item.subjectCode}
          color={iconColor}
          isChecked={findItem(item.fullKorean)}
        ></TempIcon>
        <DepartmentGridItemName color={textColor} fontSize={14}>
          {item.korean}
        </DepartmentGridItemName>
      </DepartmentGridItemWrap>
    );
  }
  return (
    <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[600]}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <SearchDrop
            color={theme.colors.secondaryText}
            afterColor={theme.colors.primaryText}
            option={departmentOption[0].length}
          >
            <div>
              <SchoolSvg size={26} src={School_Svg}></SchoolSvg>
              <span>분과</span>
            </div>
            <div>
              <span>{displayedDepartmentOption}</span>
            </div>
          </SearchDrop>
          <DepartmentListWrap>
            <DepartmentListTitle
              color={theme.colors.secondaryText}
              fontSize={16}
            >
              · 전공 ·
            </DepartmentListTitle>
            <DepartmentGrid>
              {major.map((item) => (
                <DepartmentGridItemWrapComponent
                  item={item}
                  iconColor={"#FFCF23"}
                  textColor={theme.colors.secondaryText}
                  key={item.id}
                ></DepartmentGridItemWrapComponent>
              ))}
              {/* 공통 분과 선택은 다른 색으로 하기 위해 구분. */}
              <DepartmentGridItemWrapComponent
                item={{
                  id: 9,
                  korean: "공통",
                  fullKorean: "공통과목",
                  subjectCode: "UC",
                }}
                iconColor={"#E0E0E0"}
                textColor={theme.colors.secondaryText}
              ></DepartmentGridItemWrapComponent>
            </DepartmentGrid>

            <DepartmentListTitle
              color={theme.colors.secondaryText}
              fontSize={16}
            >
              · 부전공 ·
            </DepartmentListTitle>
            <DepartmentGrid>
              {minor.map((item) => (
                <DepartmentGridItemWrapComponent
                  item={item}
                  iconColor={"#8CBAFF"}
                  textColor={theme.colors.secondaryText}
                  key={item.id}
                ></DepartmentGridItemWrapComponent>
              ))}
            </DepartmentGrid>
          </DepartmentListWrap>
          <ManipulationBtnWrap>
            <ResetBtn
              fontSize={14}
              color={theme.colors.secondaryText}
              onClick={resetDepartmentOption}
            >
              초기화<ResetSvg size={20} src={reset_Svg}></ResetSvg>
            </ResetBtn>
            <ApplyBtn
              disabled={departmentOption[0].length === 0}
              fontSize={14}
              color={theme.colors.white}
              colorAlt={theme.colors.secondaryText}
              bgColor={theme.colors.primary}
              bgColorAlt={theme.colors.inputBg}
              onClick={()=>{setOpen(false)}}
            >
              적용
              {departmentOption[0].length === 0 ? (
                <DoneSvg size={20} src={doneDisabled_Svg}></DoneSvg>
              ) : (
                <DoneSvg size={20} src={done_Svg}></DoneSvg>
              )}
            </ApplyBtn>
          </ManipulationBtnWrap>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
