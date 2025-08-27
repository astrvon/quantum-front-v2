import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const DeleteUserRolesSchemaPayload = z.object({
  userId: z.string().uuid(),
  roleIds: z.array(z.string().uuid()),
});

export type IDeleteUserRolesMutationPayload = z.infer<
  typeof DeleteUserRolesSchemaPayload
>;

export type IDeleteUserRolesMutationReponse = {
  message: string;
  data: { count: number };
};

const useDeleteUserRolesMutation = (
  props?: IBaseMutationProps<IDeleteUserRolesMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteUserRolesMutationReponse>,
    IDeleteUserRolesMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointUsers.USER_ROLES_DELETE,
    onSuccessMessage: "Deleted user roles successfully!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
    },

    refetchKey: [IFetcherKey.USER, IFetcherKey.ROLE],
  });
};

export default useDeleteUserRolesMutation;
