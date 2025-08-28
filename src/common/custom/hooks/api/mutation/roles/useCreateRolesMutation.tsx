import { message } from "antd";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRole } from "@/common/interfaces/data/role";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
import { IRoleForm } from "@/components/pages/users/roles/_components/modals/ModalAddRole";

import { IEndpointRoles } from "../../endpoints/role.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type ICreateRoleMutationReponse = { message: string; role: IRole };

const useCreateRoleMutation = (
  props?: IBaseMutationProps<ICreateRoleMutationReponse>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateRoleMutationReponse>,
    IRoleForm
  >({
    method: IHTTPMethod.POST,
    url: IEndpointRoles.ADD,
    // onSuccessMessage: "Role created",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props.onSuccessCallback(response.data);
      message.info(response.data.message);
    },
    onErrorMessage:
      "Oops! Creation Role fail. Please check if there is duplicate.",
    refetchKey: IFetcherKey.ROLE,
  });
};

export default useCreateRoleMutation;
