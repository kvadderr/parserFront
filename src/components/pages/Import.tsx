import React, { useState, useEffect } from "react";
import { message, Steps, Spin, Table, Space, Checkbox, theme } from "antd";
import * as Papa from 'papaparse';
import UploadFile from "../shared/UploadFile";

const steps = [
  {
    title: "Upload",
    description: "Select the file",
    key: "First-content",
  },
  {
    title: "Processing",
    description: "Examining file data",
    key: "Second-content",
  },
  {
    title: "Markup",
    description: "Data setup",
    key: "Last-content",
  },
  
  {
    title: "Processing",
    description: "Build current data",
    key: "Second-content",
  },
  {
    title: "Save",
    description: "Confirm data",
    key: "Last-content",
  },
];

const Import = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isHeader, setIsHeader] = useState(false);

  useEffect(() => {
    Papa.parse("http://127.0.0.1:3000/files/" + fileName, {
      download: true,
      header: isHeader,
      complete: function (results, file) {
        if (isHeader) {
            const formattedData = results?.meta?.fields?.map((item: string) => ({
                title: item,
                dataIndex: item,
                key: item,
              }));
              setColumns(formattedData);
        } else {
            const formattedData = [];
            let step;
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

  

  const next = () => {
    setCurrent(current + 1);
  };

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
    marginTop: 40,
  };

  const content = [
    {
      data: <UploadFile setIsHeader={setIsHeader} next={next} setFileName={setFileName} />
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
      <Steps current={current} items={steps} />
      <div style={contentStyle}>{content[current].data}</div>
    </>
  );
};

export default Import;
