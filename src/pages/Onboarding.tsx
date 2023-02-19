import styled from "styled-components";
import { theme } from "@/style/theme";

import Onboarding1_Svg from "@/assets/svgs/onboarding_1.svg";
import Onboarding2_Svg from "@/assets/svgs/onboarding_2.svg";
import Onboarding3_Svg from "@/assets/svgs/onboarding_3.svg";
import Onboarding4_Svg from "@/assets/svgs/onboarding_4.svg";

import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/a11y";

const OnboardingSvg = styled(theme.universalComponent.SvgIcon)``;

export default function Onboarding() {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y]}
      scrollbar={{ draggable: true }}
      pagination={{ clickable: true }}
      spaceBetween={5}
      slidesPerView={1}
      allowTouchMove
    >
      <SwiperSlide>
        <OnboardingSvg size={400} src={Onboarding1_Svg} />
        Slide 1
      </SwiperSlide>
      <SwiperSlide>
        <OnboardingSvg size={400} src={Onboarding2_Svg} />
        Slide 2
      </SwiperSlide>
      <SwiperSlide>
        <OnboardingSvg size={400} src={Onboarding3_Svg} />
        Slide 3
      </SwiperSlide>
      <SwiperSlide>
        <OnboardingSvg size={400} src={Onboarding4_Svg} />
        Slide 4
      </SwiperSlide>
    </Swiper>
  );
}
