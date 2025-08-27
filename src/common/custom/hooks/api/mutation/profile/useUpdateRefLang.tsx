import { z } from "zod";

import { setAppCookie } from "@/common/helper/handleCookies";
import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IUser } from "@/common/interfaces/data/user";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateRefLangMutationResponse = Partial<IUser>;

export const RefLangUpdateSchemaPayload = z.object({
  refLang: z.enum(["en", "id"]),
});

export type IUpdateRefLangMutationPayload = z.infer<
  typeof RefLangUpdateSchemaPayload
>;

const useUpdateRefLangMutation = (
  props?: IBaseMutationProps<Partial<IUser>>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateRefLangMutationResponse>,
    IUpdateRefLangMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointUsers.UPDATE_REF_LANG,
    onSuccessMessage: "Update reference language user success!",
    onSuccessCallback: (response) => {
      if (response.data.refLang) setAppCookie("refLang", response.data.refLang);
      props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage: "Update reference language user failed!",
    refetchKey: IFetcherKey.PROFILE,
  });
};

export default useUpdateRefLangMutation;
