import styled from "styled-components";
import { theme } from "../style/theme";
import Checked_Svg from "../assets/svgs/doneBold.svg";

interface IProps {
  text: string;
  color: string;
  isChecked: boolean;
}

const IconFrame = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  p {
    color: #000000;
    font-family: NSBold;
    font-size: 14px;
  }
`;

const CheckMark = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: #2ecc71;
  top: 0;
  right: 0;
`;

const CheckedSvg = styled(theme.universalComponent.SvgIcon)`
  position: relative;
  top:-1px;
`;

/** 임시 분과 아이콘 (text는 아이콘 안에 들어갈 텍스트 두 글자, color은 아이콘 색깔) */
export default function TempIcon({ text, color, isChecked }: IProps) {
  return (
    <>
      <IconFrame color={color}>
        <p>{text}</p>
        {isChecked && (
          <CheckMark>
            <CheckedSvg size={15} src={Checked_Svg}></CheckedSvg>
          </CheckMark>
        )}
      </IconFrame>
    </>
  );
}

TempIcon.defaultProps = {
  color: "#FFCF23",
};
