"use client";

import React, { useState } from "react";
import { Tag, Segmented, Card, Descriptions } from "antd";
import Title from "antd/es/typography/Title";

export default function ProfilePage() {
  const user = {
    name: "Agus Kebab Bakar",
    email: "aguskebabbakar@mailnesia.com",
    avatar:
      "https://s3.nyeki.dev/nekos-api/images/original/393e69ca-b54e-4306-ae81-d609ac8e9dcd.webp",
  };

  const [active, setActive] = useState("Contact");

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 24 }}>Profile</h1>
        <p style={{ margin: 0, color: "#666" }}>
          Manage your profile information
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <img
          src={user.avatar}
          alt="avatar"
          style={{
            width: 85,
            height: 85,
            borderRadius: "50%",
            border: "2px solid #ccc",
            objectFit: "cover",
          }}
        />
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 26, fontWeight: 600 }}>{user.name}</h2>
          <p style={{ fontWeight: 400, fontSize: 16, color: "#666" }}>
            @aguskebab | {user.email} | <Tag color="success">Company</Tag>
          </p>
        </div>
      </div>

      <Segmented
        options={["Contact", "Bank Account", "Tax"]}
        value={active}
        onChange={(value) => setActive(value)}
        style={{ marginBottom: 16 }}
        size="large"
      />

      <div>
        {active === "Contact" && (
          <Card title="Contact">
            <Descriptions
              column={2}
              layout="vertical"
              styles={{
                label: { fontWeight: 600, fontSize: 16 },
                content: { fontSize: 16 },
              }}
            >
              <Descriptions.Item
                label="Name"
                styles={{
                  label: { color: "var(--foreground)", fontWeight: 600 },
                  content: { color: "var(--foreground)" },
                }}
              >
                Agus Kebab Bakar
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
        {active === "Bank Account" && <p>Bank account info goes here</p>}
        {active === "Tax" && <p>Tax info goes here</p>}
      </div>
    </div>
  );
}
