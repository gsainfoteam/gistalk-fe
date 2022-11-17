import styled from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "../style/theme";

import SearchCard from "./SearchCard";
import TempIcon from "./TempIcon";
import LogoSrc from "../assets/TEMPLOGO_GISTALK.png";
import Search_Svg from "../assets/svgs/search_black.svg";
import Filter_Svg from "../assets/svgs/tune_black.svg";
import Sort_Svg from "../assets/svgs/sort_black.svg";
import School_Svg from "../assets/svgs/school_black.svg";
import ArrowL_Svg from "../assets/svgs/arrowL_black.svg";

interface IDepartment {
  subjectCode: string;
  korean: string;
  fullKorean: string;
  id: number;
}

/** DepartmentGridItemWrapComponent를 위한 프롭스 타입 정의 인터페이스 */
interface IProps {
  item: IDepartment;
  iconColor: string;
  textColor: string;
}

/** (임시로 쓰일진 모르겠지만 어쨌든) 각 카드에서 받아와야 하는 오브젝트 형식 */
interface IItem {
  id:number;
  subjectCode: string;
  professorName: string;
  subjectName: string;
  subjectScore: string;
}

const LogoImg = styled.img`
  width: 300px;
  margin-top: 100px;
  margin-bottom: 10px;
`;

const SearchWrap = styled.div`
  width: 85vw;
  display: flex;
  height: 45px;
  margin: 100px auto 0 auto;
`;

const SearchInput = styled.input<{ color: string }>`
  width: calc(85vw - 60px);
  background-color: #f3f3f3;
  height: 45px;
  padding-left: 15px;
  font-family: NSRegular;
  border: none;
  text-align: left;
  display: block;
  border-radius: 5px 0 0 5px;

  //폰트 크기
  font-size: 16px;
  color: ${(props) => props.color};
`;

const SearchBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  background-color: #f3f3f3;
  border-radius: 0 5px 5px 0;
`;

const SvgIcon = styled.img<{ size: number }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

const SearchSvg = styled(SvgIcon)`
  display: block;
  cursor: pointer;
`;

const FilterSvg = styled(SvgIcon)``;
const SchoolSvg = styled(SvgIcon)``;
const SortSvg = styled(SvgIcon)``;
const ArrowLSvg = styled(SvgIcon)<{ open: boolean }>`
  transform: ${(props) => props.open && "rotate(-90deg)"};
  transition: 0.1s;
`;

/** 검색 옵션 열렸을 때 이걸 보여주게 됨. */
const SearchOptionOpenedWrap = styled.div`
  width: 85vw;
  padding: 0 7.5vw;
  margin-bottom: 20px;
`;

/** 검색 옵션에서 분과/정렬 선택하는 드롭다운 버튼 */
const SearchDrop = styled.div<{
  color: string;
  afterColor: string;
  option: string;
}>`
  width: 78vw;
  margin: 18px 4vw 0 4vw;
  transition:.2s;
  
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
    font-size: 18px;
    display: flex;
    align-items: center;
    span {
      margin-right: 5px;
      color: ${(props) => {
        if (props.option === "") return props.color;
        else return props.afterColor;
      }};
    }
  }
`;

/** '검색 옵션' 표시되어 있는 버튼 */
const OptionBtnWrap = styled.div<{ color: string }>`
  display: flex;
  color: ${(props) => props.color};
  font-size: 14px;
  p {
    margin-right: 5px;
  }
  margin-top: 10px;
  margin-right: 7.5vw;
  display: flex;
  justify-content: right;
  font-family: NSRegular;
`;
/** 분과 선택 옵션 부분을 모두 감싸는 div. 검색 옵션-분과를 열었을 때 이것을 보여주게 됨. */
const DepartmentListWrap = styled.div``;

/** ·전공· ·부전공· 써져있는 제목부분 */
const DepartmentListTitle = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: NSBold;
  font-size: 16px;
  text-align: center;
  margin: 7px 0;
`;

/** 분과 아이콘이 그리드 형태로 들어갈 수 있게 해주는 div */
const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 85px);
`;

/** DepartmentGridItemWrapComponent function을 감싸는 div */
const DepartmentGridItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/** 검색 옵션에서 분과 선택하는 아이콘 밑에 있는 분과 이름 */
const DepartmentGridItemName = styled.div<{ color: string }>`
  color: ${(props) => props.color};
  font-family: NSMedium;
  font-size: 15px;
  text-align: center;
  margin-top: 5px;
`;

const SortSelect = styled.select<{color: string; bg:string;}>`
  border:none;
  font-family: NSBold;
  color : ${props => props.color};
  background: ${props => props.bg};
  height:30px;
  width:200px;
  padding-left: 8px;
  padding-right: 8px;
  
  select{
    border:none;
    font-family: NSBold;
    background: ${props => props.bg};
  }
`

/** SearchCard 나열하는거 감싸는 div. 검색했을 때 리스트 형태로 나오는 걸 감싸는 부분 */
const ItemList = styled.div`
  max-width: 85vw;
  margin: 15px auto 0 auto;
`;

/** 전공 분과 선택을 위한 오브젝트 리스트 */
const major: IDepartment[] = [
  { subjectCode: "GS", korean: "기초", fullKorean: "기초교육학부", id: 1 },
  { subjectCode: "BS", korean: "생명", fullKorean: "생명과학부", id: 2 },
  { subjectCode: "CH", korean: "화학", fullKorean: "화학과", id: 3 },
  {
    subjectCode: "EC",
    korean: "전컴",
    fullKorean: "전기전자컴퓨터공학부",
    id: 4,
  },
  { subjectCode: "EV", korean: "지환공", fullKorean: "지구·환경공학부", id: 5 },
  { subjectCode: "MA", korean: "신소재", fullKorean: "신소재공학부", id: 6 },
  { subjectCode: "PS", korean: "물리", fullKorean: "물리·광과학과", id: 7 },
  { subjectCode: "ME", korean: "기계", fullKorean: "기계공학부", id: 8 },
];

/** 부전공 분과 선택을 위한 오브젝트 리스트 */
const minor: IDepartment[] = [
  { subjectCode: "MM", korean: "수학", fullKorean: "수학 부전공", id: 1 },
  {
    subjectCode: "MD",
    korean: "의생공",
    fullKorean: "의생명공학 부전공",
    id: 2,
  },
  { subjectCode: "ET", korean: "에너지", fullKorean: "에너지 부전공", id: 3 },
  {
    subjectCode: "CT",
    korean: "문화기술",
    fullKorean: "문화기술 부전공",
    id: 4,
  },
  {
    subjectCode: "IR",
    korean: "지능로봇",
    fullKorean: "지능로봇 부전공",
    id: 5,
  },
  {
    subjectCode: "LH",
    korean: "인문사회",
    fullKorean: "인문사회 부전공",
    id: 6,
  },
  { subjectCode: "AI", korean: "AI융합", fullKorean: "AI융합 부전공", id: 7 },
];

/** 정렬을 어떻게 할지 선택할 수 있는 리스트 */
const sortList: { id:number, content:string }[] = [
  {id:1, content:"수업 쉬운 순"},
  {id:2, content:"유익한 순"},
  {id:3, content:"성적 만족도 순"},
  {id:4, content:"과제 적은 순"},
  {id:5, content:"수업 재밌는 순"},
  {id:6, content:"강의력 좋은 순"}
]

export default function Search() {
  const [optionOpen, setOptionOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departmentOption, setDepartmentOption] = useState<string>("");

  /** 검색 옵션-전공에서 분과 선택 시 보이는 부분(선택하세요 / 전공(부전공) 이름) */
  const [displayedDepartmentOption, setDisplayedDepartmentOption] =
    useState<string>("선택하세요");

  /** 검색 옵션에서 분과를 선택하면 '선택하세요'가 해당 분과 이름으로 바뀌게 함 */
  useEffect(() => {
    if (departmentOption === "") {
      setDisplayedDepartmentOption("선택하세요");
    } else {
      setDisplayedDepartmentOption(departmentOption);
    }
  }, [departmentOption]);

  /** 검색 옵션 열기 */
  const toggleOptionOpen = () => {
    setOptionOpen(!optionOpen);
    setDepartmentOpen(false); //'검색 옵션-분과'을 펼치고 검색 옵션을 닫았다 열었을 떄 그대로 열려있는 현상을 방지
  };

  /** 검색 옵션-분과 열기 */
  const toggleDepartmentOpen = () => {
    setDepartmentOpen(!departmentOpen);
    if (!departmentOpen) {
      //열면 departmentOption 초기화
      setDepartmentOption("");
    }
  };

  /** 검색 옵션 State를 바꿔주는 함수 */
  const switchDepartmentOption = (item: string) => {
    setDepartmentOption(item);
    setDepartmentOpen(false); //검색 옵션-분과 선택 후 해당 탭 닫음
    console.log(item);
  };

  /** 분과 선택하는 아이콘 + 밑에 한글까지 감싸는 Wrap (이걸 DepartmentGrid가 감싸는 구조) */
  function DepartmentGridItemWrapComponent({
    item,
    iconColor,
    textColor,
  }: IProps) {
    return (
      <DepartmentGridItemWrap
        key={item.id}
        onClick={() => switchDepartmentOption(item.fullKorean)}
      >
        <TempIcon text={item.subjectCode} color={iconColor}></TempIcon>
        <DepartmentGridItemName color={textColor}>
          {item.korean}
        </DepartmentGridItemName>
      </DepartmentGridItemWrap>
    );
  }

  /** 임시 아이템 리스트 */
  const TempSearchList: IItem[] = [
    {
      id:1,
      subjectCode: "GS1001-01",
      professorName: "황치옥",
      subjectName: "미적분학과 응용",
      subjectScore: "4.5",
    },

    {
      id:2,
      subjectCode: "BS2201-01",
      professorName: "엄수현",
      subjectName: "생명과학의 정량적 이해",
      subjectScore: "4.5",
    },

    {
      id:3,
      subjectCode: "CH4205-01",
      professorName: "서지원",
      subjectName: "생유기화학과 바이오의약품",
      subjectScore: "4.5",
    },
  ];

  return (
    <>
      <SearchWrap>
        <SearchInput
          placeholder="강의명/교수명으로 검색"
          color={theme.primaryText}
        />
        <SearchBtnWrap>
          <SearchSvg size={30} src={Search_Svg} />
        </SearchBtnWrap>
      </SearchWrap>

      <OptionBtnWrap color={theme.secondaryText} onClick={toggleOptionOpen}>
        <p>검색 옵션</p>
        <FilterSvg size={20} src={Filter_Svg}></FilterSvg>
      </OptionBtnWrap>

      {optionOpen && (
        <SearchOptionOpenedWrap>
          <SearchDrop
            color={theme.secondaryText}
            afterColor={theme.primaryText}
            option={departmentOption}
          >
            <div>
              <SchoolSvg size={26} src={School_Svg}></SchoolSvg>
              <span>분과</span>
            </div>
            <div onClick={toggleDepartmentOpen}>
              <span>{displayedDepartmentOption}</span>
              <ArrowLSvg
                size={24}
                src={ArrowL_Svg}
                open={departmentOpen}
              ></ArrowLSvg>
            </div>
          </SearchDrop>
          {departmentOpen && (
            <DepartmentListWrap>
              <DepartmentListTitle color={theme.secondaryText}>
                · 전공 ·
              </DepartmentListTitle>
              <DepartmentGrid>
                {major.map((item) => (
                  <DepartmentGridItemWrapComponent
                    item={item}
                    iconColor={"#FFCF23"}
                    textColor={theme.secondaryText}
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
                  textColor={theme.secondaryText}
                ></DepartmentGridItemWrapComponent>
              </DepartmentGrid>

              <DepartmentListTitle color={theme.secondaryText}>
                · 부전공 ·
              </DepartmentListTitle>
              <DepartmentGrid>
                {minor.map((item) => (
                  <DepartmentGridItemWrapComponent
                    item={item}
                    iconColor={"#8CBAFF"}
                    textColor={theme.secondaryText}
                    key={item.id}
                  ></DepartmentGridItemWrapComponent>
                ))}
              </DepartmentGrid>
            </DepartmentListWrap>
          )}
          <SearchDrop
            color={theme.secondaryText}
            afterColor={theme.secondaryText}
            option={departmentOption}
          >
            <div>
              <SchoolSvg size={26} src={Sort_Svg}></SchoolSvg>
              <span>정렬</span>
            </div>
            <div>
              <SortSelect color={theme.secondaryText} bg={theme.inputBg}>
                {sortList.map(item => <option key={item.id}>{item.content}</option>)}
              </SortSelect>
            </div>
          </SearchDrop>
        </SearchOptionOpenedWrap>
      )}

      <ItemList>
        {TempSearchList.map((item) => (
          <SearchCard
              key={item.id}
            subjectCode={item.subjectCode}
            professorName={item.professorName}
            subjectName={item.subjectName}
            subjectScore={item.subjectScore}
          ></SearchCard>
        ))}
      </ItemList>
      {/* header, footer 어떻게 할지 논의 필요할듯? */}
    </>
  );
}
