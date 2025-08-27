import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointCompany {
  LIST = IEndpointPrefix.COMPANY + "/list",
  ADD = IEndpointPrefix.COMPANY + "/add",
  UPDATE = IEndpointPrefix.COMPANY + "/update",
  DELETE = IEndpointPrefix.COMPANY,
}
