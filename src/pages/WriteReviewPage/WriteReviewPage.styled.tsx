import { theme } from "@/style/theme";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const Wrapper = styled.div`
  margin: 0 20px;
`;

export const Button = styled.button`
  padding: 15px;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

export const Form = styled.form`
  margin-top: 1rem;
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  font-family: NSBold;
`;

export const Description = styled.p`
  margin-bottom: 10px;
  font-size: 14px;
`;

export const Select = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const LeftLabel = styled.span`
  margin-right: 10px;
  font-size: 14px;
  color: ${theme.colors.secondaryText};
`;

export const RightLabel = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: ${theme.colors.secondaryText};
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Star = styled.span`
  cursor: pointer;
  color: gold;
  margin: 0 8px;
  font-size: 32px;
`;

export const TextArea = styled(TextareaAutosize)`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 100px;

  //placehoder 스타일링
  &::placeholder {
    font-size: 14px;
    color: #ddd;
  }
`;

export const RadioCheckText = styled.span`
  font-size: 14px;
  width: 110px;
  height: 35px;
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${theme.colors.secondaryText};
  background: ${theme.colors.inputBg};
`;

export const RadioButton = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }
  &:checked + ${RadioCheckText} {
    background: ${theme.colors.primary};
    color: #fff;
  }
  display: none;
`;

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
