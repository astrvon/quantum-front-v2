import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointCustomerType {
  FIND_ONE = IEndpointPrefix.CUSTOMER_TYPE + "/find-one",
  LIST = IEndpointPrefix.CUSTOMER_TYPE + "/list",
  ADD = IEndpointPrefix.CUSTOMER_TYPE + "/add",
  UPDATE = IEndpointPrefix.CUSTOMER_TYPE + "/update",
  DELETE = IEndpointPrefix.CUSTOMER_TYPE,
}
