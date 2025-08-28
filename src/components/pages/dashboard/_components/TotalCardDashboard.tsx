"use client";

import { Card, Col, Flex, Row, Statistic } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { FaGasPump } from "react-icons/fa";
import { RiShip2Line } from "react-icons/ri";

export default function TotalCardDashboard() {
  const t = useTranslations("totalCardDashboard");

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Card>
          <Flex justify="space-between" align="center">
            <Statistic
              title={t("voyage")}
              value={0}
              precision={2}
              suffix={
                <span style={{ marginLeft: 6, color: "gray", fontSize: 16 }}>
                  {t("unit.nm")}
                </span>
              }
            />
            <RiShip2Line size={24} color="#1677ff" />
          </Flex>
        </Card>
      </Col>

      <Col xs={24} md={12}>
        <Card>
          <Flex justify="space-between" align="center">
            <Statistic
              title={t("fuelConsumption")}
              value={0}
              precision={2}
              suffix={
                <span style={{ marginLeft: 6, color: "gray", fontSize: 16 }}>
                  {t("unit.liter")}
                </span>
              }
            />
            <FaGasPump size={24} color="#1677ff" />
          </Flex>
        </Card>
      </Col>
    </Row>
  );
}
