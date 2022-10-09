import { Button, Mentions, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface EditorProps {
  onChange: (e: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Mentions
      placeholder="add comment..."
      style={{
        border: "none",
        borderBottom: "1px solid #d9d9d9",
        borderRadius: 0,
        width: "90%",
      }}
      onPressEnter={onSubmit}
      onChange={onChange}
      value={value}
    >
      <Mentions.Option value="afc163">afc163</Mentions.Option>
      <Mentions.Option value="zombieJ">zombieJ</Mentions.Option>
      <Mentions.Option value="yesmeck">yesmeck</Mentions.Option>
    </Mentions>
    <Button
      htmlType="submit"
      loading={submitting}
      onClick={onSubmit}
      type="primary"
      style={{ marginLeft: "10px" }}
    >
      <SendOutlined />
    </Button>
  </>
);

export default Editor;
