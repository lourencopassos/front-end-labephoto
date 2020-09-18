import React, { useState } from "react";
import Header from "../../components/AddPhotoHeader/AddPhotoHeader";
import {
  Form,
  Input,
  Upload,
  message,
  Typography,
  Tag,
  Tooltip,
  Button,
  DatePicker,
} from "antd";
import {
  FormContainer,
  TagInput,
  FormRow,
  FormItemAuthor,
  FormItemCollection,
  FormItemSubtitle,
  FormItemTags,
  FormItemUpload,
  FormItemDate,
} from "./style.js";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import "moment/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";
import moment from "moment";

function AddPhotoPage() {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);

  const [form] = Form.useForm();

  const handleClose = (removedTag) => {
    const filteredTags = tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    setTags(filteredTags);
    form.setFieldsValue({
      tags: filteredTags,
    });
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputConfirm = () => {
    const oldTags = tags;
    const newTags = [...oldTags, inputValue];

    console.log(inputValue);
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags(newTags);
      form.setFieldsValue({
        tags: newTags,
      });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (event) => {
    setEditInputValue(event.target.value);
  };

  const handleEditInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      let newTags = [...tags, inputValue];
      setTags(newTags);

      form.setFieldsValue({
        tags: newTags,
      });
    }
    setInputVisible(false);
    setInputValue("");
  };

  const saveInputRef = (input) => {
    input = input;
  };

  const saveEditInputRef = (input) => {
    setEditInputValue(input);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Dragger } = Upload;
  const { TextArea } = Input;
  const { Title } = Typography;

  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Header />
      <FormContainer>
        <Title>Adicione a foto </Title>

        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          name="basic"
        >
          <FormRow>
            <FormItemAuthor
              label="Autor da Imagem"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Escreva o autor da imagem!",
                },
              ]}
            >
              <Input />
            </FormItemAuthor>
            <FormItemCollection
              label="Coleção"
              name="collection"
              rules={[
                {
                  required: true,
                  message: "Escreva a coleção da qual a imagem faz parte!",
                },
              ]}
            >
              <Input />
            </FormItemCollection>
          </FormRow>
          <FormRow>
            <FormItemSubtitle
              label="Legenda da Imagem"
              name="subtitle"
              rules={[
                {
                  required: true,
                  message: "Escreva o legenda da imagem!",
                },
              ]}
            >
              <TextArea rows={3} />
            </FormItemSubtitle>
          </FormRow>
          <FormRow>
            <FormItemTags
              label="Adicione Tags"
              name="tags"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione no mínimo uma tag!",
                },
              ]}
            >
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={saveEditInputRef}
                      key={tag}
                      size="small"
                      className="tag-input"
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                    />
                  );
                }

                const isLongTag = tag.length > 20;

                const tagElem = (
                  <Tag
                    className="edit-tag"
                    key={tag}
                    closable={true}
                    onClose={() => handleClose(tag)}
                  >
                    <span
                      onDoubleClick={(e) => {
                        if (index !== 0) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                        }
                      }}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <TagInput
                  ref={saveInputRef}
                  type="text"
                  size="small"
                  className="tag-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag className="site-tag-plus" onClick={showInput}>
                  <PlusOutlined /> Adicionar Tags
                </Tag>
              )}
            </FormItemTags>
            <FormItemDate
              name="date"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione a data!",
                },
              ]}
            >
              <DatePicker locale={locale} format={"DD/MM/YYYY"} />
            </FormItemDate>
          </FormRow>
          <FormRow>
            <FormItemUpload
              name="file"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecione a foto!",
                },
              ]}
            >
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Clique ou arraste aqui sua imagem
                </p>
                <p className="ant-upload-hint">Envie uma imagem de cada vez</p>
              </Dragger>
            </FormItemUpload>
          </FormRow>
          <FormRow>
            <Form.Item>
              <Button
                form="basic"
                key="submit"
                htmlType="submit"
                type="primary"
              >
                Enviar
              </Button>
            </Form.Item>
          </FormRow>
        </Form>
      </FormContainer>
    </div>
  );
}

export default AddPhotoPage;
