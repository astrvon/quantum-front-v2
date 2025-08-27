import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointScopes {
  LIST = IEndpointPrefix.SCOPE + "/list",
  ADD = IEndpointPrefix.SCOPE + "/add",
  UPDATE = IEndpointPrefix.SCOPE,
  DELETE = IEndpointPrefix.SCOPE,
}
