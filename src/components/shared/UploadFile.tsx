import { Upload, Space, Checkbox, theme, message } from "antd";
import type { UploadProps } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { BACKEND_URL } from "../../const/basicData";
import DataFileAPI from "../../api/DataFileAPI";

const { Dragger } = Upload;

type Props = {
  setIsHeader: void;
  next: void;
  setFileName: void;
};

const UploadFile = ({ setIsHeader, next, setFileName }: Props) => {
  const onChange = (e: CheckboxChangeEvent) => {
    setIsHeader(e.target.checked);
  };
  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: BACKEND_URL + "/uploads",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        next();
        message.success(`${info.file.name} file uploaded successfully.`);
        convertFile(info.file.response);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  //Отправляем файл на конвертацию
  const convertFile = async (nameFile: string) => {
    const response = await DataFileAPI.convertDataFile(nameFile);
    setFileName(response.data);
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Checkbox onChange={onChange}>File has header</Checkbox>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Strictly prohibited from uploading
          company data or other banned files.
        </p>
      </Dragger>
    </Space>
  );
};

export default UploadFile;
