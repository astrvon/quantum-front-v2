import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ICompany } from "@/common/interfaces/data/company";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCompany } from "../../endpoints/company.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteCompanyMutationResponse = Partial<ICompany>;

export const CompanyDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteCompanyMutationPayload = z.infer<
  typeof CompanyDeleteSchemaPayload
>;

const useDeleteCompanyMutation = (
  props?: IBaseMutationProps<Partial<ICompany>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteCompanyMutationResponse>,
    IDeleteCompanyMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointCompany.DELETE,
    onSuccessMessage: "Delete company success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete company(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.COMPANY,
  });
};

export default useDeleteCompanyMutation;
