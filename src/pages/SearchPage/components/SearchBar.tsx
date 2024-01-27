import { theme } from "@/style/theme";
import { MatchingText, NorthWestSvg, SearchItem } from "../SearchPage.styled";
import { Link } from "react-router-dom";
import NorthWest_Svg from "@assets/svgs/northWest.svg";
import { tempClassList } from "../SearchPage.const";
import { ISearchCard } from "@/Interfaces/interfaces";
import Cancel_Svg from "@assets/svgs/cancel_Black.svg";
import Search_Svg from "@assets/svgs/search.svg";
import styled from "styled-components";

/** 임시 아이템 리스트 */
const TempSearchList: ISearchCard[] = tempClassList.sort(
  (a, b) => b.subjectScoreNum - a.subjectScoreNum
);

export const SearchSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;
export const CancelSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;

export const SearchBtnWrap = styled.div<{ bgColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${(props) => props.bgColor};
`;

/**검색어 입력시 검색창과 자동완성된 검색어를 분리하는 가로선 */
export const SearchHorizontalLine = styled.hr<{
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

export const SearchWrap = styled.div<{ borderColor: string }>`
  width: 90%;
  display: flex;
  flex-direction: column;
  height: max-content;
  margin: 0 auto;
  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor};
`;

export const SearchInputWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export const SearchInput = styled.input<{
  color: string;
  bgColor: string;
}>`
  width: 90%;
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

export function SearchBar({
  setSearchText,
  searchText,
  setSearchTextEnter,
  enterSearchText,
  searchTextEnter,
}: {
  setSearchText: any;
  searchText: string;
  setSearchTextEnter: any;
  enterSearchText: any;
  searchTextEnter: string;
}) {
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
