import React, { useState, useEffect } from "react";
import {
  message,
  Steps,
  Spin,
  Table,
  Space,
  Checkbox,
  List,
  Button,
  Typography,
  Avatar,
  theme,
} from "antd";
import * as Papa from "papaparse";
import UploadFile from "../shared/UploadFile";
import ColumnData from "../shared/ColumnData";
import CollectionsAPI from "../../api/CollectionsAPI";
import StepsItem from "../../const/stepsItem";
import { BACKEND_URL } from "../../const/basicData";

const { Text } = Typography;
const Import = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [fileName, setFileName] = useState("");
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isHeader, setIsHeader] = useState(false);
  const [collectionBlocks, setCollectionBlocks] = useState([]);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await CollectionsAPI.getCollectionsRepository();
      setCollectionBlocks(response.data);
    };
    fetchData();
  }, []);

  const convertToTreeData = (collectionBlocks) => {
    const treeData = collectionBlocks.map((data) => {
      const children = data.tags?.map((data) => {
        return {
          label: data,
          value: data,
        };
      });
      return {
        label: data.label,
        value: data.label,
        children: children,
      };
    });

    return treeData;
  };

  const updateTableData = (index, newValue) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column, columnIndex) => {
        if (columnIndex === index) {
          return { ...column, title: newValue };
        }
        return column;
      });
    });
  };

  const updateTableDataIsIncluded = (index, value) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column, columnIndex) => {
        if (columnIndex === index) {
          return { ...column, isIncluded: value };
        }
        return column;
      });
    });
  };

  useEffect(() => {
    if (collectionBlocks.length != 0)
      setTreeData(convertToTreeData(collectionBlocks));
  }, [collectionBlocks]);

  const buildData = () => {
    
    const updatedTableData = tableData.map((data) => {
      const updatedData = {};
      for (const column of columns) {
        if (column.isIncluded) {
          //updatedData[column.title] = data[column.key];
          const [parentTitle, childTitle] = column.title;
          const parentData = data[parentTitle];
          const childData = data[column.key];
          updatedData[parentTitle] = {
            ...updatedData[parentTitle],
            [childTitle]: childData,
          };
        }
      }
      return updatedData;
    });
    console.log(updatedTableData);
    setTableData(updatedTableData);
    next()
  };

  useEffect(() => {
    Papa.parse( BACKEND_URL + "/files/" + fileName, {
      download: true,
      header: isHeader,
      complete: function (results, file) {
        if (isHeader) {
          const formattedData = results?.meta?.fields?.map((item: string) => ({
            title: item,
            dataIndex: item,
            key: item,
            isIncluded: true,
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
              isIncluded: true,
            });
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
      data: (
        <UploadFile
          setIsHeader={setIsHeader}
          next={next}
          setFileName={setFileName}
        />
      ),
    },
    {
      data: <Spin size="large" />,
    },
    {
      data: (
        <>
          <Space direction="vertical" size="small">
            <List
              dataSource={columns}
              grid={{ gutter: 16, column: 2 }}
              renderItem={(item, index) => (
                <List.Item>
                  <ColumnData
                    item={item}
                    index={index}
                    treeData={treeData}
                    updateTableDataIsIncluded={updateTableDataIsIncluded}
                    updateTableData={updateTableData}
                  />
                </List.Item>
              )}
            />
            <Button onClick={buildData}>Build data</Button>
            <Table
              dataSource={tableData}
              columns={columns}
              scroll={{ x: 1300 }}
            />
          </Space>
        </>
      ),
    },
    {
      data: (
        <p> { JSON.stringify(tableData.slice(0, 3)) } </p>
      )
    }
  ];
  return (
    <>
      <Steps current={current} items={StepsItem} />
      <div style={contentStyle}>{content[current].data}</div>
    </>
  );
};

export default Import;
