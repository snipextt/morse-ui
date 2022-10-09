import { Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { useState } from "react";
import { addPost } from "../lib/profile";
import toast from "react-hot-toast";

const AddPostWidget = ({ modalOpen, closeModal }: any) => {
  const [selectedFileSrc, setSelectedFileSrc] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const onFileSelect = (info: UploadChangeParam<UploadFile<any>>) => {
    if (info.file.status === "removed") {
      setSelectedFileSrc(null);
      setSelectedFile(null);
      return;
    }
    setSelectedFile(info.file.originFileObj!);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(info.file.originFileObj!);
    fileReader.onload = () => {
      setSelectedFileSrc(fileReader.result as string);
    };
  };

  const createPost = async () => {
    try {
      await addPost({
        image: selectedFile,
        caption,
      });
      closeModal();
      toast.success("Post added successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSelectedFileSrc(null);
      setSelectedFile(null);
      setCaption(null);
    }
  };

  return (
    <Modal
      title={<div style={{ textAlign: "center" }}>Add Post</div>}
      centered
      width={700}
      closable={false}
      open={modalOpen}
      okText="Confirm"
      cancelText="Cancel"
      onCancel={closeModal}
      onOk={createPost}
      destroyOnClose={true}
    >
      <Upload
        className="upload"
        onChange={onFileSelect}
        accept="image/*"
        maxCount={1}
      >
        {!selectedFile && (
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
        )}
        {selectedFileSrc && (
          <img
            src={selectedFileSrc}
            style={{ width: "100%", height: "350px", objectFit: "cover" }}
          />
        )}
      </Upload>
      <Input.TextArea
        placeholder="what's happening?"
        onChange={(e) => setCaption(e.target.value)}
        style={{
          marginTop: 16,
        }}
        autoSize={{ minRows: 3, maxRows: 5 }}
      ></Input.TextArea>
    </Modal>
  );
};

export default AddPostWidget;
