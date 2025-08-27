import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointTax {
  CUSTOMER = IEndpointPrefix.TAX + "/customer",
  ME = IEndpointPrefix.TAX + "/me",
  LIST = IEndpointPrefix.TAX + "/list",
  ADD = IEndpointPrefix.TAX + "/add",
  UPDATE = IEndpointPrefix.TAX + "/update",
  DELETE = IEndpointPrefix.TAX,
}
