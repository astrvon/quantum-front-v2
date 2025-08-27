import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCustomers } from "../../endpoints/customers.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const UpdateCustomerSchemaPayload = z.object({
  id: z.string().uuid(),
  name: z.string().trim().optional(),
  city: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  isActive: z.boolean().optional(),
  taxId: z.string().uuid().optional(),
  customerTypeId: z.string().uuid().optional(),
});

export type IUpdateCustomerMutationPayload = z.infer<
  typeof UpdateCustomerSchemaPayload
>;

const useUpdateCustomerMutation = (
  props?: IBaseMutationProps<IUpdateCustomerMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateCustomerMutationPayload>,
    IUpdateCustomerMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointCustomers.UPDATE,
    onSuccessMessage: "Update customer success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: [IFetcherKey.CUSTOMER, IFetcherKey.CONTACT],
  });
};

export default useUpdateCustomerMutation;
