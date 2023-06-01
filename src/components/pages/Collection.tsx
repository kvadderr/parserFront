import React, { useState, useEffect } from "react";
import { Typography, Button, Modal, Input, TreeSelect  } from "antd";
import CollectionsAPI from "../../api/CollectionsAPI";
import CollectionBlock from "../shared/CollectionBlock";

const { Title } = Typography;
const Collection = () => {
  const [collectionBlocks, setCollectionBlocks] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState<string>();
  const onChangeData = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await CollectionsAPI.getCollectionsRepository();
      setCollectionBlocks(response.data);
    };
    fetchData();
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await CollectionsAPI.createCollectionsRepository({
      label: input,
      tags: [],
    });
    setOpen(false);
    setConfirmLoading(false);
    setCollectionBlocks([...collectionBlocks, { label: input, tags: [] }]);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  

  return (
    <>
      <Title level={3}>Collections</Title>
      {collectionBlocks?.map((data, index) => (
        <CollectionBlock label={data} key={data._id} />
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
        <Input placeholder="Collection's name" onChange={onChange} />
      </Modal>
    </>
  );
};

export default Collection;
