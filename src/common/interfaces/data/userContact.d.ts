import { IUser } from "./user";

export interface IUserContact {
  id: string;
  city: string;
  address1?: string;
  address2?: string;
  zipCode?: string;
  phoneNumber: string;

  userId: string;
  User?: IUser;
}
