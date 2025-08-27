"use client";

import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { BankAccountCategoryEnum } from "@/common/interfaces/enum/bankAccountCategory";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointBankAccount } from "../../endpoints/bank-account.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const AddBankAccountSchemaPayload = z.object({
  holderName: z.string(),
  accountNumber: z.string(),
  bankTypeId: z.string().uuid(),
  customerId: z.string().uuid().optional(),
  category: z.enum([
    BankAccountCategoryEnum.USER,
    BankAccountCategoryEnum.CUSTOMER,
  ]),
});

export type IAddBankAccountMutationPayload = z.infer<
  typeof AddBankAccountSchemaPayload
>;

const useAddBankAccountMutation = (
  props?: IBaseMutationProps<IAddBankAccountMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IAddBankAccountMutationPayload>,
    IAddBankAccountMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointBankAccount.ADD,
    onSuccessMessage: "Add bank account success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.BANK_ACCOUNT,
  });
};

export default useAddBankAccountMutation;
