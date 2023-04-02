import Header from "@/components/Header";
import {useState} from "react";
import Page1 from "@/components/WriteEVPages/Page1";
import Err404 from "@/pages/Err404";
import styled from "styled-components";
import {theme} from "@/style/theme";
import done_Svg from "../assets/svgs/doneBold.svg";
import arrow_Svg from "../assets/svgs/writeEvArrow.svg";
import arrowP_Svg from "../assets/svgs/writeEvArrowPrimary.svg";

interface IProps {
    page:number
}

const Wrap = styled.div`
  overflow-x: hidden;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: calc((100vw - 291px) / 2);
`

const Circle = styled.div`
  min-width: 16px;
  height: 16px;
  border-radius: 12px;
  border: ${theme.colors.primary} 4px solid;
  background-color: ${theme.colors.white};
  z-index: 200;
`

const Line = styled.div`
  min-width: 65px;
  border-top: ${theme.colors.primary} 4px solid;
  border-radius: 0;
  z-index: 200;
`

const CheckedCircle = styled(theme.universalComponent.SvgIcon)`
  border-radius: 12px;
  border: ${theme.colors.primary} 2px solid;
  background-color: ${theme.colors.primary};
  z-index: 200;
`

const SelectCircle = styled(theme.universalComponent.DivTextContainer)<{ times:number }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left:calc((100vw - 291px) / 2 - 8px + ${props => props.times} * 89px);
  div:nth-child(1) {
    position: absolute;
    font-family: NSBold;
    width:200px;
    transform:translateY(-30px);
    text-align: center;
  }
  
  div:nth-child(2) {
    background-color: ${theme.colors.primaryLight};
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  z-index: 100;
`

const NavBtnNav = styled.div`
  display: flex;
  margin: 20px auto 30px auto;
  justify-content: center;
`

const NavBtn = styled.div<{ active:boolean, left:boolean }>`
  height: 40px;
  width: 90px;
  box-shadow: 0 0 0 1.5px ${props => props.active ? `${theme.colors.primary}` : `${theme.colors.secondaryText}`} inset;
  transform: ${props => props.left ? "" : "rotate(180deg)"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Arrow = styled.img``

const SubmitBtn = styled.div<{ active:boolean }>`
  height: 40px;
  width: 110px;
  background-color: ${props => props.active ? `${theme.colors.primary}` : `${theme.colors.inputBg}`};
  color: ${props => props.active ? `${theme.colors.white}` : `${theme.colors.secondaryText}`};
  line-height: 40px;
  font-size: 14px;
  font-family: NSBold;
  text-align: center;
  margin:0 5px;
  cursor: pointer;
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
`

function ProgressBar({page}:IProps) {
    return <Flex>
        <SelectCircle fontSize={10} color={theme.colors.secondary} times={0}>
            <div>강의 기본정보</div>
            <div></div>
        </SelectCircle>
        <Circle></Circle>
        <Line></Line>
        <Circle></Circle>
        <Line></Line>
        <Circle></Circle>
        <Line></Line>
        <CheckedCircle size={20} src={done_Svg}></CheckedCircle>
        <Line></Line>
        <Circle></Circle>
        <Line></Line>
        <Circle></Circle>
    </Flex>
}

function PageManager({page}:IProps) {
    switch (page){
        case 1:
            return <Page1></Page1>
        default:
            return <Err404></Err404>
    }
}

export default function WriteEV() {
    const [page, setPage] = useState<number>(1);
    const [leftArrow, setLeftArrow] = useState<boolean>(false);
    const [rightArrow, setRightArrow] = useState<boolean>(true);

    function ArrowActive(active : boolean) {
        return active ? arrowP_Svg : arrow_Svg
    }

    return <Wrap>
        <Header text={"강의평 작성"}></Header>
        <PageManager page={page}></PageManager>
        <Footer>
            <ProgressBar page={page}></ProgressBar>
            <NavBtnNav>
                <NavBtn active={false} left={true}><Arrow src={ArrowActive(leftArrow)}></Arrow></NavBtn>
                <SubmitBtn active={false}>제출</SubmitBtn>
                <NavBtn active={true} left={false}><Arrow src={ArrowActive(rightArrow)}></Arrow></NavBtn>
            </NavBtnNav>
        </Footer>
    </Wrap>
}