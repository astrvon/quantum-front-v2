"use client";

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Popconfirm,
  Tag,
  Dropdown,
  MenuProps,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  BsTrash,
  BsPencil,
  BsEye,
  BsFilter,
  BsArrowDownUp,
} from "react-icons/bs";
import { FaCircle } from "react-icons/fa";

interface Vessel {
  key: string;
  name: string;
  type: string;
  status: boolean;
}

const { Search } = Input;

export default function VesselListPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filteredData, setFilteredData] = useState<Vessel[]>([
    { key: "1", name: "Evergreen", type: "Cargo", status: true },
    { key: "2", name: "Maersk", type: "Cargo", status: false },
    { key: "3", name: "Hapag-Lloyd", type: "Tanker", status: true },
  ]);

  const data: Vessel[] = [
    { key: "1", name: "Evergreen", type: "Cargo", status: true },
    { key: "2", name: "Maersk", type: "Cargo", status: false },
    { key: "3", name: "Hapag-Lloyd", type: "Tanker", status: false },
  ];

  const handleDeleteSingle = (key: string) => {
    const newData = filteredData.filter((v) => v.key !== key);
    setFilteredData(newData);
    message.success("Vessel deleted");
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("No vessels selected");
      return;
    }
    const newData = filteredData.filter(
      (v) => !selectedRowKeys.includes(v.key),
    );
    setFilteredData(newData);
    setSelectedRowKeys([]);
    message.success(`${selectedRowKeys.length} vessel(s) deleted`);
  };

  const handleSearch = (value: string) => {
    const filtered = data.filter((vessel) =>
      vessel.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
    setSearchText(value);
  };

  const handleFilter = (status?: boolean) => {
    if (status === undefined) {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((vessel) => vessel.status === status));
    }
  };

  const handleSort = (type: "name" | "type") => {
    const sorted = [...filteredData].sort((a, b) =>
      a[type].localeCompare(b[type]),
    );
    setFilteredData(sorted);
  };

  const columns: ColumnsType<Vessel> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Type", dataIndex: "type", key: "type" },
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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button type="default" icon={<BsEye />} />
          <Button type="primary" icon={<BsPencil />} />
          <Popconfirm
            title="Are you sure to delete this vessel?"
            onConfirm={() => handleDeleteSingle(record.key)}
          >
            <Button type="primary" danger icon={<BsTrash />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
  };

  const filterMenu: MenuProps["items"] = [
    { key: "all", label: "All", onClick: () => handleFilter() },
    { key: "active", label: "Active", onClick: () => handleFilter(true) },
    { key: "inactive", label: "Inactive", onClick: () => handleFilter(false) },
  ];

  const sortMenu: MenuProps["items"] = [
    { key: "name", label: "Sort by Name", onClick: () => handleSort("name") },
    { key: "type", label: "Sort by Type", onClick: () => handleSort("type") },
  ];

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Customer List</h1>
        <p style={{ margin: 0, color: "#666" }}>Daftar pelanggan</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        <Dropdown menu={{ items: filterMenu }} placement="bottomLeft">
          <Button icon={<BsFilter />}>Filter</Button>
        </Dropdown>

        <Dropdown menu={{ items: sortMenu }} placement="bottomLeft">
          <Button icon={<BsArrowDownUp />}>Sort</Button>
        </Dropdown>

        <Search
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          style={{ flex: 1 }}
        />

        <Button
          type="primary"
          danger
          icon={<BsTrash />}
          onClick={handleDeleteSelected}
        >
          Delete
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
      />
    </>
  );
}
