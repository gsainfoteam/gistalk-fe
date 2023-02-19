import styled from "styled-components";
import {theme} from "@/style/theme";
import {DescDiv, InnerCenter, QuestionDiv} from "@/components/WriteEvComponents";


const SearchWrap = styled.div<{ borderColor: string; width: string }>`
  width: ${(props) => props.width};
  display: flex;
  flex-direction: column;
  height: max-content;
  margin: 0 auto;

  border-radius: 5px;
  border: 2px solid ${(props) => props.borderColor};
`;

const SearchInputWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchInput = styled.input<{
    color: string;
    bgColor: string;
    width: string;
    btnWidth: string;
}>`
  width: calc(${(props) => props.width} - ${(props) => props.btnWidth});
  background-color: ${(props) => props.bgColor};
  height: ${(props) => props.btnWidth};
  padding-left: 15px;
  font-family: NSRegular;
  border: none;
  text-align: left;
  display: block;

  //폰트 크기
  font-size: 16px;
  color: ${(props) => props.color};
`;

const SearchBtnWrap = styled.div<{ bgColor: string; btnWidth: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.btnWidth};
  width: ${(props) => props.btnWidth};
  background-color: ${(props) => props.bgColor};
`;

/**검색어 입력시 검색창과 자동완성된 검색어를 분리하는 가로선 */
const SearchHorizontalLine = styled.hr<{
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

const SearchSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;
const CancelSvg = styled(theme.universalComponent.SvgIcon)`
  display: block;
  cursor: pointer;
`;

const NorthWestSvg = styled(theme.universalComponent.SvgIcon)``;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: NSRegular;
  padding: 4px 16px;
  color: ${theme.colors.primaryText};
`;

const MatchingText = styled.span<{ color: string }>`
  font-family: NSBold;
  color: ${(props) => props.color};
`;

export default function Page1() {
    return <InnerCenter>
        <div>
            <QuestionDiv marginTop={0}>
                강의를 <span>검색</span>해 주세요.
            </QuestionDiv>
            <DescDiv marginTop={0}>
                강의평을 작성하고자 하는 강의를 검색해 주세요.
            </DescDiv>
        </div>

    </InnerCenter>
}