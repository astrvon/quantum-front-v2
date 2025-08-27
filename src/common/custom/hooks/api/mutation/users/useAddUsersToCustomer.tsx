import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const AddUsersToCustomerSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
  customerId: z.string().uuid(),
});

export type IAddUsersToCustomerMutationPayload = z.infer<
  typeof AddUsersToCustomerSchemaPayload
>;

export type IAddUsersToCustomerMutationResponse = {
  message: string;
};

const useAddUsersToCustomerMutation = (
  props?: IBaseMutationProps<IAddUsersToCustomerMutationResponse>
) => {
  return useHandleMutation<
    IBaseResponse<IAddUsersToCustomerMutationResponse>,
    IAddUsersToCustomerMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointUsers.ADD_TO_CUSTOMER,
    onSuccessMessage: "Add users to customer success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
    },
    refetchKey: [IFetcherKey.USER, IFetcherKey.CUSTOMER],
  });
};

export default useAddUsersToCustomerMutation;
