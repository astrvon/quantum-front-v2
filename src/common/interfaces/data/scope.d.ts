import { IRolePermission } from "./rolePermission";

export interface IScope {
  id: string;
  name: string; // e.g., "REPORT", "DASHBOARD", "USER"
  rolePermission?: IRolePermission[]; // Reverse relation
}

export type IScopeResponse = IScope;
