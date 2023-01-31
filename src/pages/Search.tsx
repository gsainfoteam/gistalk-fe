import styled from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "../style/theme";

import SearchCard from "../components/SearchCard";
import TempIcon from "../components/TempIcon";
import Search_Svg from "../assets/svgs/search.svg";
import Filter_Svg from "../assets/svgs/tune.svg";
import Sort_Svg from "../assets/svgs/sort.svg";
import School_Svg from "../assets/svgs/school.svg";
import ArrowL_Svg from "../assets/svgs/arrowL.svg";
import InfoteamLogo_Svg from "../assets/svgs/infoteamLogo.svg";
import {
  IDepartment,
  IDepartmentGridItemWrapComponent,
  ISearchCard,
} from "../Interfaces/interfaces";
import { tempdb } from "../tempdb/tempdb";
import { major, minor } from "../components/StdSet";

/** 페이지 최상단의 로고, 마이페이지 버튼 있는 부분 */
const TopWrap = styled.div`
  width: 87vw;
  margin: 10px auto 0 auto;
  padding: 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

/** 지스톡 로고 (아이콘, 텍스트) 같이 있는 Wrap */
const LogoWrap = styled.div<{ color: string }>`
  font-family: Aharoni;
  color: ${props => props.color};
  font-size: 18px;
  display: flex;
  align-items: center;
`

const LogoSvg = styled(theme.universalComponent.SvgIcon)`
  margin-right: 7px;
`;

/** 마이페이지 버튼 있는 부분 */
const MyBtn = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  margin: 0 10px;
`

const SearchWrap = styled.div`
  width: 85vw;
  display: flex;
  height: 45px;
  margin: 0 auto;
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

const SearchSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;

const FilterSvg = styled(theme.universalComponent.SvgIcon)``;
const SchoolSvg = styled(theme.universalComponent.SvgIcon)``;
const SortSvg = styled(theme.universalComponent.SvgIcon)``;
const ArrowLSvg = styled(theme.universalComponent.SvgIcon)<{ open: boolean }>`
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
  option: number;
}>`
  width: 78vw;
  margin: 18px 4vw 0 4vw;
  transition: 0.2s;

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
        if (props.option === 0) return props.color;
        else return props.afterColor;
      }};
    }
  }
`;

const OptionBtnWrap = styled(theme.universalComponent.DivTextContainer)`
  display: flex;
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
const DepartmentListTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
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
const DepartmentGridItemName = styled(
    theme.universalComponent.DivTextContainer
)`
  font-family: NSMedium;
  text-align: center;
  margin-top: 5px;
`;

const SortSelect = styled.select<{ color: string; bg: string }>`
  border: none;
  font-family: NSBold;
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
  height: 30px;
  width: 200px;
  padding-left: 8px;
  padding-right: 8px;

  select {
    border: none;
    font-family: NSBold;
    background: ${(props) => props.bg};
  }
`;

/** SearchCard 나열하는거 감싸는 div. 검색했을 때 리스트 형태로 나오는 걸 감싸는 부분 */
const ItemList = styled.div`
  max-width: 85vw;
  margin: 15px auto 0 auto;
`;

/** 정렬을 어떻게 할지 선택할 수 있는 리스트: std 기준으로 sort*/
const sortList: { id: number; content: string; std: string }[] = [
  { id: 1, content: "수업 쉬운 순", std: "수업 난이도" },
  { id: 2, content: "유익한 순", std: "유익함" },
  { id: 3, content: "성적 만족도 순", std: "성적 만족도" },
  { id: 4, content: "과제 적은 순", std: "과제량" },
  { id: 5, content: "수업 재밌는 순", std: "재미/흥미" },
  { id: 6, content: "강의력 좋은 순", std: "강의력" },
];

export default function Search() {
  const [optionOpen, setOptionOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const [sortStd, setSortStd] = useState("수업 난이도");

  /** 담는 형식은 [[...fullKorean],[...korean],[...subjectCode]], 여기에 현재 필터 분과 정보를 저장함. */
  const [departmentOption, setDepartmentOption] = useState<
      [string[], string[], string[]]
  >([[], [], []]);

  /** 검색 옵션-전공에서 분과 선택 시 보이는 부분(선택하세요 / 전공(부전공) 이름) */
  const [displayedDepartmentOption, setDisplayedDepartmentOption] =
      useState<string>("선택하세요");

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

  /** 검색 옵션 열기 */
  const toggleOptionOpen = () => {
    setOptionOpen(!optionOpen);
    setDepartmentOpen(false); //'검색 옵션-분과'을 펼치고 검색 옵션을 닫았다 열었을 떄 그대로 열려있는 현상을 방지
  };

  /** 검색 옵션-분과 열기 */
  const toggleDepartmentOpen = () => {
    setDepartmentOpen(!departmentOpen);
  };

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

  /** 임시 아이템 리스트 */
  const TempSearchList: ISearchCard[] = tempdb
      .map((i) => {
        /** 평균 점수 계산 */
        let avgScore: number = 0;
        i.hexData.map((j) => (avgScore += j.score));
        avgScore /= 6;
        let avgScoreStr: string = (
            Math.round((avgScore + Number.EPSILON) * 100) / 100
        ).toFixed(1); //소수점 둘째자리에서 반올림, 소수점 고정

        return {
          id: i.id,
          subjectCode: i.subjectCode,
          professorName: i.professorName,
          subjectName: i.subjectName,
          subjectScore: avgScoreStr,
          stdData: i.hexData,
        };
      }) /**내림차순 정렬: hexData의 subject가 정렬 토글 선택값에 따른 sortStd의 score에 값에 따라 정렬됨 */
      .sort((a, b) => {
        return (
            b.stdData.filter((hex) => hex.subject === sortStd)[0].score -
            a.stdData.filter((hex) => hex.subject === sortStd)[0].score
        );
      });

  return (
      <>
        <TopWrap>
          <LogoWrap color={theme.colors.primary}>
            <LogoSvg src={InfoteamLogo_Svg} size={35}></LogoSvg>
            GISTALK
          </LogoWrap>
          <MyBtn fontSize={16} color={theme.colors.primaryText}>MY</MyBtn>
        </TopWrap>
        <SearchWrap>
          <SearchInput
              placeholder="강의명/교수명으로 검색"
              color={theme.colors.primaryText}
          />
          <SearchBtnWrap>
            <SearchSvg size={30} src={Search_Svg} />
          </SearchBtnWrap>
        </SearchWrap>
        <OptionBtnWrap
            color={theme.colors.secondaryText}
            fontSize={14}
            onClick={toggleOptionOpen}
        >
          <p>검색 옵션</p>
          <FilterSvg size={20} src={Filter_Svg}></FilterSvg>
        </OptionBtnWrap>
        {optionOpen && (
            <SearchOptionOpenedWrap>
              <SearchDrop
                  color={theme.colors.secondaryText}
                  afterColor={theme.colors.primaryText}
                  option={departmentOption[0].length}
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
              )}
              <SearchDrop
                  color={theme.colors.secondaryText}
                  afterColor={theme.colors.secondaryText}
                  option={0}
              >
                <div>
                  <SchoolSvg size={26} src={Sort_Svg}></SchoolSvg>
                  <span>정렬</span>
                </div>
                <div>
                  <SortSelect
                      color={theme.colors.secondaryText}
                      bg={theme.colors.inputBg}
                      onChange={(e) => setSortStd(e.target.value)}
                  >
                    {sortList.map((item) => (
                        <option key={item.id} value={item.std}>
                          {item.content}
                        </option>
                    ))}
                  </SortSelect>
                </div>
              </SearchDrop>
            </SearchOptionOpenedWrap>
        )}
        {/**case 1: 아무것도 선택되지 않은 경우, 전체 출력/ case 2: 선택된 것이 있는 경우 includes로 필터링하여 출력*/}
        <ItemList>
          {TempSearchList.map((item) => {
            if (
                departmentOption[2].length === 0 ||
                departmentOption[2].some((code) => item.subjectCode.includes(code))
            ) {
              return (
                  <SearchCard
                      key={item.id}
                      subjectCode={item.subjectCode}
                      professorName={item.professorName}
                      subjectName={item.subjectName}
                      subjectScore={item.subjectScore}
                  />
              );
            } else {
              return null;
            }
          })}
        </ItemList>
        {/* header, footer 어떻게 할지 논의 필요할듯? */}
      </>
  );
}
