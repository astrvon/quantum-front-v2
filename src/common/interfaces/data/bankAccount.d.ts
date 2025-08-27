import { IBankType } from "./bankType";
import { ICustomer } from "./customer";
import { IUser } from "./user";

export interface IBankAccount {
  id: string;
  accountNumber: string;
  holderName: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  userId?: string;
  User?: IUser;
  customerId?: string;
  Customer?: ICustomer;
  bankTypeId: string;
  BankType: IBankType;
}
