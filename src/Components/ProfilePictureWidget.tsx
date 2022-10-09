import { Avatar, Button, Modal, Typography, Upload } from "antd";
import { useState } from "react";

const avatars = [
  "jia",
  "jane",
  "jeane",
  "josh",
  "jana",
  "jocelyn",
  "jaqueline",
  "jacques",
  "jake",
  "jed",
  "jodi",
  "jazebelle",
  "jordan",
  "jeri",
  "jabala",
  "jean",
  "jenni",
  "jess",
  "julie",
  "jude",
  "jack",
  "jai",
  "josephine",
  "james",
  "jon",
  "jolee",
  "jerry",
  "joe",
];

const ProfilePictureWidget = ({
  defaultSelection,
  setDefaultSelection,
  open,
  setOpen,
}: any) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    defaultSelection || null
  );
  return (
    <Modal
      closable={false}
      width={800}
      centered
      title={false}
      open={open}
      destroyOnClose={true}
      maskClosable={true}
      onOk={() => {
        setDefaultSelection(selectedAvatar);
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <Typography.Title level={5}>Available avatars</Typography.Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        {avatars.map((avatar) => (
          <img
            key={avatar}
            onClick={() => setSelectedAvatar(avatar)}
            src={"https://joeschmoe.io/api/v1/" + avatar}
            alt=""
            style={{
              width: "80px",
              borderRadius: "50%",
              cursor: "pointer",
              border:
                selectedAvatar === avatar
                  ? "3px solid #7546c9"
                  : "1px solid #e8e8e8",
            }}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ProfilePictureWidget;
