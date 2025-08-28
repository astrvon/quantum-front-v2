"use client";

import { Select, SelectProps } from "antd";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC } from "react";

export type ISelectTimePresetValue = "1h" | "1d" | "1w" | "1m" | "2m" | "3m";

export interface ISelectTimePresetProps {
  value: ISelectTimePresetValue;
  onChange?: (
    value: ISelectTimePresetValue,
    range: { startDate: dayjs.Dayjs; endDate: dayjs.Dayjs }
  ) => void;
}

export const SelectTimePreset: FC<ISelectTimePresetProps> = ({
  value = "1d",
  onChange,
}) => {
  const t = useTranslations("selectTimePreset");

  const options: SelectProps["options"] = [
    { label: t("title.1h"), value: "1h" },
    { label: t("title.1d"), value: "1d" },
    { label: t("title.1w"), value: "1w" },
    { label: t("title.1m"), value: "1m" },
    { label: t("title.2m"), value: "2m" },
    { label: t("title.3m"), value: "3m" },
  ];

  const handleChange = (selectedValue: ISelectTimePresetValue) => {
    const endDate = dayjs();
    let startDate = endDate;

    switch (selectedValue) {
      case "1h":
        startDate = endDate.subtract(1, "hour");
        break;
      case "1d":
        startDate = endDate.subtract(1, "day");
        break;
      case "1w":
        startDate = endDate.subtract(1, "week");
        break;
      case "1m":
        startDate = endDate.subtract(1, "month");
        break;
      case "2m":
        startDate = endDate.subtract(2, "month");
        break;
      case "3m":
        startDate = endDate.subtract(3, "month");
        break;
    }

    onChange?.(selectedValue, { startDate, endDate });
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      style={{ minWidth: 200 }}
    />
  );
};
