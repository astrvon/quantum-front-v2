import { ICompany } from "./company";
import { ICustomer } from "./customer";
import { IUser } from "./user";
import { IVesselShiftSession } from "./vesselShiftSession";
import { IVesselType } from "./vesselType";

export interface IRefVessel {
  id: string;
  vessel_name: string;
  imo_number?: string;
  serial_number?: string;
  built_date?: string;
  built_shipyard?: string;
  created_date: string;
  updated_date?: string;
  deleted_date?: string;
  created_by?: string;
  updated_by?: string;
  is_active: boolean;
  vessel_code: string;
  vessel_project_counter: string;
  gross_register_tonnage?: number;
  deadweight_tonnage?: number;
  lbp?: number;
  bmld?: number;
  hmld?: number;
  flag?: string;
  callsign?: string;
  class_register_number?: string;
  sms_serial_number?: string;
  part_number?: string;
  length_over_all?: number;
  draft_extreme?: number;
  fuel_tank_capacities?: number;
  fresh_water_tank_capacities?: number;
  power?: string;
  speed?: string;
  bollard_pull?: number;
  complement?: number;

  vesselTypeId?: string;
  VesselType?: IVesselType;

  vessel_shift_session_id?: string;
  ref_vessel_shift_session?: IVesselShiftSession;

  company_id: string;
  ref_company?: ICompany;

  customerId?: string;
  Customer?: ICustomer;
  CreatedBy?: IUser;
  UpdatedBy?: IUser;

  _count?: {
    ref_vessel_photo?: number;
  };
}
