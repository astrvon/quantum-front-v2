import { ICustomer } from "./customer";

export interface ICustomerType {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;

  Customer?: ICustomer[];
}
