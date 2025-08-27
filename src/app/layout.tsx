import { loadMessages } from "@/common/lib/loadMessages";
import "./globals.css";
import Dashboard from "@/components/Dashboard";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  applicationName: "System Management Service",
  title: "SMS Quantum",
  description: "SMS Quantum - System Management Service | Quantum Pesona Dunia",
};

const theme: ThemeConfig = {};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await loadMessages(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ConfigProvider theme={theme}>
            <Dashboard>{children}</Dashboard>
          </ConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
