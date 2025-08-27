import { message } from "antd";
import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IBankType } from "@/common/interfaces/data/bankType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointBankType } from "../../endpoints/bank-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const CreateBankTypeSchemaPayload = z.object({
  name: z.string(),
  bankCode: z.string().toUpperCase(),
});

export type ICreateBankTypeMutationPayload = z.infer<
  typeof CreateBankTypeSchemaPayload
>;

export type ICreateBankTypeMutationReponse = {
  message: string;
  bankType: IBankType;
};

const useCreateBankTypeMutation = (
  props?: IBaseMutationProps<ICreateBankTypeMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateBankTypeMutationReponse>,
    ICreateBankTypeMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointBankType.ADD,
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
      message.success(response.data.message);
    },

    refetchKey: IFetcherKey.BANK_TYPE,
  });
};

export default useCreateBankTypeMutation;
