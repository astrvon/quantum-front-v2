"use client";

import { Line } from "@ant-design/plots";
import { Card, Col, Row, Statistic } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const sparkData = [
  { day: "Mon", value: 100 },
  { day: "Tue", value: 120 },
  { day: "Wed", value: 90 },
  { day: "Thu", value: 140 },
  { day: "Fri", value: 110 },
  { day: "Sat", value: 130 },
  { day: "Sun", value: 150 },
];

const StatisticDashboard = () => {
  const t = useTranslations("statisticDashboard");

  const getLineConfig = (color: string) => ({
    data: sparkData,
    xField: "day",
    yField: "value",
    height: 60,
    smooth: true,
    lineStyle: { stroke: color, lineWidth: 2 },
    point: { size: 0 },
    tooltip: false,
    color: color,
  });

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Card size="small">
          <Statistic
            title={t("revenueTrend")}
            value={48500}
            prefix={t("unit.currency")}
          />
          <Line {...getLineConfig("#1890ff")} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card size="small">
          <Statistic title={t("activeVesselsTrend")} value={3} />
          <Line {...getLineConfig("#faad14")} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card size="small">
          <Statistic title={t("ongoingAlarmsTrend")} value={2} />
          <Line {...getLineConfig("#f5222d")} />
        </Card>
      </Col>
    </Row>
  );
};

export default StatisticDashboard;
