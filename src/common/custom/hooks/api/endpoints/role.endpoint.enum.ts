import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointRoles {
  LIST = IEndpointPrefix.ROLE + "/list",
  ADD = IEndpointPrefix.ROLE + "/add",
  UPDATE = IEndpointPrefix.ROLE,
  DELETE = IEndpointPrefix.ROLE,
}
