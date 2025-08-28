import { Col, Row } from "antd";
import React from "react";

import useWindowSize from "@/common/custom/hooks/share/useWindowSize";

export const headingStyle = {
  fontSize: "14px",
  fontWeight: "bold",
  margin: 0,
};
export const regularFontStyle = {
  fontSize: "14px",
  margin: 0,
};

const DocElement = ({
  label,
  data,
  colLeft = 11,
  colRight = 12,
  headingStyleType = "bold",
  floatRight = false,
}: {
  label?: string | React.ReactNode;
  data?: string | null | number | React.ReactNode;
  colLeft?: number;
  colRight?: number;
  headingStyleType?: "bold" | "regular";
  floatRight?: boolean;
}) => {
  const { isMobile } = useWindowSize();
  return (
    <Row align="middle">
      <Col span={isMobile ? 24 : colLeft}>
        <p
          style={headingStyleType === "bold" ? headingStyle : regularFontStyle}
        >
          {label}
        </p>
      </Col>
      {!isMobile && (
        <Col span={1}>
          <p style={headingStyle}>:</p>
        </Col>
      )}
      <Col span={isMobile ? 24 : colRight}>
        <Row justify={floatRight ? "end" : "start"}>
          {typeof data === "object" && data}
          {typeof data !== "object" && (
            <p style={regularFontStyle}>{data ?? "-"}</p>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default DocElement;
