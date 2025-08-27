// src/components/Dashboard.tsx
"use client";

import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const { Content } = Layout;

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: Readonly<DashboardProps>) {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Sidebar />

      <Layout style={{ position: "relative" }}>
        <Navbar />
        <Content
          style={{
            padding: "12px 24px",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
