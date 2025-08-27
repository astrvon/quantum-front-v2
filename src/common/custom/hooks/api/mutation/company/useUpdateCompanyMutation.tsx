import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ICompany } from "@/common/interfaces/data/company";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCompany } from "../../endpoints/company.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateCompanyMutationResponse = Partial<ICompany>;

export const CompanyUpdateSchemaPayload = z.object({
  id: z.string().uuid(),
  companyName: z.string().min(1).nullable().optional(),
  companyCode: z.string().min(1).nullable().optional(),
  companyCategoryId: z.string().min(1).nullable().optional(),
  address: z.string().min(1).trim().nullable().optional(),
  phoneNumber1: z.string().min(1).trim().nullable().optional(),
  phoneNumber2: z.string().min(1).trim().nullable().optional(),
  fax: z.string().min(1).trim().nullable().optional(),
  email: z
    .string()
    .min(1)
    .trim()
    .email("Invalid email format")
    .nullable()
    .optional(),
  website: z
    .string()
    .min(1)
    .trim()
    .url("Invalid url format")
    .nullable()
    .optional(),
  logoImage: z.string().min(1).nullable().optional(),
  isActive: z.boolean().optional(),
  userIds: z.array(z.string().uuid()).optional(),
});

export type IUpdateCompanyMutationPayload = z.infer<
  typeof CompanyUpdateSchemaPayload
>;

const useUpdateCompanyMutation = (
  props?: IBaseMutationProps<Partial<ICompany>>,
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateCompanyMutationResponse>,
    IUpdateCompanyMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointCompany.UPDATE,
    onSuccessMessage: "Update company success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.COMPANY,
  });
};

export default useUpdateCompanyMutation;
