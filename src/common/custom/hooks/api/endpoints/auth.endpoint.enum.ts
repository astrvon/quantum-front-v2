import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointAuth {
  REGISTER = IEndpointPrefix.AUTH + "/register",
  LOGIN = IEndpointPrefix.AUTH + "/login",
  HANDSHAKE = IEndpointPrefix.AUTH + "/handshake",
  PROFILE = IEndpointPrefix.AUTH + "/profile",
}
