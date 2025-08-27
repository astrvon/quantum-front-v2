import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { BankAccountCategoryEnum } from "@/common/interfaces/enum/bankAccountCategory";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointBankAccount } from "../../endpoints/bank-account.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const DeleteBankAccountSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
  category: z.enum([
    BankAccountCategoryEnum.USER,
    BankAccountCategoryEnum.CUSTOMER,
  ]),
  customerId: z.string().uuid().optional(),
});

export type IDeleteBankAccountMutationPayload = z.infer<
  typeof DeleteBankAccountSchemaPayload
>;

const useDeleteBankAccountMutation = (
  props?: IBaseMutationProps<IDeleteBankAccountMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteBankAccountMutationPayload>,
    IDeleteBankAccountMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointBankAccount.DELETE,
    onSuccessMessage: "Delete bank account success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete bank account(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.BANK_ACCOUNT,
  });
};

export default useDeleteBankAccountMutation;
