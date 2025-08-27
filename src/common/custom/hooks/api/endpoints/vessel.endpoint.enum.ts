import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointVessel {
  LIST = IEndpointPrefix.VESSEL + "/list",
  ADD = IEndpointPrefix.VESSEL + "/add",
  UPDATE = IEndpointPrefix.VESSEL + "/update",
  DELETE = IEndpointPrefix.VESSEL,
  LIST_VESSEL_PHOTO = IEndpointPrefix.VESSEL + "/photo/list",
  ADD_VESSEL_PHOTO = IEndpointPrefix.VESSEL + "/photo/add",
  UPDATE_VESSEL_PHOTO = IEndpointPrefix.VESSEL + "/photo/update",
  DELETE_VESSEL_PHOTO = IEndpointPrefix.VESSEL + "/photo",
}
