"use client";

import React, { useState, useEffect } from "react";
import { Layout, Avatar, Dropdown, Space, Breadcrumb } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { BsBell, BsGlobe } from "react-icons/bs";
import { PiDoorOpen } from "react-icons/pi";
import { useBreadcrumbStore } from "@/contexts/store/breadcrumbStore";

const { Header } = Layout;

export default function Navbar() {
  const breadcrumb = useBreadcrumbStore((state) => state.breadcrumb);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const userMenu = {
    items: [{ key: "logout", icon: <PiDoorOpen />, label: "Logout" }],
  };

  const languageMenu = {
    items: [
      { key: "en", label: "English" },
      { key: "id", label: "Indonesia" },
    ],
  };

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
          style={{ fontSize: 18, fontWeight: 600, margin: 0, lineHeight: 1.3 }}
        >
          System Management Service
        </h1>
        <Breadcrumb items={breadcrumb.map((label) => ({ title: label }))} />
      </div>

      <Space size="middle">
        <span className="icon-hover">
          <BsBell size={20} />
        </span>

        <Dropdown menu={languageMenu} placement="bottomRight" arrow>
          <span className="icon-hover">
            <BsGlobe size={20} />
          </span>
        </Dropdown>

        <Dropdown menu={userMenu} placement="bottomRight" arrow>
          <span className="icon-hover">
            <Avatar size="default" icon={<UserOutlined />} />
          </span>
        </Dropdown>
      </Space>
    </Header>
  );
}
