import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const CreateUserRolesSchemaPayload = z.object({
  userId: z.string().uuid(),
  roleIds: z.array(z.string().uuid()),
});

export type ICreateUserRolesMutationPayload = z.infer<
  typeof CreateUserRolesSchemaPayload
>;

export type ICreateUserRolesMutationReponse = {
  message: string;
  data: { count: number };
};

const useCreateUserRolesMutation = (
  props?: IBaseMutationProps<ICreateUserRolesMutationReponse>,
) => {
  return useHandleMutation<
    IBaseResponse<ICreateUserRolesMutationReponse>,
    ICreateUserRolesMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointUsers.USER_ROLES_CREATE,
    onSuccessMessage: "Created user roles successfully!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
    },
    // onErrorMessage: "Failed to create user roles.",
    refetchKey: [IFetcherKey.USER, IFetcherKey.ROLE],
  });
};

export default useCreateUserRolesMutation;
