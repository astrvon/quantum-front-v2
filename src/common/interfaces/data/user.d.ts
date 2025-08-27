import { IRefLangEnum } from "../enum/refLang.enum";

import { ICompanyEmployee } from "./companyEmployee";
import { IUserRole } from "./userRole";

export interface IUser {
  id: string;
  uid: string;

  // data
  name: string;
  username: string;
  email?: string;
  profileImage?: string;
  refLang: IRefLangEnum;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string; // null = not deleted (soft delete)

  // sub
  UserRole?: IUserRole[];

  companyEmployee?: ICompanyEmployee;
}
