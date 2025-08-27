import { message } from "antd";
import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IBankType } from "@/common/interfaces/data/bankType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointBankType } from "../../endpoints/bank-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const UpdateBankTypeSchemaPayload = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  bankCode: z.string().toUpperCase().optional(),
  isActive: z.boolean().optional(),
});

export type IUpdateBankTypeMutationPayload = z.infer<
  typeof UpdateBankTypeSchemaPayload
>;

export type IUpdateBankTypeMutationReponse = {
  message: string;
  bankType: IBankType;
};

const useUpdateBankTypeMutation = (
  props?: IBaseMutationProps<IUpdateBankTypeMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateBankTypeMutationReponse>,
    IUpdateBankTypeMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointBankType.UPDATE,
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
      message.success(response.data.message);
    },

    refetchKey: IFetcherKey.BANK_TYPE,
  });
};

export default useUpdateBankTypeMutation;
