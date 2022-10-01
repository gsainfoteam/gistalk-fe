import styled from "styled-components";
import SearchCard from "./SearchCard";
import LogoSrc from "../assets/TEMPLOGO_GISTALK.png";
import SearchSvg from "../assets/svgs/search_black.svg";

const LogoImg = styled.img`
  width: 300px;
  margin-top: 100px;
  margin-bottom: 10px;
`;

const SearchWrap = styled.div`
  width: 85vw;
  display: flex;
  height: 45px;
  margin: 100px auto 0 auto;
`;

const SearchInput = styled.input`
  width: calc(85vw - 60px);
  background-color: #f3f3f3;
  height: 45px;
  padding-left: 15px;
  font-family: NSRegular;
  font-size: 17px;
  border: none;
  text-align: left;
  display: block;
  border-radius: 5px 0 0 5px;
`;

const SearchBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 45px;
  background-color: #f3f3f3;
  border-radius: 0 5px 5px 0;
`;

const SearchBtn = styled.img`
  height: 30px;
  width: 30px;
  display: block;
`;

export default function Search() {
  return (
    <>
      <SearchWrap>
        <SearchInput placeholder="강의명/교수명으로 검색" />
        <SearchBtnWrap>
          <SearchBtn src={SearchSvg} />
        </SearchBtnWrap>
      </SearchWrap>
      <SearchCard />
    </>
  );
}
