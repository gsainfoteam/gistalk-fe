import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333333;
  margin-bottom: 8px;
  font-weight: bold;
  font-family: "NSBold", sans-serif;
`;

const Message = styled.p`
  font-size: 1rem;
  color: #666666;
  margin-bottom: 20px;
  font-family: "NSMedium", sans-serif;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
  }
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;

  &:hover {
    background-color: #d1d1d1;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #ff6b6b;
  color: white;

  &:hover {
    background-color: #ff4c4c;
  }
`;

const unauthorizedPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <ModalContainer>
      <Title>로그인이 필요한 서비스입니다.</Title>
      <Message>로그인 하시겠습니까?</Message>
      <ModalActions>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
        <ConfirmButton onClick={handleLogin}>확인</ConfirmButton>
      </ModalActions>
    </ModalContainer>
  );
};

export default unauthorizedPage;
