"use client";

import { useState } from "react";
import {
  Card,
  Statistic,
  Row,
  Col,
  Table,
  Input,
  Select,
  Tag,
  Calendar,
  Avatar,
  List,
} from "antd";
import {
  BsCheckCircle,
  BsCurrencyDollar,
  BsExclamationCircle,
  BsInfoCircle,
  BsPeople,
} from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { Line } from "@ant-design/plots";

const { Search } = Input;
const { Option } = Select;

export default function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [timeFilter, setTimeFilter] = useState("1h");

  const dataSource = [
    {
      key: 1,
      vesselName: "Evergreen",
      distance: 120,
      fuel: 5000,
      readDate: "2025-08-21",
      status: true,
      ongoingAlarm: "None",
      tracking: "View",
    },
    {
      key: 2,
      vesselName: "Maersk",
      distance: 95,
      fuel: 3200,
      readDate: "2025-08-20",
      status: false,
      ongoingAlarm: "Low Fuel",
      tracking: "View",
    },
    {
      key: 3,
      vesselName: "Hapag-Lloyd",
      distance: 150,
      fuel: 4500,
      readDate: "2025-08-19",
      status: true,
      ongoingAlarm: "Engine Alert",
      tracking: "View",
    },
  ].filter((item) =>
    item.vesselName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "No", dataIndex: "key", key: "no" },
    { title: "Vessel Name", dataIndex: "vesselName", key: "vesselName" },
    { title: "Distance (NM)", dataIndex: "distance", key: "distance" },
    {
      title: "Total Fuel Consumption (L)",
      dataIndex: "fuel",
      key: "fuel",
      render: (val: number) => val.toLocaleString(),
    },
    { title: "Read Date", dataIndex: "readDate", key: "readDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <Tag
          color={status ? "green" : "red"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            width: "fit-content",
          }}
        >
          <FaCircle size={10} />
          {status ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    { title: "On Going Alarm", dataIndex: "ongoingAlarm", key: "ongoingAlarm" },
    { title: "Tracking", dataIndex: "tracking", key: "tracking" },
  ];

  const sparkData = [
    { day: "Mon", value: 100 },
    { day: "Tue", value: 120 },
    { day: "Wed", value: 90 },
    { day: "Thu", value: 140 },
    { day: "Fri", value: 110 },
    { day: "Sat", value: 130 },
    { day: "Sun", value: 150 },
  ];

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
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Statistic title="Revenue" value={48500000} prefix="Rp" />
              <BsCurrencyDollar size={24} />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Statistic title="New Users" value={812} />
              <BsPeople size={24} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card size="small">
            <Statistic title="Revenue Trend" value={48500} prefix="Rp" />
            <Line {...getLineConfig("#1890ff")} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small">
            <Statistic title="Active Vessels Trend" value={3} />
            <Line {...getLineConfig("#faad14")} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small">
            <Statistic title="Ongoing Alarms Trend" value={2} />
            <Line {...getLineConfig("#f5222d")} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Search
            placeholder="Search vessel"
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Select
            defaultValue="1h"
            style={{ width: "100%" }}
            onChange={(value) => setTimeFilter(value)}
          >
            <Option value="1h">1 hour ago</Option>
            <Option value="1d">1 day ago</Option>
            <Option value="1w">1 week ago</Option>
            <Option value="1m">1 month ago</Option>
            <Option value="2m">2 months ago</Option>
            <Option value="3m">3 months ago</Option>
          </Select>
        </Col>
      </Row>

      <Table bordered dataSource={dataSource} columns={columns} />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card title="Recent Activity">
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
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            title="Calendar"
            style={{
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Calendar fullscreen={false} style={{ width: "100%" }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
