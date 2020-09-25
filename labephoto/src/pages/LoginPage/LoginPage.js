import React, { useState } from "react";
import {
  Background,
  FormContainer,
  SignupContainer,
  CustomAlert,
} from "./style";
import { Form, Input, Button } from "antd";
import logo from "../../assets/img/labephoto2.png";
import { useHistory, Link } from "react-router-dom";
import { login } from "../../utils/api.js";

function LoginPage(props) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };

  const history = useHistory();

  const renderError = errorAlert && (
    <CustomAlert
      message="Erro"
      description="Confira os dados"
      type="error"
      closable
    />
  );

  const onFinish = async (values) => {
    setButtonLoading(true);
    const response = await login(values);
    if (!response) {
      setButtonLoading(false);
      setErrorAlert(true);
    } else {
      localStorage.setItem("token", response.token);
      history.replace("/home");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Background>
      <FormContainer>
        <img src={logo} alt="Logo" />
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Por favor preencha o seu usuário!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor preencha a sua senha!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          {renderError}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={buttonLoading}>
              Acessar
            </Button>
          </Form.Item>
          <SignupContainer>
            <p>
              Se você ainda não tem conta, clique <Link to="/signup">aqui</Link>
            </p>
          </SignupContainer>
        </Form>
      </FormContainer>
    </Background>
  );
}

export default LoginPage;
