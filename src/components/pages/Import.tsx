import React, { useState, useEffect } from "react";
import { message, Steps, Spin, Table, Space, Checkbox, theme } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import * as Papa from 'papaparse';
import DataFileAPI from "../../api/DataFileAPI";

const { Dragger } = Upload;
import type { CheckboxChangeEvent } from "antd/es/checkbox";

const steps = [
  {
    title: "Upload",
    description: "Select the file",
    content: "First-content",
  },
  {
    title: "Processing",
    description: "Examining file data",
    content: "Second-content",
  },
  {
    title: "Markup",
    description: "Data setup",
    content: "Last-content",
  },
  {
    title: "Save",
    description: "Select the file",
    content: "Last-content",
  },
];

const Import = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isHeader, setIsHeader] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setIsHeader(e.target.checked);
  };

  useEffect(() => {
    Papa.parse("http://127.0.0.1:3000/files/" + fileName, {
      download: true,
      header: isHeader,
      complete: function (results, file) {
        console.log("Parsing complete:", results, file);

        if (isHeader) {
            const formattedData = results?.meta?.fields?.map((item: string) => ({
                title: item,
                dataIndex: item,
                key: item,
              }));
              setColumns(formattedData);
        } else {
            const formattedData = [];
            var step;
            for (step = 0; step < results.data[0].length; step++) {
                formattedData.push({
                    title: step,
                    dataIndex: step,
                    key: step,
                })
            }
            setColumns(formattedData);
        }
        
        
        setTableData(results.data);
        next();
      },
    });
  }, [fileName]);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: "http://127.0.0.1:3000/uploads",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        next();
        console.log("info", info);
        message.success(`${info.file.name} file uploaded successfully.`);
        convertFile(info.file.response);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped file", e.dataTransfer.files);
    },
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const convertFile = async(nameFile: string) => {
    const response = await DataFileAPI.convertDataFile(nameFile);
    console.log(response);
    setFileName(response.data);
  }

  const items = steps.map((item) => ({
    key: item.title,
    description: item.description,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    marginTop: 40,
  };

  const content = [
    {
      data: (
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
      ),
    },
    {
      data: <Spin size="large" />,
    },
    {
      data: <Table dataSource={tableData} columns={columns} scroll={{ x: 1300 }}/>,
    },
  ];
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{content[current].data}</div>
    </>
  );
};

export default Import;
