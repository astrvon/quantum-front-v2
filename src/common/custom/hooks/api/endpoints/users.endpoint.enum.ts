import { IEndpointPrefix } from "../endpointPrefix.enum";

export enum IEndpointUsers {
  LIST = IEndpointPrefix.USER + "/list",
  UPDATE = IEndpointPrefix.USER,
  DELETE = IEndpointPrefix.USER,
  USER_ROLES_CREATE = IEndpointPrefix.USER + "/user-roles",
  USER_ROLES_DELETE = IEndpointPrefix.USER + "/user-roles",
  UPDATE_REF_LANG = IEndpointPrefix.USER + "/ref-lang",
  GENERATE_RESET_PASSWORD_URL = IEndpointPrefix.USER +
    "/generate-reset-password-url",
  UPDATE_PROFILE = IEndpointPrefix.USER + "/profile",
  RESET_PASSWORD_BY_CLIENT = IEndpointPrefix.USER + "/reset-password-by-client",
  LIST_USER_BY_COMPANY_ID = IEndpointPrefix.USER + "/list-user-by-company-id",
  ADD_TO_CUSTOMER = IEndpointPrefix.USER + "/add-to-customer",
  REMOVE_FROM_CUSTOMER = IEndpointPrefix.USER + "/remove-from-customer",
}
