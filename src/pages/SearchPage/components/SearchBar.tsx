import { Dispatch, useEffect, useRef, KeyboardEvent } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { lectureInfo } from "@/Interfaces/interfaces";
import { theme } from "@/style/theme";
import Cancel_Svg from "@assets/svgs/cancel_Black.svg";
import NorthWest_Svg from "@assets/svgs/northWest.svg";
import Search_Svg from "@assets/svgs/search.svg";
import { MatchingText, NorthWestSvg, SearchItem } from "../SearchPage.styled";
import { concatProfessorNames } from "@/utils";

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
  //미디어쿼리 적용
  @media (max-width: 480px) {
    width: 90%; // 480px 이하일 때 가로선 길이 조정
  }
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

/**
 * 검색바 컴포넌트, hooks에 useSearch를 사용하면 필요한 훅을 사용할 수 있음.
 * @param data: 강의 정보 데이터
 * @param setSearchText: 검색어를 설정하는 함수
 * @param searchText: 검색어
 * @param searchTextEnter: 엔터를 눌렀을 때 검색어
 * @param clearSearchText: 검색어를 초기화하는 함수
 * @param enterSearchText: 검색어 입력시 엔터키를 누르면 검색하는 함수
 * @param isSearchWrite: 검색창이 평가쓰기인지 검색인지 구분하는 변수, 리다이렉션 경로가 달라짐.
 */

export function SearchBar({
  data,
  setSearchText,
  searchText,
  searchTextEnter,
  clearSearchText,
  enterSearchText,
  isSearchWrite = false,
}: {
  data: lectureInfo[];
  setSearchText: Dispatch<React.SetStateAction<string>>;
  searchText: string;
  clearSearchText: () => void;
  enterSearchText: (e: KeyboardEvent<HTMLInputElement>) => void;
  searchTextEnter: string;
  isSearchWrite: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  /**메인페이지에서 MockSearchBar 클릭해서 넘어올 경우 focus */
  useEffect(() => {
    if (location.state != undefined && location.state.focus) {
      inputRef.current?.focus();
    }
  }, [location]);

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
        <SearchBtnWrap bgColor={theme.colors.white} onClick={clearSearchText}>
          <CancelSvg size={25} src={Cancel_Svg} />
        </SearchBtnWrap>
      );
    }
  }

  /**검색바 하단에 출력되는 강의명 리스트 */
  const SearchItemList = () => {
    if (data === null || data === undefined) {
      //TODO: 위에 styled-component의 every 구문 떄문에 null array로 리턴함... 에러처리 나중에 한번에 고쳐야 함(현재 배열의 모든 요소가 null인 경우를 예외로 처리하는 코드가 다수 있음)
      return [null];
    }
    return data.map((item) => {
      if (
        searchText != "" &&
        item.name.includes(searchText) &&
        searchTextEnter != searchText //엔터 쳤을 때는 아래에 나오는 검색 결과를 보도록 유도
      ) {
        //TODO: 원래는 prof 별로 강의를 하나씩 할당하려고 했는데, 현재 prof별로 강의 id가 다르게 배정되지 않아 한 번에 병함
        const professorNames = concatProfessorNames(item.lectureSection);

        return (
          <Link
            key={item.id}
            to={isSearchWrite ? `/write/${item.id}` : `/evaluation/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <SearchItem>
              <p>
                <span>{item.name.split(searchText)[0]}</span>
                <MatchingText color={theme.colors.primary}>
                  {searchText}
                </MatchingText>
                <span>{item.name.split(searchText)[1]}</span>
                <span>- {professorNames}</span>
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

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText((e.target as HTMLInputElement).value);
  };

  return (
    <SearchWrap borderColor={theme.colors.inputBorder}>
      <SearchInputWrap>
        <SearchInput
          placeholder="강의명으로 검색"
          color={theme.colors.primaryText}
          bgColor={theme.colors.white}
          onChange={handleSearchText}
          onKeyDown={(e) => enterSearchText(e)}
          value={searchText}
          ref={inputRef}
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
