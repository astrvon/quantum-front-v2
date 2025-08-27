import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IVesselType } from "@/common/interfaces/data/vesselType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVesselType } from "../../endpoints/vessel-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

import { VesselTypeCreateSchemaPayload } from "./useCreateVesselTypeMutation";

export type IUpdateVesselTypeMutationResponse = Partial<IVesselType>;

export const VesselTypeUpdateSchemaPayload =
  VesselTypeCreateSchemaPayload.partial().extend({
    id: z.string().uuid(),
    isActive: z.boolean().optional(),
  });

export type IUpdateVesselTypeMutationPayload = z.infer<
  typeof VesselTypeUpdateSchemaPayload
>;

const useUpdateVesselTypeMutation = (
  props?: IBaseMutationProps<Partial<IVesselType>>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateVesselTypeMutationResponse>,
    IUpdateVesselTypeMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointVesselType.UPDATE,
    onSuccessMessage: "Update vessel type success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.VESSEL_TYPE,
  });
};

export default useUpdateVesselTypeMutation;
