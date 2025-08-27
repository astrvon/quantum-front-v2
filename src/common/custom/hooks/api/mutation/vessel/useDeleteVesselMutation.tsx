import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRefVessel } from "@/common/interfaces/data/vessel";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteVesselMutationResponse = Partial<IRefVessel>;

export const VesselDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteVesselMutationPayload = z.infer<
  typeof VesselDeleteSchemaPayload
>;

const useDeleteVesselMutation = (
  props?: IBaseMutationProps<Partial<IRefVessel>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteVesselMutationResponse>,
    IDeleteVesselMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointVessel.DELETE_VESSEL_PHOTO,
    onSuccessMessage: "Delete vessel success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete vessel photo(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.VESSEL,
  });
};

export default useDeleteVesselMutation;
