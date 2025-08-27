import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ICustomerType } from "@/common/interfaces/data/customerType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCustomerType } from "../../endpoints/customer-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const CreateCustomerTypeSchemaPayload = z.object({
  name: z.string().trim().toUpperCase(),
});

export type ICreateCustomerTypeMutationPayload = z.infer<
  typeof CreateCustomerTypeSchemaPayload
>;

export type ICreateCustomerTypeMutationReponse = {
  message: string;
  CustomerType: ICustomerType;
};

const useCreateCustomerTypeMutation = (
  props?: IBaseMutationProps<ICreateCustomerTypeMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateCustomerTypeMutationReponse>,
    ICreateCustomerTypeMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointCustomerType.ADD,
    onSuccessMessage: "Create customer type success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
    },

    refetchKey: [IFetcherKey.CUSTOMER_TYPE],
  });
};

export default useCreateCustomerTypeMutation;
