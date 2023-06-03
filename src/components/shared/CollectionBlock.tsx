import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import type { InputRef } from "antd";
import { Input, Tag, theme, Typography, Space, Button, Popconfirm } from "antd";
import CollectionsAPI from "../../api/CollectionsAPI";

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

  const handleRemove = () => {
    // Удаление элемента из массива collectionBlocks
    props.setCollectionBlocks(prevCollectionBlocks => {
      const updatedCollectionBlocks = [...prevCollectionBlocks];
      const indexToRemove = updatedCollectionBlocks.findIndex(item => item._id === props.label._id);
      if (indexToRemove !== -1) {
        updatedCollectionBlocks.splice(indexToRemove, 1);
      }
      return updatedCollectionBlocks;
    });
  };

  const confirmOk = async() => {
    setConfirmLoading(true);
    console.log(props.label._id)
    const ID = props.label._id
    const response = await CollectionsAPI.deleteCollectionsRepository({
      ID
    });
    setOpen(false);
    setConfirmLoading(false);
    handleRemove();
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

  const handleInputConfirm = async () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    const response = await CollectionsAPI.updateCollectionsRepository({
      label: props.label.label,
      tags: [...tags, inputValue],
    });
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
              title="Delete collection"
              description="Are you sure you want to delete the collection?"
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
