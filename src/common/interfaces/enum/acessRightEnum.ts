import { IActionEnum } from "./action.enum";

// CAREFUL CHANGING THIS
export enum IAccessRightEnum {
  // DASHBOARD
  "DASHBOARD::READ" = "DASHBOARD::" + IActionEnum.READ,
  "DASHBOARD::UPDATE" = "DASHBOARD::" + IActionEnum.UPDATE,
  "DASHBOARD::WRITE" = "DASHBOARD::" + IActionEnum.WRITE,
  "DASHBOARD::DELETE" = "DASHBOARD::" + IActionEnum.DELETE,
}
