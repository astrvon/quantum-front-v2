import { phone } from "phone";
import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IUser } from "@/common/interfaces/data/user";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { useAuthStore } from "@/contexts/store/authStore";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateProfileMutationResponse = Partial<IUser>;

export const ProfileUpdateSchemaPayload = z.object({
  name: z.string().min(6, "Name must be at least 6 characters long").optional(),
  email: z.string().email("Invalid email address").optional(),
  phoneNumber: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || phone(val, { country: "ID" }).isValid, {
      message: "Invalid Indonesian phone number",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  profileImage: z.string().optional(),
});

export type IUpdateProfileMutationPayload = z.infer<
  typeof ProfileUpdateSchemaPayload
>;

const useUpdateProfileMutation = (
  props?: IBaseMutationProps<Partial<IUser>>
) => {
  const { setUserProfileImage } = useAuthStore();

  return useHandleMutation<
    IBaseResponse<IUpdateProfileMutationResponse>,
    IUpdateProfileMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointUsers.UPDATE_PROFILE,
    onSuccessMessage: "Update user success!",
    onSuccessCallback: (response) => {
      if (response.data.profileImage)
        setUserProfileImage(response.data.profileImage);
      props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.PROFILE,
  });
};

export default useUpdateProfileMutation;
