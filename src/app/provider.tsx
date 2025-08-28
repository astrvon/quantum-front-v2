"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp, ConfigProvider, unstableSetRender } from "antd";
import { ThemeProvider } from "next-themes";
import React from "react";

import { queryClient } from "@/common/lib/queryClient";
import Hydration from "@/contexts/hydration";

import AuthProvider from "./auth-provider";

unstableSetRender((node, container) => {
  // @ts-expect-error typeof primitive
  container._reactRoot ||= createRoot(container);
  // @ts-expect-error typeof primitive
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

// Client-only
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Hydration />
      <AntdRegistry>
        <AntdApp>
          <ConfigProvider>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </AntdApp>
      </AntdRegistry>
    </ThemeProvider>
  );
}
