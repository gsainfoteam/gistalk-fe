import { useState } from "react";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { departmentOptionAtom, sortOptionAtom } from "@/store";
import { theme } from "@/style/theme";
import SearchCard from "./components/SearchCard";
import Filter_Svg from "@assets/svgs/tune.svg";
import CatBlankList_Svg from "@assets/svgs/catBlankList.svg";
import { lectureInfo } from "@/Interfaces/interfaces";
import SortSelectModal from "@/pages/SearchPage/components/SortSelectModal";
import Header from "@components/Header";
import {
  BlankSvg,
  BlankText,
  BlankWrap,
  FilterSvg,
  ItemList,
  OptionBtnWrap,
} from "./SearchPage.styled";
import { filterLectureList, sortList } from "./SearchPage.const";
import { SearchBar } from "./components/SearchBar";
import DepartmentSelectModal from "./components/DepartmentSelectModal";
import { getLectureList } from "@/apis/lectures";
import { StyledLink } from "@components/StyledLink";
import { concatProfessorNames } from "@/utils";
import { useSearch } from "@/hooks/useSearch";
import { SearchCardSkeleton } from "../skeletonComponents/SearchCard.skeleton";

export function SearchPage() {
  const [sortOpen, setSortOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const [sortStd, setSortStd] = useAtom(sortOptionAtom);
  const departmentOption = useAtom(departmentOptionAtom)[0];

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["getEvaluationList"],
    queryFn: getLectureList,
  });

  const { data: lectureList } = { ...data };
  const {
    searchText,
    setSearchText,
    searchTextEnter,
    enterSearchText,
    clearSearchText,
  } = useSearch();

  /**Search 페이지의 강의 리스트 */
  function DisplayItemList() {
    const skeletonNumber = new Array(550).fill(null); //550개의 임의의 skeleton 로드
    if (isLoading) {
      return skeletonNumber.map((skeleton, index) => (
        <div key={index}>
          <SearchCardSkeleton />
        </div>
      ));
    }
    const filteredLectureList = filterLectureList(
      lectureList,
      departmentOption,
      searchTextEnter
    );

    if (filteredLectureList === null || filteredLectureList === undefined) {
      return null;
    }

    return filteredLectureList.map((item: lectureInfo) => {
      const professorNames = concatProfessorNames(item.LectureSection);
      return (
        <StyledLink key={item.id} to={`/evaluation/${item.id}`}>
          <SearchCard
            subjectCode={item.LectureCode}
            professorName={professorNames}
            subjectName={item.name}
          />
        </StyledLink>
      );
    });
  }

  return (
    <>
      <Header />
      <SearchBar
        data={lectureList}
        setSearchText={setSearchText}
        searchText={searchText}
        searchTextEnter={searchTextEnter}
        enterSearchText={enterSearchText}
        clearSearchText={clearSearchText}
        isSearchWrite={false}
      />
      <OptionBtnWrap color={theme.colors.secondaryText} fontSize={14}>
        {/* <div onClick={() => setSortOpen(true)}>
          <p>{sortStd}</p>
          <OrderSvg size={20} src={Order_Svg}></OrderSvg>
        </div>
        <div></div> */}
        <div onClick={() => setDepartmentOpen(true)}>
          <p>분과 필터</p>
          <FilterSvg size={20} src={Filter_Svg}></FilterSvg>
        </div>
      </OptionBtnWrap>
      {/**case 1: 아무것도 선택되지 않은 경우, 전체 출력/ case 2: 선택된 것이 있는 경우 includes로 필터링하여 출력*/}
      <ItemList>
        {DisplayItemList()}
        {DisplayItemList() === null ? (
          <BlankWrap>
            <BlankSvg size={160} src={CatBlankList_Svg} />
            <BlankText fontSize={16} color={theme.colors.secondaryText}>
              검색 결과가 존재하지 않습니다.
            </BlankText>
          </BlankWrap>
        ) : null}
      </ItemList>
      <DepartmentSelectModal
        isOpen={departmentOpen}
        setOpen={setDepartmentOpen}
      />
      <SortSelectModal
        isOpen={sortOpen}
        setOpen={setSortOpen}
        sortList={sortList}
      />
    </>
  );
}
