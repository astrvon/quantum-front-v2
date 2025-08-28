"use client";

import { Button, Card, Flex, List, Tag } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  ISelectTimePresetValue,
  SelectTimePreset,
} from "./_components/SelectTimePreset";
import StatisticDashboard from "./_components/StatisticDashboard";
import TotalCardDashboard from "./_components/TotalCardDashboard";

export function DashboardPage() {
  const t = useTranslations("dashboardPage");

  const [selectedTimePreset, setSelectedTimePreset] =
    useState<ISelectTimePresetValue>("1d");
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [_endDate, setEndDate] = useState<Dayjs>(startDate);

  return (
    <Flex vertical gap={16}>
      <TotalCardDashboard />
      <StatisticDashboard />

      <Flex gap={10}>
        <SelectTimePreset
          value={selectedTimePreset}
          onChange={(val, range) => {
            setSelectedTimePreset(val);
            setStartDate(range.startDate);
            setEndDate(range.endDate);
          }}
        />
      </Flex>

      <Card title={t("title.recentActivity")}>
        <List
          dataSource={[
            "Evergreen completed voyage #12",
            "Maersk reported low fuel",
            "Hapag-Lloyd engine alert resolved",
            "New user John Doe registered",
            "Maintenance scheduled for vessel XYZ",
          ]}
          renderItem={(item) => (
            <List.Item>
              <Tag color="blue"></Tag>
              <span>{item}</span>
            </List.Item>
          )}
          footer={
            <div style={{ textAlign: "center" }}>
              <Button type="link">{t("button.viewAll")}</Button>
            </div>
          }
        />
      </Card>
    </Flex>
  );
}
