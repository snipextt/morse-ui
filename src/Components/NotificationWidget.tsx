import { Divider, List, Typography } from "antd";
import { BellOutlined } from "@ant-design/icons";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const NotificationWidget = () => {
  return (
    <div className="notification-widget">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Paragraph style={{ margin: 0 }}>
          Notification
        </Typography.Paragraph>
        <BellOutlined />
      </div>
      <Divider style={{ margin: "10px 0" }} />
      <Typography.Paragraph style={{ margin: 0 }}>
        This is a notification and magic happens here
      </Typography.Paragraph>
      <Divider style={{ margin: "10px 0" }} />
      <Typography.Paragraph style={{ margin: 0 }}>
        This is a notification and magic happens here
      </Typography.Paragraph>
      <Divider style={{ margin: "10px 0" }} />
      <Typography.Paragraph style={{ margin: 0 }}>
        This is a notification and magic happens here
      </Typography.Paragraph>
      <Divider style={{ margin: "10px 0" }} />
      <Typography.Paragraph style={{ margin: 0 }}>
        This is a notification and magic happens here
      </Typography.Paragraph>
      <Divider style={{ margin: "10px 0" }} />
      <Typography.Paragraph style={{ margin: 0 }}>
        This is a notification and magic happens here
      </Typography.Paragraph>
      <Divider style={{ margin: "10px 0" }} />
      <Typography.Paragraph style={{ margin: 0 }}>
        This is a notification and magic happens here
      </Typography.Paragraph>
    </div>
  );
};

export default NotificationWidget;
