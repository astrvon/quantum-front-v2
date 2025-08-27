import { z } from "zod";

import { setAppCookie } from "@/common/helper/handleCookies";
import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { IAuthState, useAuthStore } from "@/contexts/store/authStore";

import { IEndpointAuth } from "../../endpoints/auth.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type ILoginMutationReponse = {
  accessToken: string;
  profileImage: string;
};

export const LoginSchemaPayload = z.object({
  username: z.string().min(4, "Min 4 characters"),
  email: z.string().email("Invalid email").optional(),
  password: z.string().min(8, "Min 8 characters"),
});

export type ILoginMutationPayload = z.infer<typeof LoginSchemaPayload>;

const useLoginMutation = (
  props?: IBaseMutationProps<IAuthState["user"] & { accessToken: string }>
) => {
  const { setUserByToken, setUserProfileImage } = useAuthStore();

  return useHandleMutation<
    IBaseResponse<ILoginMutationReponse>,
    ILoginMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointAuth.LOGIN,
    onSuccessMessage: "Welcome!",
    onSuccessCallback: (response) => {
      const { accessToken, profileImage } = response.data;
      setUserByToken(accessToken);
      setUserProfileImage(profileImage);

      const { user } = useAuthStore.getState();

      if (user?.refLang) setAppCookie("refLang", user.refLang);
      if (user) props?.onSuccessCallback?.({ ...user, accessToken });
    },
    onErrorMessage: "Oops! Your login details are incorrect.",
    refetchKey: IFetcherKey.PROFILE,
  });
};

export default useLoginMutation;
