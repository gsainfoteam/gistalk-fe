import { theme } from "@/style/theme";
import styled from "styled-components";
import CatBlankList_Svg from "@/assets/svgs/catBlankList.svg";

/** Search 리스트가 비었을 떄 나오는 고양이 일러스트, 문구 Wrap */
const BlankWrap = styled.div`
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlankSvg = styled(theme.universalComponent.SvgIcon)``;
const BlankText = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

export function NoComment() {
    return(
        <BlankWrap>
          <BlankSvg size={120} src={CatBlankList_Svg} />
            <BlankText fontSize={14} color={theme.colors.secondaryText}>
              아직 한줄평이 없습니다. 첫 번째로 한줄평을 남겨보세요!
          </BlankText>
        </BlankWrap>
    );
}