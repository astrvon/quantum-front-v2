import { IUser } from "./user";
import { IRefVessel } from "./vessel";

export interface IRefVesselPhoto {
  id: string;
  base64: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  createdBy: string;
  updatedBy?: string;
  isPanorama: boolean;
  takenAt?: string;
  name?: string;
  isCover?: boolean;
  isActive: boolean;

  vesselId?: string;
  ref_vessel?: IRefVessel;

  CreatedBy?: IUser;
  UpdatedBy?: IUser;
}
