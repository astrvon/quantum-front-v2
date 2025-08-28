"use client";

import { UserSwitchOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Flex, Tabs } from "antd";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { RoleTabs } from "./_components/tabs/RoleTabs";
import { ScopeTabs } from "./_components/tabs/ScopeTabs";

const RolePage = () => {
  const t = useTranslations("RolePage");

  const tabItems = useMemo(
    () => [
      {
        key: "1",
        label: (
          <span>
            <UserSwitchOutlined style={{ marginRight: 6 }} />
            Role
          </span>
        ),
        children: <RoleTabs />,
      },
      {
        key: "2",
        label: (
          <span>
            <AppstoreOutlined style={{ marginRight: 6 }} />
            Scope
          </span>
        ),
        children: <ScopeTabs />,
      },
    ],
    []
  );

  return (
    <Flex style={{ flexDirection: "column", gap: 10 }}>
      <h1>{t("title")}</h1>
      <Tabs type="card" defaultActiveKey="1" items={tabItems} />
    </Flex>
  );
};

export default RolePage;
