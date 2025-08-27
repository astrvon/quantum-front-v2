import { toNumber } from "lodash";

const config = {
  baseEndpoint: process.env.NEXT_PUBLIC_API_BASE_URL || "ENDPOINT NOT FOUND",
  baseEndpointVersion: toNumber(process.env.NEXT_PUBLIC_API_BASE_VERSION || 1),
  headerToken: process.env.NEXT_PUBLIC_API_HEADER_TOKEN_KEY || "",
};

export default config;
