"use client";

import { Button, Typography, Result } from "antd";
import Link from "next/link";

const { Paragraph, Text: AntText } = Typography;

const NotFoundPage = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background)",
        padding: "2rem",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/" passHref>
            <Button type="primary" size="large">
              Go Home 🏠
            </Button>
          </Link>
        }
      >
        <div style={{ marginTop: 24 }}>
          <Paragraph>
            <AntText type="secondary">
              You may have mistyped the address, or the page has been moved.
            </AntText>
          </Paragraph>
        </div>
      </Result>
    </div>
  );
};

export default NotFoundPage;
