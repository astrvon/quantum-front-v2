import {
  EnvironmentOutlined,
  NumberOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card, Descriptions, Empty, Skeleton, Typography } from "antd";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import useUserContactByUserId from "@/common/custom/hooks/api/fetcher/user-contact/useUserContactByUserId";

interface DetailUserContactTabsParams {
  userId: string;
  enabled: boolean;
  t: (key: string) => string;
}

type ItemType = {
  label: string;
  value: string | null | undefined;
  icon: React.ReactNode;
};

const DetailUserContactTabs = ({
  userId,
  enabled,
  t,
}: DetailUserContactTabsParams) => {
  const { data: userContactData, isLoading } = useUserContactByUserId({
    params: { userId },
    enabled,
  });

  const userContact = userContactData?.data;

  if (isLoading) return <Skeleton active paragraph={{ rows: 4 }} />;
  if (!userContact)
    return <Empty description={t("fallback")} style={{ marginTop: 24 }} />;

  const items: ItemType[] = [
    {
      label: t("fields.phoneNumber"),
      value: userContact?.phoneNumber,
      icon: <PhoneOutlined />,
    },
    {
      label: t("fields.city"),
      value: userContact?.city,
      icon: <EnvironmentOutlined />,
    },
    {
      label: t("fields.address1"),
      value: userContact?.address1,
      icon: <FaMapMarkerAlt />,
    },
    {
      label: t("fields.address2"),
      value: userContact?.address2,
      icon: <FaMapMarkerAlt />,
    },
    {
      label: t("fields.zipCode"),
      value: userContact?.zipCode,
      icon: <NumberOutlined />,
    },
  ];

  return (
    <Card title={t("section.contact")} style={{ marginTop: 12 }}>
      <Descriptions column={1} size="middle" bordered>
        {items.map((item) => (
          <Descriptions.Item
            key={item.label}
            label={
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {item.icon} {item.label}
              </span>
            }
          >
            <Typography.Text>{item.value || t("fallback")}</Typography.Text>
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};

export default DetailUserContactTabs;
