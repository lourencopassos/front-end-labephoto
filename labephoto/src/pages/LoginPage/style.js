import styled from "styled-components";
import { Alert } from "antd";

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0099ff;
`;

export const CustomAlert = styled(Alert)`
  margin-bottom: 15px;
`;

export const FormContainer = styled.div`
  height: 60%;
  width: 50%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;

  img {
    margin-bottom: 40px;
  }

  form {
    width: 60%;

    button {
      align-self: center;
    }
  }
`;

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;

  p {
    font-size: 12px;
  }
`;
