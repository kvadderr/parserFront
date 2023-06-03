import { LinkOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Checkbox, Cascader } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const ImportTable = (props: any) => {
  const [value, setValue] = useState<string>();
  const [checked, setChecked] = useState(true);
  const onChangeData = (newValue: string) => {
    console.log("newValue", newValue);
    props.updateTableData(props.index, newValue);
    setValue(newValue);
  };
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    console.log("props", props);
    props.updateTableDataIsIncluded(props.index, e.target.checked);
    setChecked(e.target.checked);
  };
  const getColumnSearchProps = () => ({
    filterDropdown: () => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Space>
          <Cascader
            options={props.treeData}
            placeholder="Please select"
            onChange={onChangeData}
          />
          <Checkbox checked={checked} onChange={onChange}>
            Included
          </Checkbox>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <LinkOutlined />,
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps(),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
    },
  ];

  return <Table scroll={{ y:300, x: 3000 }} columns={props.columns} dataSource={props.tableData} />;
};

export default ImportTable;
