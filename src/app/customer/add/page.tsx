"use client";

import { Card, Flex, Form, Input, Select } from "antd";
import React from "react";

export default function CustomerAddPage() {
  const [form] = Form.useForm();

  return (
    <Flex vertical gap={16}>
      <Card title="Add Vessel" aria-description="Add Vessel">
        <Form form={form} layout="vertical">
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="container">Container</Select.Option>
              <Select.Option value="tanker">Tanker</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Length" name="length">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Width" name="width">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Height" name="height">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Draft" name="draft">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Gross Tonnage" name="grossTonnage">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Net Tonnage" name="netTonnage">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="IMO Number" name="imoNumber">
            <Input />
          </Form.Item>
          <Form.Item label="MMSI Number" name="mmsiNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Callsign" name="callsign">
            <Input />
          </Form.Item>
          <Form.Item label="Flag" name="flag">
            <Input />
          </Form.Item>
          <Form.Item label="Owner" name="owner">
            <Input />
          </Form.Item>
          <Form.Item label="Manager" name="manager">
            <Input />
          </Form.Item>
          <Form.Item label="Agent" name="agent">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Notes" name="notes">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
