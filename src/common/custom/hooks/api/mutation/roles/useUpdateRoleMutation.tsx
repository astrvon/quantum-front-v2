import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRole } from "@/common/interfaces/data/role";
import { IActionEnum } from "@/common/interfaces/enum/action.enum";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointRoles } from "../../endpoints/role.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateRoleMutationResponse = Partial<IRole>;

export const RoleUpdateSchemaPayload = z.object({
  id: z.string().uuid(),
  name: z.string().min(4).trim().toUpperCase().optional(),
  description: z.string().trim().optional(),
  isActive: z.boolean().optional(),
  scopes: z
    .array(
      z.object({
        scope: z.string(),
        permissions: z
          .array(
            z.enum([
              IActionEnum.READ,
              IActionEnum.WRITE,
              IActionEnum.UPDATE,
              IActionEnum.DELETE,
            ])
          )
          .min(1),
      })
    )
    .optional(),
});

export type IUpdateRoleMutationPayload = z.infer<
  typeof RoleUpdateSchemaPayload
>;

const useUpdateRoleMutation = (props?: IBaseMutationProps<Partial<IRole>>) => {
  return useHandleMutation<
    IBaseResponse<IUpdateRoleMutationResponse>,
    IUpdateRoleMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointRoles.UPDATE,
    onSuccessMessage: "Update roles success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.ROLE,
  });
};

export default useUpdateRoleMutation;
