import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { IRefLangEnum } from "@/common/interfaces/enum/refLang.enum";
import { loadMessages } from "@/common/lib/loadMessages";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("refLang")?.value || IRefLangEnum.EN;

  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
