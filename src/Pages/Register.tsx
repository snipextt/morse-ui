import { Typography, Input, Checkbox, Button, Form } from "antd";
import {
  LockOutlined,
  UserOutlined,
  EditOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAuthState } from "../utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/auth";

const Register = () => {
  const { token, setAuthState } = useAuthState();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log(values);
    const { username, password, name, remember, email } = values;
    const data = await register(username, password, name, email);
    if (data) {
      setAuthState(data, remember);
      navigate("/app");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/app");
    }
  }, []);

  return (
    <div className="register-conatiner">
      <Typography.Title level={3}>Create Account</Typography.Title>
      <Form
        name="register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input prefix={<EditOutlined />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="register-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
