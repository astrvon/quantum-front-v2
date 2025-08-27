import { Select } from "antd";
import React from "react";

const { Option } = Select;

export const RenderSelectOptions = <T extends object>(
  data: T[] | undefined,
  labelKey: keyof T,
  valueKey: keyof T
) => {
  return data?.map((item) => (
    <Option key={String(item[valueKey])} value={item[valueKey]}>
      {String(item[labelKey])}
    </Option>
  ));
};
