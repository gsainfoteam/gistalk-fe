import { theme } from "@/style/theme";
import {
  CancelSvg,
  MatchingText,
  NorthWestSvg,
  SearchBtnWrap,
  SearchHorizontalLine,
  SearchInput,
  SearchInputWrap,
  SearchItem,
  SearchSvg,
  SearchWrap,
} from "../SearchPage.styled";
import { Link } from "react-router-dom";
import NorthWest_Svg from "@assets/svgs/northWest.svg";
import { tempClassList } from "../SearchPage.const";
import { ISearchCard } from "@/Interfaces/interfaces";
import Cancel_Svg from "@assets/svgs/cancel_Black.svg";
import Search_Svg from "@assets/svgs/search.svg";

/** 임시 아이템 리스트 */
const TempSearchList: ISearchCard[] = tempClassList.sort(
  (a, b) => b.subjectScoreNum - a.subjectScoreNum
);

export function SearchBar({
  setSearchText,
  searchText,
  setSearchTextEnter,
  enterSearchText,
  searchTextEnter,
}: any) {
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

  return (
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
  );
}
