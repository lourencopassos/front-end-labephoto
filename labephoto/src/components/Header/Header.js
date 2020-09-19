import React from "react";
import { Button } from "antd";
import { HeaderComponent } from "./style.js";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/labephoto2.png";

function Header(props) {
  const history = useHistory();
  const goToAddPhotoPage = () => {
    history.replace("/add-photo");
  };

  const goToHomePage = () => {
    history.replace("/home");
  };

  return (
    <HeaderComponent>
      <img src={logo} onClick={goToHomePage} />
      <Button type="primary" onClick={goToAddPhotoPage}>
        Adicionar novas fotos
      </Button>
    </HeaderComponent>
  );
}

export default Header;
