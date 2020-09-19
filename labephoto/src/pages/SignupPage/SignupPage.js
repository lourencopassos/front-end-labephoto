import React from "react";
import {
  Background,
  SignupForm,
  FormContainer,
  FormHeader,
  FormRow,
  SignupContainer,
} from "./style";
import { Form, Input, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import logo from "../../assets/img/labephoto2.png";
import { Link } from "react-router-dom";

function SignupPage(props) {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  return (
    <Background>
      <SignupForm>
        <FormHeader>
          <img src={logo} />
        </FormHeader>
        <FormContainer>
          <Form {...formItemLayout} name="signup" form={form}>
            <FormRow>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Email inválido",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Senha"
                rules={[
                  {
                    required: true,
                    message: "Por favor, preencha a senha!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirme a Senha"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Por favor, confirme a senha!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="nickname"
                label={
                  <span>
                    Apelido&nbsp;
                    <Tooltip title="Esse será o seu nome dentro da Labephoto">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Por favor, preencha o seu apelido!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </FormRow>
          </Form>
          <SignupContainer>
            <p>
              Se você já tem conta, clique <Link to="/">aqui</Link>
            </p>
          </SignupContainer>
        </FormContainer>
      </SignupForm>
    </Background>
  );
}

export default SignupPage;
