"use client";

import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Flex } from "antd";
import type { MenuProps } from "antd";
import {
  BsLayoutSidebar,
  BsGrid,
  BsPlus,
  BsList,
  BsPerson,
  BsGear,
} from "react-icons/bs";
import { RiShip2Line } from "react-icons/ri";
import Image from "next/image";
import { useBreadcrumbStore } from "@/contexts/store/breadcrumbStore";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>("/");
  const setBreadcrumb = useBreadcrumbStore((state) => state.setBreadcrumb);
  const router = useRouter();
  const pathname = usePathname();

  const toggleCollapsed = () => setCollapsed((v) => !v);

  const items: MenuProps["items"] = [
    {
      type: "group",
      label: "Main",
      children: [
        { key: "/", icon: <BsGrid />, label: "Dashboard" },
        {
          key: "/vessels",
          icon: <RiShip2Line />,
          label: "Vessels",
          children: [
            { key: "/vessels/list", icon: <BsList />, label: "List" },
            { key: "/vessels/add", icon: <BsPlus />, label: "Add Vessel" },
          ],
        },
      ],
    },
    {
      type: "group",
      label: "Settings",
      children: [
        { key: "/profile", icon: <BsPerson />, label: "Profile" },
        { key: "/settings", icon: <BsGear />, label: "Settings" },
      ],
    },
  ];

  const findBreadcrumb = (
    key: string,
    menuItems: MenuProps["items"]
  ): string[] | null => {
    for (const item of menuItems || []) {
      if (!item) continue;
      const hasLabel = "label" in item;
      if (item.type === "group" && "children" in item && item.children) {
        const res = findBreadcrumb(key, item.children);
        if (res && hasLabel) return [item.label as string, ...res];
      }
      if (item.key === key && hasLabel) return [item.label as string];
      if ("children" in item && item.children) {
        const res = findBreadcrumb(key, item.children);
        if (res && hasLabel) return [item.label as string, ...res];
      }
    }
    return null;
  };

  useEffect(() => {
    const key = pathname || "/";
    setSelectedKey(key);
    const labels = findBreadcrumb(key, items) || [];
    setBreadcrumb(labels);
  }, [pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      style={{
        background: "#0a1a2a",
        borderRight: "1px solid #F5F5FA",
      }}
    >
      <div style={{ position: "sticky", top: 0 }}>
        <Flex
          align="center"
          justify="space-between"
          style={{ height: 64, padding: "0 12px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              src={collapsed ? "/static/logo.png" : "/static/logo_banner.png"}
              alt="Logo"
              width={collapsed ? 24 : 120}
              height={24}
              style={{
                objectFit: "contain",
                // transition: "all 0.2s",
              }}
              priority
            />
          </div>

          <Button
            type="text"
            size="small"
            icon={<BsLayoutSidebar size={16} />}
            onClick={toggleCollapsed}
            style={{ color: "#e8f1f2" }}
          />
        </Flex>

        <Menu
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          style={{
            borderRight: 0,
            paddingTop: 8,
            backgroundColor: "#0a1a2a",
            color: "#e8f1f2 !important",
          }}
          onClick={({ key }) => {
            setSelectedKey(key);
            const labels = findBreadcrumb(key, items) || [];
            setBreadcrumb(labels);

            router.push(key);
          }}
        />
      </div>
    </Sider>
  );
}
