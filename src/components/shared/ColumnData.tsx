import React, { useState } from "react";
import { Checkbox, Cascader, Typography, Space } from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const { Title } = Typography;

const ColumnData = (props: any) => {
  const [value, setValue] = useState<string>();
  const [checked, setChecked] = useState(false);

  const onChangeData = (newValue: string) => {
    console.log('newValue', newValue);
    props.updateTableData(props.index, newValue);
    setValue(newValue);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
    props.updateTableDataIsIncluded(props.index, e.target.checked);
    setChecked(e.target.checked);
  };

  return (
    <>
     <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Space>
        <Checkbox checked={checked} onChange={onChange}>Included</Checkbox>
        <Cascader
          options={props.treeData}
          placeholder="Please select"
          onChange={onChangeData}
        />
      </Space>
      </div>
    </>
  );
};

export default ColumnData;
