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

const Message = styled.div`
  font-size: 1rem;
  color: #666666;
  font-family: "NSMedium", sans-serif;
  margin-bottom: 20px;
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

function UnauthorizedPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <ModalContainer>
      <Title> 로그인이 필요한 서비스에요</Title>
      <Message>
        <p> GIST 이메일만 있으면 빠른 로그인이 가능해요!</p>
        <p> 로그인 하시겠어요? </p>
      </Message>
      <ModalActions>
        <CancelButton onClick={handleCancel}>뒤로가기</CancelButton>
        <ConfirmButton onClick={handleLogin}>로그인</ConfirmButton>
      </ModalActions>
    </ModalContainer>
  );
}

export default UnauthorizedPage;
