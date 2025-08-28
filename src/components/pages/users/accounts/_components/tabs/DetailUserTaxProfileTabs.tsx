import {
  FileProtectOutlined,
  IdcardOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { Card, Descriptions, Empty, Skeleton, Typography } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

import useUserTaxProfileByUserId from "@/common/custom/hooks/api/fetcher/user-tax-profile/useUserTaxProfileByUserId";

interface DetailUserTaxProfileTabsParams {
  userId: string;
  enabled: boolean;
  t: ReturnType<typeof useTranslations>;
}

type ItemType = {
  label: string;
  value: string | null | undefined;
  icon: React.ReactNode;
};

const DetailUserTaxProfileTabs = ({
  userId,
  enabled,
  t,
}: DetailUserTaxProfileTabsParams) => {
  const { data: userTaxProfileData, isLoading } = useUserTaxProfileByUserId({
    params: { userId },
    enabled,
  });

  const userTaxProfile = userTaxProfileData?.data;

  if (isLoading) return <Skeleton active paragraph={{ rows: 4 }} />;
  if (!userTaxProfile)
    return <Empty description={t("fallback")} style={{ marginTop: 24 }} />;

  const items: ItemType[] = [
    {
      label: t("fields.npwp"),
      value: userTaxProfile?.npwp,
      icon: <IdcardOutlined />,
    },
    {
      label: t("fields.fgPpn"),
      value:
        typeof userTaxProfile?.fgPpn === "boolean"
          ? userTaxProfile.fgPpn
            ? t("boolean.yes")
            : t("boolean.no")
          : undefined,
      icon: <PercentageOutlined />,
    },
    {
      label: t("fields.nppkp"),
      value: userTaxProfile?.nppkp,
      icon: <FileProtectOutlined />,
    },
  ];

  return (
    <Card title={t("section.taxProfile")} style={{ marginTop: 12 }}>
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
            <Typography.Text type={item.value ? undefined : "secondary"}>
              {item.value || t("fallback")}
            </Typography.Text>
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};

export default DetailUserTaxProfileTabs;
