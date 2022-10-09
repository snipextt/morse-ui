import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Modal, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../lib/profile";

const colleges = [
  "LPU",
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Hyderabad",
  "IIT Indore",
  "IIT Bhubaneswar",
  "IIT Patna",
  "IIT Ropar",
  "IIT Mandi",
  "IIT Jodhpur",
  "IIT Goa",
  "IIT Bhilai",
  "IIT Tirupati",
  "IIT Dhanbad",
  "IIT Palakkad",
  "IIT Jammu",
  "IIT (ISM) Dhanbad",
  "IIT Bhubaneswar",
  "IIT Gandhinagar",
  "IIT Tiruchirappalli",
  "IIT (BHU) Varanasi",
];

const branch = [
  "CSE",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "IT",
  "MCA",
  "MBA",
  "BBA",
  "BSC",
  "BCA",
  "B.COM",
  "B.TECH",
  "M.TECH",
  "M.SC",
  "M.COM",
  "PHD",
  "M.PHIL",
  "B.PHIL",
  "B.A",
  "M.A",
  "B.ARCH",
  "M.ARCH",
  "B.DES",
  "M.DES",
  "BFA",
  "MFA",
  "BHM",
  "MBA",
  "BBA",
  "MCA",
  "BCA",
  "B.COM",
  "M.COM",
  "B.SC",
  "M.SC",
];

const EditProfileWidget = ({ open, setOpen }: any) => {
  const [profile] = Form.useForm();
  const [submittingForm, setSubmittingForm] = useState(false);
  const { data } = useQuery(["profile", null], getUserProfile, {
    retry: false,
  });
  const queryClient = useQueryClient();
  const formSubmit = async (values: any) => {
    setSubmittingForm(true);
    updateUserProfile(values);
    setSubmittingForm(false);
    setOpen(false);
    queryClient.invalidateQueries(["profile", null]);
  };

  useEffect(() => {
    if (data) {
      const user = data.user;
      profile.setFieldsValue({
        ...user,
      });
    }
  }, [data]);

  return (
    <Modal
      closable={false}
      width={800}
      centered
      title={"Edit Profile"}
      open={open}
      destroyOnClose={true}
      maskClosable={true}
      onOk={() => {
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      footer={false}
    >
      <Form
        form={profile}
        layout="vertical"
        autoComplete="off"
        onFinish={formSubmit}
      >
        <Form.Item
          name="registrationNumber"
          label="registration number"
          rules={[{ required: true }]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item
          name="college"
          label="college name"
          rules={[{ required: true }]}
        >
          <Select placeholder="select your college">
            {colleges.map((college) => (
              <Select.Option key={college} value={college}>
                {college}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="branch" label="branch" rules={[{ required: true }]}>
          <Select placeholder="select your branch">
            {branch.map((branch) => (
              <Select.Option key={branch} value={branch}>
                {branch}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="currentAcademicStatus"
          label="current academic status"
          rules={[{ required: true }]}
        >
          <Select placeholder="select your current academic status">
            <Select.Option value="Persuing">Persuing</Select.Option>
            <Select.Option value="alumini">alumini</Select.Option>
            <Select.Option value="faculty">faculty</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="bio" label="bio" rules={[{ required: true }]}>
          <Input.TextArea
            autoSize={{
              minRows: 3,
              maxRows: 3,
            }}
            placeholder="input placeholder"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="phone number"
          rules={[{ required: true }]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={submittingForm}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfileWidget;
