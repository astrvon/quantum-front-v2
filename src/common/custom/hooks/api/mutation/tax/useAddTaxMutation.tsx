import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { TaxCategoryEnum } from "@/common/interfaces/enum/taxCategory.enum";

import { IEndpointTax } from "../../endpoints/tax.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const AddTaxSchemaPayload = z.object({
  npwp: z.string().optional(),
  fgPpn: z.string().optional(),
  nppkp: z.string().optional(),
  customerId: z.string().uuid(),
  category: z.enum([TaxCategoryEnum.USER, TaxCategoryEnum.CUSTOMER]),
});

export type IAddTaxMutationPayload = z.infer<typeof AddTaxSchemaPayload>;

const useAddTaxMutation = (
  props?: IBaseMutationProps<IAddTaxMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IAddTaxMutationPayload>,
    IAddTaxMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointTax.ADD,
    onSuccessMessage: "Add tax information success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: [IFetcherKey.TAX, IFetcherKey.CUSTOMER],
  });
};

export default useAddTaxMutation;
