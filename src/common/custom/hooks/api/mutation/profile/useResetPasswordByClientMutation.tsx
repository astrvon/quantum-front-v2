import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IResetPasswordByClientMutationResponse = { message: string };

export const ResetPasswordByClientSchemaPayload = z.object({
  oldPassword: z.string().min(8),
  newPassword: z.string().min(8),
});

export type IResetPasswordByClientMutationPayload = z.infer<
  typeof ResetPasswordByClientSchemaPayload
>;

const useResetPasswordByClientMutation = (
  props?: IBaseMutationProps<IResetPasswordByClientMutationResponse>
) => {
  return useHandleMutation<
    IBaseResponse<IResetPasswordByClientMutationResponse>,
    IResetPasswordByClientMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointUsers.RESET_PASSWORD_BY_CLIENT,
    onSuccessMessage: "Reset password user success!",
    onSuccessCallback: (response) => {
      props?.onSuccessCallback?.(response.data);
    },
    refetchKey: IFetcherKey.PROFILE,
  });
};

export default useResetPasswordByClientMutation;
