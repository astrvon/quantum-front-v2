import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Modal, Tabs, TabsProps, Tag } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { IUser } from "@/common/interfaces/data/user";
import { formatDate } from "@/common/lib/dayjsDateFormat";
import DocElement from "@/components/shared/DocElement";

import DetailUserBankAccountTabs from "../tabs/DetailUserBankAccountTabs";
import DetailUserContactTabs from "../tabs/DetailUserContactTabs";
import DetailUserTaxProfileTabs from "../tabs/DetailUserTaxProfileTabs";

interface ModalDetailUserParams {
  payload: IUser;
}

const ModalDetailUser = ({ payload }: ModalDetailUserParams) => {
  const t = useTranslations("ModalDetailUser");
  const [isModalOpen, setModalOpen] = useState(false);

  const [activeTabKey, setActiveTabKey] = useState("1");

  const TabsItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <UserOutlined style={{ marginRight: 6 }} />
          Contact
        </span>
      ),
      children: (
        <DetailUserContactTabs
          userId={payload.id}
          enabled={activeTabKey === "1"}
          t={t}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <UserOutlined style={{ marginRight: 6 }} />
          Tax Profile
        </span>
      ),
      children: (
        <DetailUserTaxProfileTabs
          userId={payload.id}
          enabled={activeTabKey === "2"}
          t={t}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <UserOutlined style={{ marginRight: 6 }} />
          Bank Account
        </span>
      ),
      children: (
        <DetailUserBankAccountTabs
          userId={payload.id}
          enabled={activeTabKey === "3"}
          t={t}
        />
      ),
    },
  ];

  return (
    <>
      <Button type="link" onClick={() => setModalOpen(true)}>
        {payload.name}
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={false}
        title={<h3>{t("title")}</h3>}
        style={{ minWidth: "80vw" }}
      >
        <Flex gap={10} style={{ flexDirection: "column" }}>
          <Card>
            <Flex justify="space-between">
              <div style={{ flex: 1 }}>
                <DocElement label={t("fields.name")} data={payload.name} />
                <DocElement
                  label={t("fields.username")}
                  data={payload.username}
                />
                <DocElement
                  label={t("fields.email")}
                  data={payload.email || "-"}
                />
                <DocElement
                  label={t("fields.language")}
                  data={payload.refLang || "-"}
                />
                <DocElement
                  label={t("fields.status")}
                  data={
                    <Tag color={payload.isActive ? "green" : "red"}>
                      {payload.isActive
                        ? t("status.active")
                        : t("status.inactive")}
                    </Tag>
                  }
                />
              </div>
              <div style={{ minWidth: 400, flex: 1 }}>
                <DocElement
                  label={t("fields.createdAt")}
                  data={formatDate(payload.createdAt)}
                />
                <DocElement
                  label={t("fields.updatedAt")}
                  data={formatDate(payload.updatedAt)}
                />
                <DocElement
                  label={t("fields.deletedAt")}
                  data={formatDate(payload.deletedAt)}
                />
              </div>
            </Flex>
          </Card>

          <Tabs
            items={TabsItems}
            type="card"
            defaultActiveKey="1"
            activeKey={activeTabKey}
            onChange={(key) => setActiveTabKey(key)}
          />
        </Flex>
      </Modal>
    </>
  );
};

export default ModalDetailUser;
