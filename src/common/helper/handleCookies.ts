import { setCookie, getCookie, deleteCookie, OptionsType } from "cookies-next";

export const setAppCookie = (
  name: string,
  value: string,
  options: OptionsType = {}
) => {
  setCookie(name, value, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    ...options,
  });
};

export const getAppCookie = (name: string): string | undefined => {
  return getCookie(name) as string | undefined;
};

export const deleteAppCookie = (name: string) => {
  deleteCookie(name);
};
