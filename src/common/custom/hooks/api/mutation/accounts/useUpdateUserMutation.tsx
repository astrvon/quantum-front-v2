import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IUser } from "@/common/interfaces/data/user";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateUserMutationResponse = Partial<IUser>;

export const UserUpdateSchemaPayload = z.object({
  id: z.string().uuid(),
  isActive: z.boolean().optional(),
  name: z.string().min(6, "Name must be at least 6 characters long").optional(),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

export type IUpdateUserMutationPayload = z.infer<
  typeof UserUpdateSchemaPayload
>;

const useUpdateUserMutation = (props?: IBaseMutationProps<Partial<IUser>>) => {
  return useHandleMutation<
    IBaseResponse<IUpdateUserMutationResponse>,
    IUpdateUserMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointUsers.UPDATE,
    onSuccessMessage: "Update user success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.USER,
  });
};

export default useUpdateUserMutation;
