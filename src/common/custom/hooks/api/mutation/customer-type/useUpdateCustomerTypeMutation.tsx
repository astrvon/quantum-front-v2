import { message } from "antd";
import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ICustomerType } from "@/common/interfaces/data/customerType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointCustomerType } from "../../endpoints/customer-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const UpdateCustomerTypeSchemaPayload = z.object({
  id: z.string().uuid(),
  name: z.string().trim().toUpperCase().optional(),
  isActive: z.boolean().optional(),
});

export type IUpdateCustomerTypeMutationPayload = z.infer<
  typeof UpdateCustomerTypeSchemaPayload
>;

export type IUpdateCustomerTypeMutationReponse = {
  message: string;
  CustomerType: ICustomerType;
};

const useUpdateCustomerTypeMutation = (
  props?: IBaseMutationProps<IUpdateCustomerTypeMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateCustomerTypeMutationReponse>,
    IUpdateCustomerTypeMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointCustomerType.UPDATE,
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
      message.success(response.data.message);
    },

    refetchKey: [IFetcherKey.CUSTOMER_TYPE],
  });
};

export default useUpdateCustomerTypeMutation;
