import { useState } from "react";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { departmentOptionAtom } from "@/store";
import { theme } from "@/style/theme";
import SearchCard from "./components/SearchCard";
import Filter_Svg from "@assets/svgs/tune.svg";
import CatBlankList_Svg from "@assets/svgs/catBlankList.svg";
import { lectureInfo } from "@/Interfaces/interfaces";
import SortSelectModal from "@/pages/SearchPage/components/SortSelectModal";
import {
  BlankSvg,
  BlankText,
  BlankWrap,
  FilterSvg,
  ItemList,
  OptionBtnWrap,
} from "./CurrentSemesterPage.styled";
import { sortList } from "./CurrentSemesterPage.const";
import { SearchBar } from "./components/SearchBar";
import DepartmentSelectModal from "./components/DepartmentSelectModal";
import { getLectureList } from "@/apis/lectures";
import { StyledLink } from "@components/StyledLink";
import { concatProfessorNames } from "@/utils";
import { CURRENT_SEMESTER_TAB } from "@/constants/pageQueryString";
import useTabParam from "@/hooks/useTabParam";
import {
  filterLectureByYearSemester,
  filterLectureList,
} from "./CurrentSemesterPage.utils";
import { useSearch } from "@/hooks/useSearch";
import { SearchCardSkeleton } from "../skeletonComponents/SearchCard.skeleton";

export function CurrentSemesterPage() {
  const [sortOpen, setSortOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const departmentOption = useAtom(departmentOptionAtom)[0];
  const {
    searchText,
    setSearchText,
    searchTextEnter,
    enterSearchText,
    clearSearchText,
  } = useSearch();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["getEvaluationList"],
    queryFn: getLectureList,
  });

  const { data: lectureList } = { ...data };

  useTabParam(CURRENT_SEMESTER_TAB, searchText);
  /**검색바에 입력된 글자가 Enter를 눌러야 SearchList에 적용될 수 있도록 하는 enterSearchText*/

  const currentSemesterLectureList = !isLoading
    ? filterLectureByYearSemester(lectureList)
    : undefined;

  const filteredCurrentLectureList = currentSemesterLectureList
    ? filterLectureList(
        currentSemesterLectureList,
        departmentOption,
        searchTextEnter
      )
    : null; //SearchBar의 styled-components의 every로 인해 데이터 없을 시 null 할당

  /**Search 페이지의 강의 리스트 */
  function DisplayItemList() {
    const skeletonNumber = new Array(300).fill(null); //300개의 임의의 skeleton 로딩
    if (isLoading) {
      return skeletonNumber.map((skeleton, index) => (
        <div key={index}>{SearchCardSkeleton}</div>
      ));
    }
    const filteredLectureList = filterLectureList(
      lectureList,
      departmentOption,
      searchTextEnter
    );

    const currentSemesterLectureList =
      filterLectureByYearSemester(filteredLectureList);

    if (
      filteredCurrentLectureList === null ||
      filteredCurrentLectureList === undefined
    ) {
      return null;
    }

    return filteredCurrentLectureList.map((lecture: lectureInfo) => {
      const professorNames = concatProfessorNames(lecture.LectureSection);

      return (
        <StyledLink key={`${lecture.id}`} to={`/evaluation/${lecture.id}`}>
          <SearchCard
            subjectCode={lecture.LectureCode}
            professorName={professorNames}
            subjectName={lecture.name}
          />
        </StyledLink> // 강의평가 페이지로 이동
      );
    });
  }

  return (
    <>
      <SearchBar
        data={filteredCurrentLectureList}
        setSearchText={setSearchText}
        searchText={searchText}
        enterSearchText={enterSearchText}
        searchTextEnter={searchTextEnter}
        clearSearchText={clearSearchText}
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
