import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteVesselPhotoMutationResponse = Partial<IRefVesselPhoto>;

export const VesselPhotoDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteVesselPhotoMutationPayload = z.infer<
  typeof VesselPhotoDeleteSchemaPayload
>;

const useDeleteVesselPhotoMutation = (
  props?: IBaseMutationProps<Partial<IRefVesselPhoto>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteVesselPhotoMutationResponse>,
    IDeleteVesselPhotoMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointVessel.DELETE_VESSEL_PHOTO,
    onSuccessMessage: "Delete vessel photo success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete vessel(s). They may not exist or are already deleted.",
    refetchKey: [IFetcherKey.VESSEL, IFetcherKey.VESSEL_PHOTO],
  });
};

export default useDeleteVesselPhotoMutation;
