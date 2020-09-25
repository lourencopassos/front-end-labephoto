import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin } from "antd";
import {
  PageContent,
  PageHeadline,
  LoadingContainer,
  PageBody,
} from "./style.js";
import ImageMiniature from "../../components/ImageMiniature/ImageMiniature";
import Header from "../../components/Header/Header";
import PhotoDetailModal from "../../components/PhotoDetailModal/PhotoDetailModal.js";
import { LoadingOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
const { Title } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

function HomePage(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const imagesRender = photos ? (
    <div>
      <ImageMiniature />
    </div>
  ) : (
    <LoadingContainer>
      <p>Você ainda não tem fotos!</p>
    </LoadingContainer>
  );

  const loadingRender = loading ? (
    <LoadingContainer>
      <Spin indicator={antIcon} />
    </LoadingContainer>
  ) : (
    imagesRender
  );

  return (
    <PageContent>
      <Header />
      <PageHeadline>
        <Title>As melhores fotos da internet estão aqui!</Title>
      </PageHeadline>
      <PageBody> {loadingRender}</PageBody>

      <PhotoDetailModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </PageContent>
  );
}

export default HomePage;
