import { Card, Flex, Form } from "antd";
import React from "react";

export default function VesselAddpage() {
  return (
    <Flex vertical gap={16}>
      <Card title="Add Vessel" aria-description="Add Vessel">
        <Form></Form>
      </Card>
    </Flex>
  );
}
