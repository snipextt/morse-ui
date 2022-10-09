import { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Result,
  Select,
  Space,
  Steps,
  Typography,
  Upload,
} from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";

import Spinner from "../Components/Spinner";

import { getUserProfile, updateUserProfile } from "../lib/profile";
import { useAuthState } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import ProfilePictureWidget from "../Components/ProfilePictureWidget";

const { Step } = Steps;

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

const Onboarding = () => {
  const { token } = useAuthState();
  const { status, data } = useQuery(["profile", null], getUserProfile);
  const [current, setCurrent] = useState(0);
  const [academicDetailsForm] = Form.useForm();
  const [personalDetailsForm] = Form.useForm();
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [profilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    console.log(data);
    if (data?.user?.onBoardingState === "completed") {
      navigate("/app");
    }
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setSelectedAvatar(randomAvatar);
  }, [data]);

  const formSubmit = async (values: any) => {
    if (current === 1) {
      values.onBoardingState = "completed";
      values.profilePicture = "https://joeschmoe.io/api/v1/" + selectedAvatar;
    }
    setSubmittingForm(true);
    await updateUserProfile(values);
    setSubmittingForm(false);
    setCurrent(current + 1);
  };

  return (
    <div className="onboarding-container">
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div
          style={{
            minWidth: "900px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <Steps current={current}>
            <Step title="Academic Details" icon={<SolutionOutlined />} />
            <Step title="Personal Details" icon={<UserOutlined />} />
            <Step title="Done" icon={<SmileOutlined />} />
          </Steps>
          <div
            style={{
              marginTop: "25px",
            }}
          >
            {current === 0 && (
              <Form
                form={academicDetailsForm}
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
                <Form.Item
                  name="branch"
                  label="branch"
                  rules={[{ required: true }]}
                >
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
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submittingForm}
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
            {current === 1 && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <Avatar
                      size={100}
                      src={"https://joeschmoe.io/api/v1/" + selectedAvatar}
                    />
                    <EditOutlined
                      style={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        fontSize: "20px",
                        backgroundColor: "white",
                        borderRadius: "50%",
                      }}
                      onClick={() => setProfilePictureModalOpen(true)}
                    />
                  </div>
                  <Typography.Title level={5}>Avatar</Typography.Title>
                </div>
                <Form
                  form={personalDetailsForm}
                  layout="vertical"
                  autoComplete="off"
                  onFinish={formSubmit}
                >
                  <Form.Item
                    name="bio"
                    label="bio"
                    rules={[{ required: true }]}
                  >
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
                  <Form.Item
                    label="gender"
                    name={"gender"}
                    rules={[{ required: true }]}
                  >
                    <Radio.Group>
                      <Radio value={"M"}>Male</Radio>
                      <Radio value={"F"}>Female</Radio>
                      <Radio value={"O"}>Other</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    name="dob"
                    label="date of birth"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={submittingForm}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
            {current === 2 && (
              <Result
                icon={<SmileOutlined />}
                title="Great, Your account has been created!"
                extra={
                  <Button
                    type="primary"
                    onClick={() => {
                      queryClient.invalidateQueries(["profile", null]);
                      navigate("/app");
                    }}
                  >
                    continue to feed
                  </Button>
                }
              />
            )}
          </div>
        </div>
      )}
      <ProfilePictureWidget
        open={profilePictureModalOpen}
        setOpen={setProfilePictureModalOpen}
        defaultSelection={selectedAvatar}
        setDefaultSelection={setSelectedAvatar}
      />
    </div>
  );
};

export default Onboarding;
