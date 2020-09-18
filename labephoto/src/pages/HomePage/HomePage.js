import React from "react";
import { Layout, Typography } from "antd";
import { PageContent, PageHeadline } from "./style.js";
import ImageMiniature from "../../components/ImageMiniature/ImageMiniature";
import  Header  from "../../components/Header/Header";

const { Content, Footer } = Layout;
const { Title } = Typography;

function HomePage(props) {
  return (
    <PageContent>
      <Header />
      <PageHeadline>
        <Title>As melhores fotos da internet estão aqui!</Title>
      </PageHeadline>
      <div>
        <ImageMiniature />
      </div>
    </PageContent>
  );
}

export default HomePage;
