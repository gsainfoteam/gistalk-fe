import { useState, KeyboardEvent } from "react";
import { theme } from "@/style/theme";

import SearchCard from "@/pages/SearchPage/components/SearchCard";
import Filter_Svg from "@assets/svgs/tune.svg";
import Order_Svg from "@assets/svgs/order.svg";

import CatBlankList_Svg from "@assets/svgs/catBlankList.svg";
import { ISearchCard } from "@/Interfaces/interfaces";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { departmentOptionAtom, sortOptionAtom } from "@/store";
import SortSelectModal from "@/pages/SearchPage/components/SortSelectModal";
import {
  BlankSvg,
  BlankText,
  BlankWrap,
  FilterSvg,
  ItemList,
  OptionBtnWrap,
  OrderSvg,
  sortList,
} from "./SearchPage.styled";
import { tempClassList } from "./SearchPage.const";
import { SearchBar } from "./components/SearchBar";
import DepartmentSelectModal from "./components/DepartmentSelectModal";
import Header from "@components/Header";

export function SearchPage() {
  const [sortOpen, setSortOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const [sortStd, setSortStd] = useAtom(sortOptionAtom);
  const departmentOption = useAtom(departmentOptionAtom)[0];

  const [searchText, setSearchText] = useState("");
  const [searchTextEnter, setSearchTextEnter] = useState("");

  /**검색바에 입력된 글자가 Enter를 눌러야 SearchList에 적용될 수 있도록 하는 enterSearchText*/
  const enterSearchText = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setSearchTextEnter(searchText);
    }
  };

  /** 임시 아이템 리스트 */
  const TempSearchList: ISearchCard[] =
    tempClassList /** 내림차순 정렬: hexData의 subject가 정렬 토글 선택값에 따른 sortStd의 score에 값에 따라 정렬됨 */
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

  return (
    <>
      <Header />
      <SearchBar
        setSearchText={setSearchText}
        searchText={searchText}
        setSearchTextEnter={setSearchTextEnter}
        enterSearchText={enterSearchText}
        searchTextEnter={searchTextEnter}
      />
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
