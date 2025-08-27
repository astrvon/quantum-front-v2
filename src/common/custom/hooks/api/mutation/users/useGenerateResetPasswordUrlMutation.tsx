import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IGenerateResetPasswordUrlMutationReponse = {
  url: string;
};

export const GenerateResetPasswordUrlSchemaPayload = z.object({
  id: z.string(),
});

export type IGenerateResetPasswordUrlMutationPayload = z.infer<
  typeof GenerateResetPasswordUrlSchemaPayload
>;

const useGenerateResetPasswordUrlMutation = (
  props?: IBaseMutationProps<IGenerateResetPasswordUrlMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<IGenerateResetPasswordUrlMutationReponse>,
    IGenerateResetPasswordUrlMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointUsers.GENERATE_RESET_PASSWORD_URL,
    onSuccessMessage: "Generate reset password success!",
    onSuccessCallback: (response) => {
      props?.onSuccessCallback?.(response.data);
    },
    refetchKey: IFetcherKey.USER,
  });
};

export default useGenerateResetPasswordUrlMutation;
