import styled from "styled-components";
import { theme } from "@/style/theme";

import Onboarding1_Svg from "@/assets/svgs/onboarding_1.svg";
import Onboarding2_Svg from "@/assets/svgs/onboarding_2.svg";
import Onboarding3_Svg from "@/assets/svgs/onboarding_3.svg";
import Onboarding4_Svg from "@/assets/svgs/onboarding_4.svg";

import Content from "@/components/Content";
import { Navigation, A11y, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
`

const OnboardingSvg = styled(theme.universalComponent.SvgIcon)``;

const StyledSwiper = styled(Swiper)`
  --swiper-pagination-bullet-size: 12px;
  --swiper-pagination-color: ${theme.colors.primary};
  --swiper-pagination-bullet-inactive-color: ${theme.colors.secondaryText};
  margin-top: 23vh;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  height: calc(100vh - 25vh - 440px);
`;

/** '강의평 쓰러가기' 버튼 */
const GoWriteBtn = styled(theme.universalComponent.DivTextContainer)<{
  bgColor: string;
}>`
  text-align: center;
  width: 340px;
  background-color: ${(props) => props.bgColor};
  height: 50px;
  line-height: 50px;
  font-family: NSBold;
  position: absolute;
  bottom: 20px;
  left: calc(50vw - 170px);
`;

export default function Onboarding() {
  return (
    <Wrap>
      <StyledSwiper
        modules={[Navigation, A11y, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        allowTouchMove
      >
        <StyledSwiperSlide>
          <div style={{
            "height":"300px",
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
          }}>
            <OnboardingSvg size={280} src={Onboarding1_Svg} />
          </div>
          <Content
            fontSize={16}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            지스트 강의평가의 모든 것
          </Content>
          <Content
            fontSize={24}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            |지스톡|에서 시작하세요
          </Content>
          <WhiteBox />
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <OnboardingSvg size={300} src={Onboarding2_Svg} />
          <Content
            fontSize={16}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            들은 강의를 공유하고
          </Content>
          <Content
            fontSize={24}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            다른 학생들과 |공유|하세요
          </Content>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <OnboardingSvg size={300} src={Onboarding3_Svg} />
          <Content
            fontSize={16}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            강의평가를 작성하여 얻은 |포인트|로
          </Content>
          <Content
            fontSize={24}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            |강의 꿀팁|을 열람하세요
          </Content>
        </StyledSwiperSlide>
        <StyledSwiperSlide>
          <OnboardingSvg size={300} src={Onboarding4_Svg} />
          <Content
            fontSize={16}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            먼저, 강의평을 보려면
          </Content>
          <Content
            fontSize={24}
            color={theme.colors.primaryText}
            fontFamily={"NSBold"}
          >
            |3개|의 강의평가를 작성하세요
          </Content>
        </StyledSwiperSlide>
      </StyledSwiper>
      <GoWriteBtn
        fontSize={16}
        bgColor={theme.colors.primary}
        color={theme.colors.white}
        onClick={() => {
          window.open(
            "https://gistory-idp-fe.pages.dev?client_id=gistalk2023&redirect_uri=gistalk.gistory.me"
          );
        }}
      >
        로그인
      </GoWriteBtn>
    </Wrap>
  );
}
