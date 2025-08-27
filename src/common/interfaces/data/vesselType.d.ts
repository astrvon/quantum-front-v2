import { IUser } from "./user";
import { IRefVessel } from "./vessel";

export interface IVesselType {
  id: string;
  name: string;
  description?: string;
  vesselTypeCode?: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  createdBy: string;
  updatedBy?: string;
  isActive: boolean;
  lastNumber?: number;

  ref_vessel?: IRefVessel[];
  CreatedBy?: IUser;
  UpdatedBy?: IUser;
}
