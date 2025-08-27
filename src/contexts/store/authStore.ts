import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IHandShakeResponse } from "@/common/interfaces/data/handshakeReponse";

import { StorageName } from "../storageName";

export interface IAuthState {
  user: Omit<
    IHandShakeResponse,
    "userId" | "refreshToken" | "accessRight"
  > | null;
  accessRight: IHandShakeResponse["accessRight"];
  token: string | null;
  getSub: (key: keyof Pick<IHandShakeResponse, "userId">) => string | undefined;
  setUserByToken: (token: string, isFromRedirect?: boolean) => void;
  logout: () => void;
  setUserProfileImage: (profileImage?: string) => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      accessRight: [],
      getSub: (key) => {
        const token = get().token;
        if (!token) return undefined;
        const userData = jwtDecode(token) as IHandShakeResponse;

        return userData[key];
      },
      setUserByToken: (token) => {
        if (!token) return undefined;
        const {
          // exclude
          refreshToken: _refreshToken,
          userId: _userId,
          accessRight,
          // clean user data without credential
          ...user
        } = jwtDecode(token) as IHandShakeResponse;

        set({
          user,
          token,
          // @ts-expect-error return from backend is being parse as string
          accessRight: JSON.stringify(accessRight),
        });
      },
      logout: async () => {
        // try {
        //
        // } catch (error) {
        //   message.error("logout error");
        // }
        set({ user: null, token: null });
      },
      setUserProfileImage: (profileImage) => {
        set((prev) => ({
          ...prev,
          user: prev.user ? { ...prev.user, profileImage } : null,
        }));
      },
    }),
    {
      name: StorageName.authStorage.toString(),
    }
  )
);
