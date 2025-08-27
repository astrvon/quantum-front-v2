import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IUser } from "@/common/interfaces/data/user";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteUserMutationResponse = Partial<IUser>;

export const UserDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteUserMutationPayload = z.infer<
  typeof UserDeleteSchemaPayload
>;

const useDeleteUserMutation = (props?: IBaseMutationProps<Partial<IUser>>) => {
  return useHandleMutation<
    IBaseResponse<IDeleteUserMutationResponse>,
    IDeleteUserMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointUsers.DELETE,
    onSuccessMessage: "Delete user success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete user(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.USER,
  });
};

export default useDeleteUserMutation;
