import React from "react";
import { Button } from "antd";
import { HeaderComponent } from "./style.js";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/labephoto2.png";

function AddPhotoHeader(props) {

  const history = useHistory();

  const goToHomePage= () => {
    history.replace("/home");
  };

  return (
    <HeaderComponent>
      <img src={logo} onClick={goToHomePage} />
    </HeaderComponent>
  );
}

export default AddPhotoHeader;
