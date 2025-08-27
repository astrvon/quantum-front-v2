import { ICompanyEmployee } from "./companyEmployee";

export interface ICompany {
  id: string;
  company_name: string;
  company_category_id: string;
  address?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  fax?: string;
  company_code?: string;
  email?: string;
  website?: string;
  created_date: string;
  updated_date: string;
  deleted_date?: string;
  is_active: boolean;
  logo_image?: string;

  CompanyEmployee?: ICompanyEmployee[];
}
