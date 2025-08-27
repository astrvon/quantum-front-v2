import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointContact {
  ME = IEndpointPrefix.CONTACT + "/me",
  CUSTOMER = IEndpointPrefix.CONTACT + "/customer",
  LIST = IEndpointPrefix.CONTACT + "/list",
  ADD = IEndpointPrefix.CONTACT + "/add",
  UPDATE = IEndpointPrefix.CONTACT + "/update",
  DELETE = IEndpointPrefix.CONTACT,
}
