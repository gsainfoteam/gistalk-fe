/** 페이지 최상단의 로고, 마이페이지 버튼 있는 부분 */
import { ISortOption } from "@/Interfaces/interfaces";
import { theme } from "@/style/theme";
import styled from "styled-components";

/** 마이페이지 버튼 있는 부분 */
export const MyBtn = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  margin: 0 10px;
`;

export const SearchWrap = styled.div<{ borderColor: string }>`
  width: 85vw;
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
  width: calc(85vw - 60px);
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

export const SearchSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;
export const CancelSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;

export const NorthWestSvg = styled(theme.universalComponent.SvgIcon)``;

export const FilterSvg = styled(theme.universalComponent.SvgIcon)``;
export const OrderSvg = styled(theme.universalComponent.SvgIcon)`
  transform: rotate(90deg);
`;

export const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: NSRegular;
  padding: 4px 16px;
  color: ${theme.colors.primaryText};
`;

export const MatchingText = styled.span<{ color: string }>`
  font-family: NSBold;
  color: ${(props) => props.color};
`;

/** 검색 옵션에서 분과/정렬 선택하는 드롭다운 버튼 */
export const SearchDrop = styled.div<{
  color: string;
  afterColor: string;
  option: number;
}>`
  width: 78vw;
  margin: 18px 4vw 0 4vw;
  transition: 0.2s;

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.color};

  div:nth-child(1) {
    font-family: NSRegular;
    font-size: 15px;
    display: flex;
    align-items: center;

    span {
      margin-left: 12px;
    }
  }

  div:nth-child(2) {
    font-family: NSBold;
    font-size: 18px;
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
      color: ${(props) => {
        if (props.option === 0) return props.color;
        else return props.afterColor;
      }};
    }
  }
`;

export const OptionBtnWrap = styled(theme.universalComponent.DivTextContainer)`
  display: flex;
  align-items: center;

  p {
    margin-right: 5px;
  }

  margin-top: 10px;
  margin-right: 7.5vw;
  justify-content: right;
  font-family: NSRegular;

  div {
    display: flex;
    align-items: center;
    img {
      position: relative;
      top: 1px;
    }
  }

  div:nth-child(2) {
    margin: 0 7px;
    height: 20px;
    border-left: 1.5px solid ${(props) => props.color};
    position: relative;
    top: 1px;
  }
`;

/** SearchCard 나열하는거 감싸는 div. 검색했을 때 리스트 형태로 나오는 걸 감싸는 부분 */
export const ItemList = styled.div`
  max-width: 85vw;
  margin: 15px auto 0 auto;
`;

/** Search 리스트가 비었을 떄 나오는 냥이 일러스트, 문구 Wrap */
export const BlankWrap = styled.div`
  margin: 70px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BlankSvg = styled(theme.universalComponent.SvgIcon)``;
export const BlankText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

/** 정렬을 어떻게 할지 선택할 수 있는 리스트: std 기준으로 sort*/
export const sortList: { id: number; content: string; std: ISortOption }[] = [
  { id: 1, content: "수업 쉬운 순", std: "수업 난이도" },
  { id: 2, content: "유익한 순", std: "유익함" },
  { id: 3, content: "성적 만족도 순", std: "성적 만족도" },
  { id: 4, content: "과제 적은 순", std: "과제량" },
  { id: 5, content: "수업 재밌는 순", std: "재미 / 흥미" },
  { id: 6, content: "강의력 좋은 순", std: "강의력" },
];
