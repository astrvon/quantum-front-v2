import "antd/dist/reset.css";
import "./globals.css";
import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

import { loadMessages } from "@/common/lib/loadMessages";
import Dashboard from "@/components/Dashboard";

import Provider from "./provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "System Management Service",
  title: "SMS Quantum",
  description: "SMS Quantum - System Management Service | Quantum Pesona Dunia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await loadMessages(locale);
  return (
    <html
      lang={locale}
      className={plusJakartaSans.className}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <Dashboard>{children}</Dashboard>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
