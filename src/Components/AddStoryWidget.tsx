import { Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { useState } from "react";

const AddStoryWidget = ({ modalOpen, closeModal }: any) => {
  console.log(modalOpen);
  const [selectedFiletype, setSelectedFiletype] = useState<string | null>(null);
  const [selectedFileSrc, setSelectedFileSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const onFileSelect = (info: UploadChangeParam<UploadFile<any>>) => {
    const selectedFiledtype = info.file.type!.split("/")[0];
    setSelectedFiletype(selectedFiledtype);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(info.file.originFileObj!);
    fileReader.onload = () => {
      setSelectedFileSrc(fileReader.result as string);
    };
  };

  const addStory = () => {};

  return (
    <Modal
      title={<div style={{ textAlign: "center" }}>Add story</div>}
      centered
      width={700}
      closable={false}
      visible={modalOpen}
      okText="Confirm"
      cancelText="Cancel"
      onOk={() => console.log(false)}
      onCancel={closeModal}
    >
      {!selectedFiletype && (
        <Upload className="upload" onChange={onFileSelect}>
          <div
            style={{
              width: "100%",
              height: "350px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed #d9d9d9",
              borderRadius: "2px",
              flexDirection: "column",
              background: "#F5F5F5",
              cursor: "pointer",
            }}
          >
            <PlusOutlined
              style={{
                fontSize: "40px",
              }}
            />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      )}
      {selectedFiletype && (
        <>
          {selectedFiletype === "image" && (
            <img
              src={selectedFileSrc!}
              style={{
                width: "100%",
                height: "350px",
              }}
            />
          )}
          {selectedFiletype === "video" && (
            <video
              src={selectedFileSrc!}
              style={{
                width: "100%",
                height: "350px",
              }}
              controls={false}
              autoPlay
              muted
              loop
            />
          )}
          <Input
            style={{
              marginTop: 16,
            }}
            size="large"
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
          />
        </>
      )}
    </Modal>
  );
};

export default AddStoryWidget;
