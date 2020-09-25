import React, { useState, useEffect } from "react";
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
  notification,
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
import { InboxOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import "moment/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";
import { useHistory } from "react-router-dom";
import { createPhoto } from "../../utils/api";
import firebase from "@firebase/app";
import "@firebase/storage";
import { storageRef } from "../../utils/firebaseConfig";

function AddPhotoPage() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [token, setToken] = useState();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [uploadFile, setUploadFile] = useState();

  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token === null) {
      alert("Login necessário!");
      history.push("/");
    }
  }, [token]);

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

  const onFinish = async (values) => {
    setButtonLoading(true);
    const uploadBody = {
      subtitle: values.subtitle,
      tags: values.tags,
      date: values.date.format("YYYY-MM-DD"),
      file: uploadFile,
    };

    await createPhoto(uploadBody, token);
    setButtonLoading(false);
    console.log("Criado");
    form.resetFields();
    notification.open({
      message: "Notificação ",
      description:
        "Imagem adicionada com sucesso!",
      icon: <CheckOutlined style={{ color: "#108ee9" }} />,
    });
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Dragger } = Upload;
  const { TextArea } = Input;
  const { Title } = Typography;

  const handleUpload = async ({ file, onSuccess, onError, onProgress }) => {
    let uploadTask = storageRef.child(`images/${file.name}`).put(file);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            break;
          case firebase.storage.TaskState.RUNNING:
            break;
        }
      },
      function (error) {
        onError(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          onSuccess(downloadURL);
          setUploadFile(downloadURL);
        });
      }
    );
    const imageRef = storageRef.child(`images/${file.name}`);
    await imageRef.put(file);
    const mediaUrl = await imageRef.getDownloadURL();
  };

  const props = {
    name: "file",
    accept: ".jpeg,.png,.jpg",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} Arquivo baixado com sucesso.`);
      } else if (status === "error") {
        message.error(`${info.file.name} Falha. Tente novamente`);
      }
    },
    customRequest: handleUpload,
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
                loading={buttonLoading}
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
