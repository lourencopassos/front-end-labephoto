import React from "react";
import { Background, FormContainer, SignupContainer } from "./style";
import { Form, Input, Button } from "antd";
import logo from "../../assets/img/labephoto2.png";
import { useHistory, Link } from "react-router-dom";

function LoginPage(props) {
  const tailLayout = {
    wrapperCol: {
      offset: 10,
      span: 16,
    },
  };

  const history = useHistory();

  const login = () => {
    history.replace("/home");
  };

  const onFinish = (values) => {
    login();
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
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
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
