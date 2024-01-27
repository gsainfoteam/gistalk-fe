import { theme } from "@/style/theme";
import styled from "styled-components";
import { useState } from "react";

import Cancel_Svg from "@assets/svgs/cancel_Black.svg";
import Search_Svg from "@assets/svgs/search.svg";

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

export const SearchWrap = styled.div<{ borderColor: string }>`
  display: flex;
  flex-direction: column;
  height: max-content;
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

export function MockSearchBar() {
  const [searchText, setSearchText] = useState("");

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
          }}
        >
          <CancelSvg size={25} src={Cancel_Svg} />
        </SearchBtnWrap>
      );
    }
  }

  return (
    <SearchWrap borderColor={theme.colors.inputBorder}>
      <SearchInputWrap>
        <SearchInput
          placeholder="강의명으로 검색"
          color={theme.colors.primaryText}
          bgColor={theme.colors.white}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          value={searchText}
        />
        {ResponsiveSvg()}
      </SearchInputWrap>
    </SearchWrap>
  );
}
