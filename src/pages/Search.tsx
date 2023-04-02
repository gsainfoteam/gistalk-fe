import styled from "styled-components";
import { useEffect, useState, KeyboardEvent } from "react";
import { theme } from "@/style/theme";

import SearchCard from "../components/SearchCard";
import Search_Svg from "../assets/svgs/search.svg";
import Filter_Svg from "../assets/svgs/tune.svg";
import Order_Svg from "../assets/svgs/order.svg";
import InfoteamLogo_Svg from "../assets/svgs/infoteamLogo.svg";
import CatBlankList_Svg from "../assets/svgs/catBlankList.svg";
import NorthWest_Svg from "../assets/svgs/northWest.svg";
import Cancel_Svg from "../assets/svgs/cancel_Black.svg";
import {
  IDepartment,
  IDepartmentGridItemWrapComponent,
  ISearchCard,
  ISortOption,
} from "@/Interfaces/interfaces";
import { tempdb } from "@/tempdb/tempdb";
import { Link } from "react-router-dom";
import DepartmentSelectModal from "@/components/DepartmentSelectModal";
import { useAtom } from "jotai";
import { departmentOptionAtom, sortOptionAtom } from "@/store";
import SortSelectModal from "@/components/SortSelectModal";
import useSubjectCode from "@/hooks/useSubjectCode";
import { checkVaildEmail } from "@/hooks/usePassCheck";
import { useLogOut } from "@/hooks/useLogout";

/** 페이지 최상단의 로고, 마이페이지 버튼 있는 부분 */
const TopWrap = styled.div`
  width: 87vw;
  margin: 10px auto 0 auto;
  padding: 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/** 지스톡 로고 (아이콘, 텍스트) 같이 있는 Wrap */
const LogoWrap = styled.div<{ color: string }>`
  font-family: Aharoni;
  color: ${(props) => props.color};
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const LogoSvg = styled(theme.universalComponent.SvgIcon)`
  margin-right: 7px;
`;

/** 마이페이지 버튼 있는 부분 */
const MyBtn = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  font-size: 0.8rem;

  background: ${theme.colors.secondary};
`;

const SearchWrap = styled.div<{ borderColor: string }>`
  width: 85vw;
  display: flex;
  flex-direction: column;
  height: max-content;
  margin: 0 auto;

  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor};
`;

const SearchInputWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input<{
  color: string;
  bgColor: string;
}>`
  width: calc(85vw - 60px);
  background-color: ${(props) => props.bgColor};
  height: 40px;
  padding-left: 15px;
  font-family: NSRegular;
  border: none;
  text-align: left;
  display: block;

  //폰트 크기
  font-size: 16px;
  color: ${(props) => props.color};
`;

const SearchBtnWrap = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${(props) => props.bgColor};
`;

/**검색어 입력시 검색창과 자동완성된 검색어를 분리하는 가로선 */
const SearchHorizontalLine = styled.hr<{
  lineColor: string;
  inlineText: string;
  searchItemList: (JSX.Element | null)[];
}>`
  margin: 0 7px;
  width: auto;
  border: 0;
  border-top: 1.5px solid ${(props) => props.lineColor};

  //searchItemList가 있는 경우에만 가로선이 나타나도록 설정
  display: ${(props) =>
    props.searchItemList.every((value) => value === null) ? "none" : "flex"};
`;

const SearchSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;
const CancelSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;

const NorthWestSvg = styled(theme.universalComponent.SvgIcon)``;

const FilterSvg = styled(theme.universalComponent.SvgIcon)``;
const OrderSvg = styled(theme.universalComponent.SvgIcon)`
  transform: rotate(90deg);
`;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: NSRegular;
  padding: 4px 16px;
  color: ${theme.colors.primaryText};
`;

const MatchingText = styled.span<{ color: string }>`
  font-family: NSBold;
  color: ${(props) => props.color};
`;

const OptionBtnWrap = styled(theme.universalComponent.DivTextContainer)`
  display: flex;
  align-items: center;

  p {
    margin-right: 5px;
  }

  margin-top: 10px;
  margin-right: 7.5vw;
  justify-content: right;
  font-family: NSRegular;

  div {
    display: flex;
    align-items: center;
    img {
      position: relative;
      top: 1px;
    }
  }

  div:nth-child(2) {
    margin: 0 7px;
    height: 20px;
    border-left: 1.5px solid ${(props) => props.color};
    position: relative;
    top: 1px;
  }
`;

/** SearchCard 나열하는거 감싸는 div. 검색했을 때 리스트 형태로 나오는 걸 감싸는 부분 */
const ItemList = styled.div`
  max-width: 85vw;
  margin: 15px auto 0 auto;
`;

/** Search 리스트가 비었을 떄 나오는 냥이 일러스트, 문구 Wrap */
const BlankWrap = styled.div`
  margin: 70px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlankSvg = styled(theme.universalComponent.SvgIcon)``;
const BlankText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

/** 정렬을 어떻게 할지 선택할 수 있는 리스트: std 기준으로 sort*/
const sortList: { id: number; content: string; std: ISortOption }[] = [
  { id: 1, content: "수업 쉬운 순", std: "수업 난이도" },
  { id: 2, content: "유익한 순", std: "유익함" },
  { id: 3, content: "성적 만족도 순", std: "성적 만족도" },
  { id: 4, content: "과제 적은 순", std: "과제량" },
  { id: 5, content: "수업 재밌는 순", std: "재미 / 흥미" },
  { id: 6, content: "강의력 좋은 순", std: "강의력" },
];

export default function Search() {
  const [sortOpen, setSortOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const [sortStd, setSortStd] = useAtom(sortOptionAtom);
  const departmentOption = useAtom(departmentOptionAtom)[0];

  useEffect(() => {
    // checkVaildEmail();
  });

  const [searchText, setSearchText] = useState("");
  const [searchTextEnter, setSearchTextEnter] = useState("");
  /**검색바에 입력된 글자가 Enter를 눌러야 SearchList에 적용될 수 있도록 하는 enterSearchText*/
  const enterSearchText = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setSearchTextEnter(searchText);
    }
  };

  const handleLogOut = useLogOut();

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
        subjectCode: useSubjectCode(i.subjectCode),
        professorName: i.professorName,
        subjectName: i.subjectName,
        subjectScore: avgScoreStr,
        subjectScoreNum: avgScore, //평균점수
        stdData: i.hexData,
      };
    }) /** 내림차순 정렬: hexData의 subject가 정렬 토글 선택값에 따른 sortStd의 score에 값에 따라 정렬됨 */
    .sort((a, b) => {
      if (sortStd === "평균점수") {
        return (
          b.subjectScoreNum - a.subjectScoreNum // 평균점수순 정렬을 위해 따로 만듦
        );
      } else {
        return (
          b.stdData.filter((hex) => hex.subject === sortStd)[0].score -
          a.stdData.filter((hex) => hex.subject === sortStd)[0].score
        );
      }
    });

  /**Search 페이지의 강의 리스트 */
  function DisplayItemList() {
    return TempSearchList.map((item) => {
      if (
        (departmentOption[2].length === 0 ||
          departmentOption[2].some((code) =>
            item.subjectCode.includes(code)
          )) &&
        (item.subjectName.includes(searchTextEnter) ||
          item.professorName.includes(searchTextEnter))
      ) {
        return (
          <Link
            key={item.id}
            to={`/${item.id}/evaluation`}
            style={{ textDecoration: "none" }}
          >
            <SearchCard
              subjectCode={item.subjectCode}
              professorName={item.professorName}
              subjectName={item.subjectName}
              subjectScore={item.subjectScore}
            />
          </Link>
        );
      } else {
        return null;
      }
    });
  }

  /**검색바 하단에 출력되는 강의명 리스트 */
  const SearchItemList = () => {
    return TempSearchList.map((item) => {
      if (
        searchText != "" &&
        item.subjectName.includes(searchText) &&
        searchTextEnter != searchText
      ) {
        return (
          <Link
            key={item.id}
            to={`/${item.id}/evaluation`}
            style={{ textDecoration: "none" }}
          >
            <SearchItem>
              <p>
                <span>{item.subjectName.split(searchText)[0]}</span>
                <MatchingText color={theme.colors.primary}>
                  {searchText}
                </MatchingText>
                <span>{item.subjectName.split(searchText)[1]}</span>
                <span>- {item.professorName}</span>
              </p>
              <NorthWestSvg src={NorthWest_Svg} size={20} />
            </SearchItem>
          </Link>
        );
      } else {
        return null;
      }
    });
  };

  /**검색 아이콘 -> 검색어가 입력되면 취소 아이콘 */
  function ResponsiveSvg() {
    if (searchText === "") {
      return (
        <SearchBtnWrap bgColor={theme.colors.white}>
          <SearchSvg size={25} src={Search_Svg} />
        </SearchBtnWrap>
      );
    } else {
      return (
        <SearchBtnWrap
          bgColor={theme.colors.white}
          onClick={() => {
            setSearchText("");
            setSearchTextEnter("");
          }}
        >
          <CancelSvg size={25} src={Cancel_Svg} />
        </SearchBtnWrap>
      );
    }
  }

  return (
    <>
      <TopWrap>
        <LogoWrap color={theme.colors.primary}>
          <LogoSvg src={InfoteamLogo_Svg} size={35}></LogoSvg>
          GISTALK
        </LogoWrap>
        <MyBtn onClick={handleLogOut}>로그아웃</MyBtn>
        {/* <Link to={`/profile`} style={{ textDecoration: "none" }}>
          <MyBtn fontSize={16} color={theme.colors.primaryText}>
            MY
          </MyBtn>
        </Link> */}
      </TopWrap>
      <SearchWrap borderColor={theme.colors.inputBorder}>
        <SearchInputWrap>
          <SearchInput
            placeholder="강의명으로 검색"
            color={theme.colors.primaryText}
            bgColor={theme.colors.white}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => enterSearchText(e)}
            value={searchText}
          />
          {ResponsiveSvg()}
        </SearchInputWrap>
        <SearchHorizontalLine
          lineColor={theme.colors.inputBorder}
          inlineText={searchText}
          searchItemList={SearchItemList()}
        />
        {SearchItemList()}
      </SearchWrap>
      <OptionBtnWrap color={theme.colors.secondaryText} fontSize={14}>
        <div onClick={() => setSortOpen(true)}>
          <p>{sortStd}</p>
          <OrderSvg size={20} src={Order_Svg}></OrderSvg>
        </div>
        <div></div>
        <div onClick={() => setDepartmentOpen(true)}>
          <p>분과 필터</p>
          <FilterSvg size={20} src={Filter_Svg}></FilterSvg>
        </div>
      </OptionBtnWrap>
      {/**case 1: 아무것도 선택되지 않은 경우, 전체 출력/ case 2: 선택된 것이 있는 경우 includes로 필터링하여 출력*/}
      <ItemList>
        {DisplayItemList()}
        {DisplayItemList().filter(
          // DisplayItemList 함수는 존재하는 리스트에서 필터링될 경우 null을 출력하는데,
          // 아무것도 검색되지 않는 경우 null로만 이루어진 배열이 된다.
          // 이를 위해 filter로 null들을 다 걸렀을 때 DisplayItemList의 length가 0이 되면 검색 결과 없다고 출력.
          (item) => {
            if (item !== null) return item;
          }
        ).length === 0 ? (
          <BlankWrap>
            <BlankSvg size={160} src={CatBlankList_Svg} />
            <BlankText fontSize={16} color={theme.colors.secondaryText}>
              검색 결과가 존재하지 않습니다.
            </BlankText>
          </BlankWrap>
        ) : null}
      </ItemList>
      {/* header, footer 어떻게 할지 논의 필요할듯? */}
      <DepartmentSelectModal
        isOpen={departmentOpen}
        setOpen={setDepartmentOpen}
      ></DepartmentSelectModal>
      <SortSelectModal
        isOpen={sortOpen}
        setOpen={setSortOpen}
        sortList={sortList}
      ></SortSelectModal>
    </>
  );
}
