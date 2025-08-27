import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointUsers } from "../../endpoints/users.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const RemoveUsersFromCustomerSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
  customerId: z.string().uuid(),
});

export type IRemoveUsersFromCustomerMutationPayload = z.infer<
  typeof RemoveUsersFromCustomerSchemaPayload
>;

export type IRemoveUsersFromCustomerMutationResponse = {
  message: string;
};

const useRemoveUsersFromCustomerMutation = (
  props?: IBaseMutationProps<IRemoveUsersFromCustomerMutationResponse>
) => {
  return useHandleMutation<
    IBaseResponse<IRemoveUsersFromCustomerMutationResponse>,
    IRemoveUsersFromCustomerMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointUsers.REMOVE_FROM_CUSTOMER,
    onSuccessMessage: "Remove users from customer success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
    },
    refetchKey: [IFetcherKey.USER, IFetcherKey.CUSTOMER],
  });
};

export default useRemoveUsersFromCustomerMutation;
