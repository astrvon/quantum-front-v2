import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IScope } from "@/common/interfaces/data/scope";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointScopes } from "../../endpoints/scope.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteScopeMutationResponse = Partial<IScope>;

export const ScopeDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteScopeMutationPayload = z.infer<
  typeof ScopeDeleteSchemaPayload
>;

const useDeleteScopeMutation = (
  props?: IBaseMutationProps<Partial<IScope>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteScopeMutationResponse>,
    IDeleteScopeMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointScopes.DELETE,
    onSuccessMessage: "Delete scopes success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete scope(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.SCOPE,
  });
};

export default useDeleteScopeMutation;
