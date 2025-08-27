import { IUser } from "./user";
import { IRefVessel } from "./vessel";

export interface IVesselShiftSession {
  id: string;
  shift_name: string;
  description?: string;
  created_date: string;
  updated_date?: string;
  created_by: string;
  updated_by?: string;
  is_active: boolean;

  ref_vessel?: IRefVessel[];
  CreatedBy?: IUser;
  UpdatedBy?: IUser;
}
