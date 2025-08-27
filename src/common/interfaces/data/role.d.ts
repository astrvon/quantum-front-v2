import { IRolePermission } from "./rolePermission";
import { IUserRole } from "./userRole";

export interface IRole {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  rolePermissions: IRolePermission[]; // JOIN table with Scope + Action
  UserRole?: IUserRole[];
}

export interface IRoleResponse extends IRole {
  totalUser: number;
  totalReadPermission: number;
  totalWritePermission: number;
  totalUpdatePermission: number;
  totalDeletePermission: number;
}
