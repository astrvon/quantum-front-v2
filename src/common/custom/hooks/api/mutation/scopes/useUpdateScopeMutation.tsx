import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IScope } from "@/common/interfaces/data/scope";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointScopes } from "../../endpoints/scope.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateScopeMutationResponse = Partial<IScope>;

export const ScopeUpdateSchemaPayload = z.object({
  id: z.string().uuid(),
  name: z.string().min(4).trim().toUpperCase(),
});

export type IUpdateScopeMutationPayload = z.infer<
  typeof ScopeUpdateSchemaPayload
>;

const useUpdateScopeMutation = (
  props?: IBaseMutationProps<Partial<IScope>>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateScopeMutationResponse>,
    IUpdateScopeMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointScopes.UPDATE,
    onSuccessMessage: "Update scope success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: [IFetcherKey.SCOPE, IFetcherKey.ROLE],
  });
};

export default useUpdateScopeMutation;
