import styled from "styled-components";

export const MiniatureCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 50px;
`;

export const MiniatureCard = styled.div`
  height: 200px;
  border-radius: 10px;
  border: 1px solid #0099ff;
  width: 150px;
  display: flex;
  margin: 16px 16px;
  flex-direction: column;

  div:nth-of-type(1) {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    height: 100%;
  }

  div:nth-of-type(2) {
    p {
      margin-top: 8px;
    }
  }

  div:nth-of-type(3) {
    display: flex;
    align-items: center;
    background-color: red;
  }

  img {
    object-fit: cover;
    border-radius: 50%;
    height: 100px;
    width: 100px;
  }
`;
