"use client";

import { Select } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useUpdateRefLangMutation from "@/common/custom/hooks/api/mutation/profile/useUpdateRefLang";
import { getAppCookie } from "@/common/helper/handleCookies";
import { IRefLangEnum } from "@/common/interfaces/enum/refLang.enum";

const { Option } = Select;

const flagWrapperStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const languageOptions: Record<IRefLangEnum, { label: string; flag: string }> = {
  [IRefLangEnum.EN]: {
    label: "English",
    flag: "/flags/en.png",
  },
  [IRefLangEnum.ID]: {
    label: "Bahasa",
    flag: "/flags/id.png",
  },
};

const RefLangSwitch = () => {
  const [selectedLang, setSelectedLang] = useState<IRefLangEnum>(
    IRefLangEnum.EN
  );
  const router = useRouter();

  const { mutate, isPending } = useUpdateRefLangMutation({
    onSuccessCallback: () => {
      router.refresh();
    },
  });

  useEffect(() => {
    const langFromCookie = getAppCookie("refLang") as IRefLangEnum;
    if (
      langFromCookie &&
      Object.keys(languageOptions).includes(langFromCookie)
    ) {
      setSelectedLang(langFromCookie);
    }
  }, []);

  const handleChange = (value: IRefLangEnum) => {
    setSelectedLang(value);
    mutate({ refLang: value });
  };

  return (
    <Select
      value={selectedLang}
      onChange={handleChange}
      style={{ width: 180 }}
      loading={isPending}
    >
      {Object.entries(languageOptions).map(([key, { label, flag }]) => (
        <Option key={key} value={key}>
          <div style={flagWrapperStyle}>
            <Image
              src={flag}
              alt={label}
              width={20}
              height={14}
              style={{ marginRight: 8, borderRadius: 2 }}
            />
            {label}
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default RefLangSwitch;
