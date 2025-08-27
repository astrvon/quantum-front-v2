import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRole } from "@/common/interfaces/data/role";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointRoles } from "../../endpoints/role.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteRoleMutationResponse = Partial<IRole>;

export const RoleDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteRoleMutationPayload = z.infer<
  typeof RoleDeleteSchemaPayload
>;

const useDeleteRoleMutation = (props?: IBaseMutationProps<Partial<IRole>>) => {
  return useHandleMutation<
    IBaseResponse<IDeleteRoleMutationResponse>,
    IDeleteRoleMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointRoles.DELETE,
    onSuccessMessage: "Delete roles success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete role(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.ROLE,
  });
};

export default useDeleteRoleMutation;
