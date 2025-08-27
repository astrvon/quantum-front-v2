import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointBankType {
  LIST = IEndpointPrefix.BANK_TYPE + "/list",
  ADD = IEndpointPrefix.BANK_TYPE + "/add",
  UPDATE = IEndpointPrefix.BANK_TYPE + "/update",
  DELETE = IEndpointPrefix.BANK_TYPE,
}
