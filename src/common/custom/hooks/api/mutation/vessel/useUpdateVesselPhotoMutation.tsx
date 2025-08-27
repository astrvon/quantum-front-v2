import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

import { VesselPhotoCreateSchemaPayload } from "./useCreateVesselPhotoMutation";

export type IUpdateVesselPhotoMutationResponse = Partial<IRefVesselPhoto>;

export const VesselPhotoUpdateSchemaPayload =
  VesselPhotoCreateSchemaPayload.extend({
    id: z.string().uuid(),
    isActive: z.boolean().optional(),
  });

export type IUpdateVesselPhotoMutationPayload = z.infer<
  typeof VesselPhotoUpdateSchemaPayload
>;

const useUpdateVesselPhotoMutation = (
  props?: IBaseMutationProps<Partial<IRefVesselPhoto>>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateVesselPhotoMutationResponse>,
    IUpdateVesselPhotoMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointVessel.UPDATE_VESSEL_PHOTO,
    onSuccessMessage: "Update vessel photo success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: [IFetcherKey.VESSEL, IFetcherKey.VESSEL_PHOTO],
  });
};

export default useUpdateVesselPhotoMutation;
