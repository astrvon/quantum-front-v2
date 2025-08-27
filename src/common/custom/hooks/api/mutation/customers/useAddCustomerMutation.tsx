import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCustomers } from "../../endpoints/customers.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const AddCustomerSchemaPayload = z.object({
  name: z.string(),
  customerTypeId: z.string().uuid().optional(),
  city: z.string(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string(),
});

export type IAddCustomerMutationPayload = z.infer<
  typeof AddCustomerSchemaPayload
>;

const useAddCustomerMutation = (
  props?: IBaseMutationProps<IAddCustomerMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IAddCustomerMutationPayload>,
    IAddCustomerMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointCustomers.ADD,
    onSuccessMessage: "Add customer success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: [IFetcherKey.CUSTOMER, IFetcherKey.CONTACT],
  });
};

export default useAddCustomerMutation;
