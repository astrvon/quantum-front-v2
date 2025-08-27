import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointVesselType {
  LIST = IEndpointPrefix.VESSEL_TYPE + "/list",
  ADD = IEndpointPrefix.VESSEL_TYPE + "/add",
  UPDATE = IEndpointPrefix.VESSEL_TYPE + "/update",
  DELETE = IEndpointPrefix.VESSEL_TYPE,
}
