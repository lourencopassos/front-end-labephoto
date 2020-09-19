import React, { useEffect, useState } from "react";
import { Layout, Typography, Modal } from "antd";
import { PageContent, PageHeadline } from "./style.js";
import ImageMiniature from "../../components/ImageMiniature/ImageMiniature";
import Header from "../../components/Header/Header";
import PhotoDetailModal from "../../components/PhotoDetailModal/PhotoDetailModal.js";

const { Content, Footer } = Layout;
const { Title } = Typography;

function HomePage(props) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <PageContent>
      <Header />
      <PageHeadline>
        <Title>As melhores fotos da internet estão aqui!</Title>
      </PageHeadline>
      <div>
        <ImageMiniature />
      </div>
      <PhotoDetailModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </PageContent>
  );
}

export default HomePage;
