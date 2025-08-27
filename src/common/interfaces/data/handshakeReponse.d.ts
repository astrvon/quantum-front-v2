// import { ValueOf } from "next/dist/shared/lib/constants";
import { IUser } from "./user";

type ValueOf<T> = T[keyof T];

export interface IHandShakeResponse
  extends Pick<
    IUser,
    | "name"
    | "username"
    | "email"
    | "profileImage"
    | "refLang"
    | "isActive"
    | "createdAt"
    | "updatedAt"
    | "deletedAt"
  > {
  userId: string;
  refreshToken: string;
  accessRight: IAccessRightEnum[];
}
