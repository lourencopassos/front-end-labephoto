import React, { useState } from "react";
import { Modal, Tag } from "antd";
import { ModalContainer, ModalInformation, ModalPhoto } from "./style";

function PhotoDetailModal(props) {
  const [tags, setTags] = useState(["Fofo", "Gatinhos"]);
  return (
    <Modal
      centered
      visible={props.visible}
      width={800}
      footer
      onCancel={props.onCancel}
    >
      <ModalContainer>
        <ModalPhoto>
          <img src="https://filmdaily.co/wp-content/uploads/2020/04/cute-cat-videos-lede-1300x882.jpg" />
        </ModalPhoto>
        <ModalInformation>
          <p>Autor</p>
          <p>Coleção da qual faz parte</p>
          <p>Legenda</p>
          <p>Data</p>
          <div>
            {tags.map((tag) => {
              return <Tag>{tag}</Tag>;
            })}
          </div>
        </ModalInformation>
      </ModalContainer>
    </Modal>
  );
}

export default PhotoDetailModal;
