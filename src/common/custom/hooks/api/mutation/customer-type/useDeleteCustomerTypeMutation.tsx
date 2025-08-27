import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ICustomerType } from "@/common/interfaces/data/customerType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCustomerType } from "../../endpoints/customer-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteCustomerTypeMutationResponse = Partial<ICustomerType>;

export const CustomerTypeDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteRoleMutationPayload = z.infer<
  typeof CustomerTypeDeleteSchemaPayload
>;

const useDeleteCustomerTypeMutation = (
  props?: IBaseMutationProps<Partial<ICustomerType>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteCustomerTypeMutationResponse>,
    IDeleteRoleMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointCustomerType.DELETE,
    onSuccessMessage: "Delete customer type success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete customer type(s). They may not exist or are already deleted.",
    refetchKey: [IFetcherKey.CUSTOMER_TYPE],
  });
};

export default useDeleteCustomerTypeMutation;
