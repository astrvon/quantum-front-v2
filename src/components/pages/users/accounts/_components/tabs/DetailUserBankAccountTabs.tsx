import { UserOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Row, Skeleton, Space, Typography } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { AiOutlineCreditCard } from "react-icons/ai";
import { RiBankFill } from "react-icons/ri";

import useUserBankAccountByUserId from "@/common/custom/hooks/api/fetcher/user-bank-account/useUserBankAccontByUserId";

interface DetailUserBankAccountTabsParams {
  userId: string;
  enabled: boolean;
  t: ReturnType<typeof useTranslations>;
}

const DetailUserBankAccountTabs = ({
  userId,
  enabled,
  t,
}: DetailUserBankAccountTabsParams) => {
  const { data: userBankAccountData, isLoading } = useUserBankAccountByUserId({
    params: { userId },
    enabled,
  });

  const userBankAccounts = userBankAccountData?.data;

  if (isLoading) return <Skeleton active paragraph={{ rows: 4 }} />;
  if (!userBankAccounts || userBankAccounts.length === 0)
    return <Empty description={t("fallback")} style={{ marginTop: 24 }} />;

  return (
    <Card title={t("section.bankAccount")} style={{ marginTop: 12 }}>
      <Row gutter={[12, 12]}>
        {userBankAccounts.map((account) => {
          const items = [
            {
              label: t("fields.bank"),
              value: account?.BankType?.name,
              icon: <RiBankFill />,
            },
            {
              label: t("fields.accountHolder"),
              value: account?.holderName,
              icon: <UserOutlined />,
            },
            {
              label: t("fields.accountNumber"),
              value: account?.accountNumber,
              icon: <AiOutlineCreditCard />,
            },
          ];

          return (
            <Col key={account?.id} xs={24} sm={12} md={8}>
              <Card
                size="small"
                style={{
                  height: "100%",
                  border: "1px solid #f0f0f0",
                  boxShadow: "none",
                }}
                styles={{ body: { padding: 12 } }}
              >
                <Row gutter={[8, 12]}>
                  {items.map((item) => (
                    <Col span={24} key={item.label}>
                      <Space direction="horizontal" align="start">
                        <div style={{ fontSize: 18 }}>{item.icon}</div>
                        <div>
                          <Typography.Text
                            type="secondary"
                            style={{ fontSize: 14 }}
                          >
                            {item.label}
                          </Typography.Text>
                          <br />
                          <Typography.Text style={{ fontSize: 14 }}>
                            {item.value || t("fallback")}
                          </Typography.Text>
                        </div>
                      </Space>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default DetailUserBankAccountTabs;
