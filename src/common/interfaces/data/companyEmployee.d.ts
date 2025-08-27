import { ICompany } from "./company";
import { IUser } from "./user";

export interface ICompanyEmployee {
  id: string;
  User: IUser;
  userId: string;

  Company: ICompany;
  companyId: string;
}
