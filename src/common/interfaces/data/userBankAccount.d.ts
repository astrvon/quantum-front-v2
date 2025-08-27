import { IBankType } from "./bankType";

export interface IUserBankAccount {
  id: string;
  holderName: string;
  accountNumber: string;
  isActive: boolean;
  bankTypeId: string;
  BankType?: IBankType;
}
