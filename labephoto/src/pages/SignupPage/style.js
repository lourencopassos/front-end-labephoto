import styled from "styled-components";

export const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0099ff;
`;

export const SignupForm = styled.div`
  border-radius: 16px;
  background-color: whitesmoke;
  height: 60%;
  width: 50%;
`;

export const FormHeader = styled.div`
  margin: 16px 0;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 30%;
  }
`;

export const FormContainer = styled.div`
  width: 80%;
`;

export const FormRow = styled.div``;

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;

  p {
    font-size: 12px;
  }
`;
