import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  show: boolean;
  onClose: () => void;
}

const ModalContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 300px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalActions = styled.div`
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #d3d3d3;
  color: black;
`;

const ConfirmButton = styled.button`
  padding: 8px 16px;
  margin: 0%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ff6565;
  color: white;
`;

export const LoginModal = ({ show, onClose }: IProps) => {
  const navigate = useNavigate();

  function onLogin() {
    onClose();
    navigate("/login", { replace: true });
  }

  if (!show) {
    return null;
  }

  return (
    <ModalContainer>
      <p>
        로그인이 필요한 서비스 입니다.
        <br />
        로그인 하시겠습니까?
      </p>
      <ModalActions>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <ConfirmButton onClick={onLogin}>확인</ConfirmButton>
      </ModalActions>
    </ModalContainer>
  );
};

export default LoginModal;
