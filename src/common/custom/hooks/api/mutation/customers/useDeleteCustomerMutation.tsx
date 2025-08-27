import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCustomers } from "../../endpoints/customers.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const CustomersDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteCustomersMutationPayload = z.infer<
  typeof CustomersDeleteSchemaPayload
>;

const useDeleteCustomersMutation = (
  props?: IBaseMutationProps<IDeleteCustomersMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteCustomersMutationPayload>,
    IDeleteCustomersMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointCustomers.DELETE,
    onSuccessMessage: "Delete customers success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete customer(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.CUSTOMER,
  });
};

export default useDeleteCustomersMutation;
