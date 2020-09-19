import styled from "styled-components";
import { Modal } from "antd";

export const ModalContainer = styled.div`
  display: flex;
`;

export const ModalInformation = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalPhoto = styled.div`
  width: 50%;
  object-fit: cover;

  img {
    width: 100%;
  }
`;
