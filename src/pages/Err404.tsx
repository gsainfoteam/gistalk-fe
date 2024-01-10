import { theme } from "@/style/theme";
import styled from "styled-components";
import Cat404_Svg from "@/assets/svgs/cat404.svg";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
`;

/** Search 리스트가 비었을 떄 나오는 냥이 일러스트, 문구 Wrap */
const Err404Wrap = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Err404Svg = styled(theme.universalComponent.SvgIcon)``;
const Err404Text = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

export default function Err404() {
  return (
    <Wrap>
      <Err404Wrap>
        <Err404Svg size={160} src={Cat404_Svg} />
        <Err404Text fontSize={16} color={theme.colors.secondaryText}>
          요청하신 페이지를 찾을 수 없습니다.
        </Err404Text>
        <Link to="/"> 메인 화면으로 돌아가기 </Link>
      </Err404Wrap>
    </Wrap>
  );
}
