"use client";

import { UserOutlined } from "@ant-design/icons";
import { Layout, Avatar, Dropdown, Space, Breadcrumb } from "antd";
import dayjs from "dayjs";
import React, { useState, useEffect, useMemo } from "react";
// import { BsBell } from "react-icons/bs";
import { PiDoorOpen } from "react-icons/pi";

import { useAuthStore } from "@/contexts/store/authStore";
import { useBreadcrumbStore } from "@/contexts/store/breadcrumbStore";

import SearchModal from "./shared/modals/SearchModal";
import { RefLangSwitch } from "./shared/RefLangSwitch";

const { Header } = Layout;

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState(dayjs());
  const { user, logout } = useAuthStore();
  const breadcrumb = useBreadcrumbStore((state) => state.breadcrumb);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(dayjs()), 60000);
    return () => clearInterval(interval);
  }, []);

  const userMenu = useMemo(
    () => ({
      items: [
        {
          key: "logout",
          icon: <PiDoorOpen />,
          label: "Logout",
          onClick: logout,
        },
      ],
    }),
    [logout]
  );

  return (
    <Header
      style={{
        transition: "all 0.3s ease",
        background: "var(--background)",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 50,
        color: "var(--foreground)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            fontSize: 18,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          System Management Service
        </h1>
        <Breadcrumb items={breadcrumb.map((label) => ({ title: label }))} />
      </div>

      <Space size="middle">
        <span style={{ fontSize: 14, color: "#666" }}>
          {dateTime.format("DD MMM YYYY, HH:mm")}
        </span>
        <SearchModal />
        {/* <span className="icon-hover">
          <BsBell size={20} />
        </span> */}
        <RefLangSwitch />
        <Dropdown menu={userMenu} placement="bottomRight" arrow>
          <span className="icon-hover">
            <Avatar
              size="default"
              src={user?.profileImage}
              icon={<UserOutlined />}
            />
          </span>
        </Dropdown>
      </Space>
    </Header>
  );
}
