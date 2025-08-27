import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IBankType } from "@/common/interfaces/data/bankType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointBankType } from "../../endpoints/bank-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteBankTypeMutationResponse = Partial<IBankType>;

export const BankTypeDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteRoleMutationPayload = z.infer<
  typeof BankTypeDeleteSchemaPayload
>;

const useDeleteBankTypeMutation = (
  props?: IBaseMutationProps<Partial<IBankType>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteBankTypeMutationResponse>,
    IDeleteRoleMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointBankType.DELETE,
    onSuccessMessage: "Delete bank type success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete bank type(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.BANK_TYPE,
  });
};

export default useDeleteBankTypeMutation;
