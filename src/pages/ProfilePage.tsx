import Hexagon from "@/components/Hexagon";
import { theme } from "@/style/theme";
import Header from "@/components/Header";
import styled from "styled-components";
import Button from "@/components/Button";

const TitleWrap = styled.div<{ color: string }>`
  width: 87vw;
  display: flex;
  align-items: center;
  margin: 10px auto 0 auto;

  div:nth-child(1) {
    margin-right: 8px;
  }

  padding-bottom: 13px;
  border-bottom: ${(props) => props.color} 1.5px solid;
  border-radius: 0;
`;

/** 과목 이름과 코드를 감싸는 div. 과목과 이름이 같은 형태라서 재사용함 */
const SubjectTitle = styled(theme.universalComponent.DivTextContainer)`
  font-family: NSBold;
`;

const MyReviewsText = styled(theme.universalComponent.DivTextContainer)`
  width: 87vw;
  height: 42px;
  font-family: NSBold;
  border-radius: 0;
  margin: 20px auto 0 auto;
  text-align: center;
  line-height: 42px;
`;

/** Radar Chart에 들어갈 임시 데이터 */

export default function ProfilePage() {
  return (
    <>
      <Header text={"MY"}></Header>
      <TitleWrap color={theme.colors.grayStroke}>
        <SubjectTitle fontSize={20} color={theme.colors.primaryText}>
          ID: HongGilDong
        </SubjectTitle>
        <Button
          text="프로필 관리"
          onClick={() => {}}
          color={"white"}
          background={theme.colors.primary}
        />
      </TitleWrap>

      <>
        <MyReviewsText fontSize={18} color={theme.colors.primaryText}>
          · 내가 쓴 강의평 ·
        </MyReviewsText>
      </>
    </>
  );
}
