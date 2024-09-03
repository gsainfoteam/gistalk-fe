import { theme } from "@/style/theme";
import styled from "styled-components";

/** 마이페이지 버튼 있는 부분 */
export const MyBtn = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
  margin: 0 10px;
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
  margin-right: 5%;
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
