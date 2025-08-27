import { z } from "zod";

import { setAppCookie } from "@/common/helper/handleCookies";
import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { IAuthState, useAuthStore } from "@/contexts/store/authStore";

import { IEndpointAuth } from "../../endpoints/auth.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IRegisterMutationReponse = {
  accessToken: string;
  profileImage: string;
};

export const RegisterSchemaPayload = z.object({
  name: z.string().min(6, "Name must be at least 6 characters long").optional(),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .trim(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type IRegisterMutationPayload = z.infer<typeof RegisterSchemaPayload>;

const useRegisterMutation = (
  props?: IBaseMutationProps<IAuthState["user"] & { accessToken: string }>
) => {
  const { setUserByToken, setUserProfileImage } = useAuthStore();

  return useHandleMutation<
    IBaseResponse<IRegisterMutationReponse>,
    IRegisterMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointAuth.REGISTER,
    onSuccessMessage: "Registration successful!",
    onSuccessCallback: (response) => {
      const { accessToken, profileImage } = response.data;
      setUserByToken(accessToken);
      setUserProfileImage(profileImage);
      const { user } = useAuthStore.getState();
      if (user?.refLang) setAppCookie("refLang", user.refLang);
      if (user) props?.onSuccessCallback?.({ ...user, accessToken });
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: [IFetcherKey.PROFILE, IFetcherKey.USER],
  });
};

export default useRegisterMutation;
