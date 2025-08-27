export enum IEndpointPrefix {
  AUTH = "auth",
  ACCOUNTS = "accounts",
  USER = "users",
  ROLE = "roles",
  SCOPE = "scopes",
  BANK_TYPE = "bank-type",
  USER_CONTACT = "user-contact",
  USER_TAX_PROFILE = "user-tax-profile",
  USER_BANK_ACCOUNT = "user-bank-account",
  COMPANY = "company",
  COMPANY_CATEGORY = "company-category",
  BANK_ACCOUNT = "bank-account",
  CONTACT = "contact",
  TAX = "tax",
  VESSEL = "vessel",
  VESSEL_TYPE = "vessel-type",
  VESSEL_SHIFT_SESSION = "vessel-shift-session",
  CUSTOMER = "customers",
  CUSTOMER_TYPE = "customer-type",
}

export type IEndpointPrefixType = keyof typeof IEndpointPrefix;
