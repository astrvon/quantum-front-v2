import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointBankAccount {
  CUSTOMER = IEndpointPrefix.BANK_ACCOUNT + "/customer",
  LIST = IEndpointPrefix.BANK_ACCOUNT + "/list",
  ADD = IEndpointPrefix.BANK_ACCOUNT + "/add",
  UPDATE = IEndpointPrefix.BANK_ACCOUNT + "/update",
  DELETE = IEndpointPrefix.BANK_ACCOUNT,
}
