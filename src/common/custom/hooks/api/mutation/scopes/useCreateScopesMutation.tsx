import { message } from "antd";
import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IScope } from "@/common/interfaces/data/scope";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointScopes } from "../../endpoints/scope.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const CreateScopesSchemaPayload = z.object({
  name: z.string().min(4).trim().toUpperCase(),
});

export type ICreateScopesMutationPayload = z.infer<
  typeof CreateScopesSchemaPayload
>;

export type ICreateScopeMutationReponse = { message: string; scope: IScope };

const useCreateScopeMutation = (
  props?: IBaseMutationProps<ICreateScopeMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateScopeMutationReponse>,
    ICreateScopesMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointScopes.ADD,
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
      message.success(response.data.message);
    },
    onErrorMessage:
      "Oops! Creation scope fail. Please check if there is duplicate.",
    refetchKey: [IFetcherKey.SCOPE, IFetcherKey.ROLE],
  });
};

export default useCreateScopeMutation;
