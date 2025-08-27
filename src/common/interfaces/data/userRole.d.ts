import { IRole } from "./role";
import { IUser } from "./user";

export interface IUserRole {
  id: string;
  roleId: string;
  userId: string;

  user?: IUser;
  role?: IRole;
}
