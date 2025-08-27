import { IActionEnum } from "../enum/action.enum";

import { IRole } from "./role";
import { IScope } from "./scope";

export interface IRolePermission {
  id: string;
  role: IRole;
  roleId: string;

  scope: IScope;
  scopeId: string;

  action: IActionEnum;
}
