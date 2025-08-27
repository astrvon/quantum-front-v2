import { IUser } from "./user";

export interface IUserTaxProfile {
  id: string;
  npwp?: string;
  fgPpn?: string;
  nppkp?: string;

  userId: string;
  User?: IUser;
}
