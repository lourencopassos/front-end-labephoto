import styled from "styled-components";

import { Input, Form } from "antd";

export const FormContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin: 32px 0;
    text-align: center;
  }
`;

export const TagInput = styled(Input)`
  width: 25%;
`;

export const FormRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export const FormItemAuthor = styled(Form.Item)`
  width: 30%;
  margin-right: 16px;
`;

export const FormItemCollection = styled(Form.Item)`
  width: 30%;
`;

export const FormItemSubtitle = styled(Form.Item)`
  width: 65%;
`;

export const FormItemTags = styled(Form.Item)`
  width: 30%;
`;

export const FormItemUpload = styled(Form.Item)`
  width: 65%;
`;

export const FormItemDate = styled(Form.Item)`
  width: 30%;
`;
