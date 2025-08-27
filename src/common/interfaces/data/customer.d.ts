import { IContact } from "./contact";
import { ICustomerType } from "./customerType";
import { ITax } from "./tax";

export interface ICustomer {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  contactId?: string;
  Contact?: IContact;
  taxId?: string;
  Tax?: ITax;
  customerTypeId?: string;
  CustomerType?: ICustomerType;
  _count: {
    User: number;
    BankAccount: number;
  };
}
