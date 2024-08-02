import { theme } from "@/style/theme";
import { FaPen } from "react-icons/fa6";
import styled from "styled-components";

const FloatingButton = styled.div`
  position: fixed;
  left: 50%;
  bottom: 1%;
  transform: translate(-50%, -50%);
  background-color: ${theme.colors.inputBg};
  border-color: ${theme.colors.inputBorder};
  border-width: 2px;
  border-radius: 2em;
  border-style: solid;
  padding: 0.6em 1.2em;
`;

const Text = styled.span`
  margin-left: 0.5em;
`;

export default function WriteReviewButton() {
  return (
    <FloatingButton>
      <FaPen />
      <Text>강의평 작성하기</Text>
    </FloatingButton>
  );
}
