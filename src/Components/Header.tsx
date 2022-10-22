import {
  AutoComplete,
  Avatar,
  Badge,
  Dropdown,
  Input,
  Menu,
  Space,
  Typography,
} from "antd";
import {
  BellOutlined,
  MessageOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import NotificationWidget from "./NotificationWidget";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { User } from "../schema/User";
import { DefaultOptionType } from "antd/lib/select";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile, searchUsername } from "../lib/profile";
import AddPostWidget from "./AddPostWidget";
import { useAuthState } from "../utils/auth";

const ProfileMenu = () => {
  const { setAuthState } = useAuthState();
  const navigate = useNavigate();
  const logout = () => {
    setAuthState(
      {
        token: "",
        userId: "",
      },
      true
    );
    navigate("/login");
  };
  return (
    <Menu
      items={[
        {
          label: <Link to="/app/profile">Profile</Link>,
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: <div onClick={logout}>Logout</div>,
          key: "1",
        },
      ]}
    />
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState<DefaultOptionType[]>();
  const [searchValue, setSearchValue] = useState("");
  const debounceRef = useRef<number>();
  const { data: userData } = useQuery(["profile", null], getUserProfile);
  const [addPostModalOpen, setAddPostModalOpen] = useState(false);

  const { data, status } = useQuery(
    ["search", searchValue],
    () => searchUsername(searchValue),
    {
      retry: false,
    }
  );

  const handleSearch = (value: string) => {
    const searchvalue = value.trim();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (!searchvalue) {
      setSearchValue("");
      setOptions([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setSearchValue(searchvalue);
    }, 600);
  };

  useEffect(() => {
    if (status === "success") {
      setOptions(
        data?.users?.map((user: User) => ({
          value: user.username,
          label: (
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar size={"large"} src={user.profilePicture} />
              <Space direction="vertical" size={1}>
                <Typography.Text>{user.username}</Typography.Text>
                <Typography.Text type="secondary">{user.name}</Typography.Text>
              </Space>
            </div>
          ),
        })) || []
      );
    }
  }, [status, searchValue]);

  return (
    <div className="header">
      <Link to="/app">
        <Typography.Title level={4} style={{ margin: 0 }}>
          Morse
        </Typography.Title>
      </Link>
      <Space size={24}>
        <AutoComplete
          options={options}
          bordered={false}
          onSelect={(value: any) => {
            const userId = data.users.find(
              (user: User) => user.username === value
            )._id;
            navigate(`/app/profile/${userId}`);
          }}
          onSearch={handleSearch}
          placeholder="Search Morse"
          notFoundContent={
            <Typography.Text>
              {searchValue ? "No User found" : "Enter username to search"}
            </Typography.Text>
          }
          size="middle"
          style={{
            width: 400,
            borderBottom: "1px solid #d9d9d9",
            borderRadius: 0,
          }}
        />
        <PlusCircleOutlined
          onClick={() => setAddPostModalOpen(true)}
          style={{ fontSize: "24px", color: "#8f8f8f", cursor: "pointer" }}
        />
        <Dropdown
          overlay={NotificationWidget}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={["click"]}
        >
          <Badge count={5}>
            <BellOutlined
              style={{ fontSize: "24px", color: "#8f8f8f", cursor: "pointer" }}
            />
          </Badge>
        </Dropdown>
        <MessageOutlined
          onClick={() => navigate("/app/messages")}
          style={{ fontSize: "24px", color: "#8f8f8f", cursor: "pointer" }}
        />
        <Dropdown overlay={<ProfileMenu />} trigger={["click"]}>
          <Avatar
            src={userData?.user?.profilePicture}
            style={{ cursor: "pointer", border: "1px solid #e6e6e6" }}
          />
        </Dropdown>
      </Space>
      <AddPostWidget
        modalOpen={addPostModalOpen}
        closeModal={() => setAddPostModalOpen(false)}
      />
    </div>
  );
};

export default Header;
