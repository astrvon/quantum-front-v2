import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ICompany } from "@/common/interfaces/data/company";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCompany } from "../../endpoints/company.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type ICreateCompanyMutationResponse = Partial<ICompany>;

export const CompanyCreateSchemaPayload = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),
  companyCode: z.string().trim().min(3),
  companyCategoryId: z.string().uuid().nullable(),
  address: z.string().trim().nullable().optional(),
  phoneNumber1: z
    .string()
    .trim()
    .max(64, "Max 64 characters")
    .nullable()
    .optional(),
  phoneNumber2: z
    .string()
    .trim()
    .max(64, "Max 64 characters")
    .nullable()
    .optional(),
  fax: z.string().trim().max(64, "Max 64 characters").nullable().optional(),
  email: z.string().trim().email("Invalid email format").nullable().optional(),
  website: z.string().trim().nullable().optional(),
  logoImage: z.string().trim().nullable().optional(),
  userIds: z.array(z.string().uuid()),
});

export type ICreateCompanyMutationPayload = z.infer<
  typeof CompanyCreateSchemaPayload
>;

const useCreateCompanyMutation = (
  props?: IBaseMutationProps<Partial<ICompany>>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateCompanyMutationResponse>,
    ICreateCompanyMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointCompany.ADD,
    onSuccessMessage: "Add company success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.COMPANY,
  });
};

export default useCreateCompanyMutation;
