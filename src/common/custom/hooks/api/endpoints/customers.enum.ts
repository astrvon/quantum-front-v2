import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointCustomers {
  LIST = IEndpointPrefix.CUSTOMER + "/list",
  ADD = IEndpointPrefix.CUSTOMER + "/add",
  UPDATE = IEndpointPrefix.CUSTOMER + "/update",
  DELETE = IEndpointPrefix.CUSTOMER,
}
