"use client";

import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { BankAccountCategoryEnum } from "@/common/interfaces/enum/bankAccountCategory";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointBankAccount } from "../../endpoints/bank-account.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const UpdateBankAccountSchemaPayload = z.object({
  id: z.string().uuid(),
  holderName: z.string().optional(),
  accountNumber: z.string().optional(),
  bankTypeId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
  category: z
    .enum([BankAccountCategoryEnum.USER, BankAccountCategoryEnum.CUSTOMER])
    .optional(),
  customerId: z.string().uuid().optional(),
});

export type IUpdateBankAccountMutationPayload = z.infer<
  typeof UpdateBankAccountSchemaPayload
>;

const useUpdateBankAccountMutation = (
  props?: IBaseMutationProps<IUpdateBankAccountMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateBankAccountMutationPayload>,
    IUpdateBankAccountMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointBankAccount.UPDATE,
    onSuccessMessage: "Update contact success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage: "Oops! Something went wrong.",
    refetchKey: IFetcherKey.BANK_ACCOUNT,
  });
};

export default useUpdateBankAccountMutation;
