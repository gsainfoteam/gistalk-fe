import { useState, KeyboardEvent } from "react";
import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { departmentOptionAtom, sortOptionAtom } from "@/store";
import { theme } from "@/style/theme";
import SearchCard from "@/pages/SearchPage/components/SearchCard";
import Filter_Svg from "@assets/svgs/tune.svg";
import CatBlankList_Svg from "@assets/svgs/catBlankList.svg";
import { lectureInfoWithProf } from "@/Interfaces/interfaces";
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
import { useSearchParams } from "react-router-dom";

export function SearchPage() {
  const [searchTextParams, setSearchTextParams] = useSearchParams();
  const query = searchTextParams.get("keyword") ?? ""; // test

  const [sortOpen, setSortOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const [sortStd, setSortStd] = useAtom(sortOptionAtom);
  const departmentOption = useAtom(departmentOptionAtom)[0];

  const [searchText, setSearchText] = useState(query); //search bar에 들어가는 단어
  const [searchTextEnter, setSearchTextEnter] = useState(query); // 엔터를 눌러서 검색 기준이 되는 단어

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["getEvaluationList"],
    queryFn: getLectureList,
  });

  const { data: lectureList } = { ...data };

  /**검색바에 입력된 글자가 Enter를 눌러야 SearchList에 적용될 수 있도록 하는 enterSearchText*/
  const enterSearchText = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setSearchTextEnter(searchText);
    }
  };

  /**Search 페이지의 강의 리스트 */
  function DisplayItemList() {
    if (isLoading) {
      return null;
    }
    const filteredLectureList = filterLectureList(
      lectureList,
      departmentOption,
      searchTextEnter
    );

    if (filteredLectureList === null || filteredLectureList === undefined) {
      return null;
    }

    return filteredLectureList.map((item: lectureInfoWithProf) => {
      const professorNames = item.LectureProfessor.map(
        (prof) => prof.professor.name
      ).join(", ");

      return (
        <StyledLink key={item.id} to={`/${item.id}/evaluation`}>
          <SearchCard
            subjectCode={item.LectureCode}
            professorName={professorNames}
            subjectName={item.lectureName}
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
        setSearchTextEnter={setSearchTextEnter}
        enterSearchText={enterSearchText}
        searchTextEnter={searchTextEnter}
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
        {!isLoading && DisplayItemList()}
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
