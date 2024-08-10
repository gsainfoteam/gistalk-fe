import { KeyboardEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearch = () => {
  const [searchTextParams, setSearchTextParams] = useSearchParams();
  const query = searchTextParams.get("keyword") ?? ""; // test

  const [searchText, setSearchText] = useState(query); //search bar에 들어가는 단어
  const [searchTextEnter, setSearchTextEnter] = useState(query); // 엔터를 눌러서 검색 기준이 되는 단어

  /**검색바에 입력된 글자가 Enter를 눌러야 SearchList에 적용될 수 있도록 하는 enterSearchText*/
  const enterSearchText = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      setSearchTextEnter(searchText);
    }
  };

  const clearSearchText = () => {
    setSearchText("");
    setSearchTextEnter("");
    setSearchTextParams("");
  };

  return {
    searchText,
    setSearchText,
    searchTextEnter,
    setSearchTextEnter,
    enterSearchText,
    clearSearchText,
  };
};
