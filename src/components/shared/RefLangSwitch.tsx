"use client";

import { Dropdown, Flex, MenuProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoLanguageOutline } from "react-icons/io5";

import useUpdateRefLangMutation from "@/common/custom/hooks/api/mutation/profile/useUpdateRefLang";
import { getAppCookie } from "@/common/helper/handleCookies";
import { IRefLangEnum } from "@/common/interfaces/enum/refLang.enum";

const languageOptions: Record<IRefLangEnum, { label: string; flag: string }> = {
  [IRefLangEnum.EN]: { label: "English", flag: "/flags/en.png" },
  [IRefLangEnum.ID]: { label: "Bahasa", flag: "/flags/id.png" },
};

export const RefLangSwitch = () => {
  const [selectedLang, setSelectedLang] = useState<IRefLangEnum>(
    IRefLangEnum.EN,
  );
  const router = useRouter();

  const { mutate, isPending } = useUpdateRefLangMutation({
    onSuccessCallback: () => {
      router.refresh();
    },
  });

  useEffect(() => {
    const langFromCookie = getAppCookie("refLang") as IRefLangEnum;
    if (langFromCookie && languageOptions[langFromCookie]) {
      setSelectedLang(langFromCookie);
    }
  }, []);

  const languageMenu: MenuProps = {
    items: Object.entries(languageOptions).map(([key, { label, flag }]) => ({
      key,
      label: (
        <Flex align="center" gap={8}>
          <Image
            src={flag}
            alt={label}
            width={20}
            height={14}
            style={{ objectFit: "cover", borderRadius: "25%" }}
          />
          <span>{label}</span>
        </Flex>
      ),
    })),
    onClick: ({ key }) => {
      const lang = key as IRefLangEnum;
      setSelectedLang(lang);
      mutate({ refLang: lang });
    },
  };

  return (
    <Dropdown
      menu={languageMenu}
      placement="bottomRight"
      arrow
      trigger={["click"]}
      disabled={isPending}
    >
      <span style={{ position: "relative", cursor: "pointer" }}>
        <Image
          src={languageOptions[selectedLang].flag}
          alt={languageOptions[selectedLang].label}
          width={20}
          height={14}
          style={{ objectFit: "cover", borderRadius: "25%" }}
        />
        <IoLanguageOutline
          size={20}
          style={isPending ? { opacity: 0.5 } : {}}
        />
      </span>
    </Dropdown>
  );
};
