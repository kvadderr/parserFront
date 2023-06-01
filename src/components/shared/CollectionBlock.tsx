import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import type { InputRef } from "antd";
import { Input, Tag, theme, Typography, Space, Button, Popconfirm } from "antd";

const { Title } = Typography;

const CollectionBlock = (props: any) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    setTags(props.label.tags);
  }, []);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const confirmOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const confirmCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags?.map(forMap);

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space direction="vertical">
          <Space align="baseline">
            <Title level={5}>{props.label.label}</Title>
            <Popconfirm
              title="Title"
              description="Open Popconfirm with async logic"
              open={open}
              onConfirm={confirmOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={confirmCancel}
            >
              <Button
                type="primary"
                shape="circle"
                onClick={showPopconfirm}
                icon={<DeleteOutlined />}
                size="small"
              />
            </Popconfirm>
          </Space>
          <Space>
            <TweenOneGroup
              enter={{
                scale: 0.8,
                opacity: 0,
                type: "from",
                duration: 100,
              }}
              onEnd={(e) => {
                if (e.type === "appear" || e.type === "enter") {
                  (e.target as any).style = "display: inline-block";
                }
              }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag onClick={showInput} style={tagPlusStyle}>
                <PlusOutlined /> Новый тэг
              </Tag>
            )}
          </Space>
        </Space>
      </div>
    </>
  );
};

export default CollectionBlock;
