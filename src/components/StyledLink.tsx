import { Link } from "react-router-dom";
import styled from "styled-components";

/**
 * Link에 있는 기본 밑줄 효과를 제거한 버전의 Link 컴포넌트입니다.
 */
export const StyledLink = styled(Link)`
  text-decoration: none; // 밑줄 효과 제거
  color: #000; // 링크 텍스트 색상 지정 (원하는 색상으로 변경)
`;
