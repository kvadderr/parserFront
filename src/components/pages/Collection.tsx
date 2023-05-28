import React, { useState } from "react";
import { Typography, Button, Modal, Input } from "antd";

import CollectionBlock from "../shared/CollectionBlock";

const { Title } = Typography;
const Collection = () => {
  const [collectionBlocks, setCollectionBlocks] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [input, setInput] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      setCollectionBlocks([...collectionBlocks, input]);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Title level={3}>Collections</Title>

      {collectionBlocks.map((data, index) => (
        <CollectionBlock label={data} key={index} />
      ))}
      <Button type="primary" onClick={showModal}>
        Add new collection
      </Button>
      <Modal
        title="Add new collection"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input placeholder="Collection's name" onChange={onChange}/>
      </Modal>
    </>
  );
};

export default Collection;
