import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IVesselType } from "@/common/interfaces/data/vesselType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVesselType } from "../../endpoints/vessel-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IDeleteVesselTypeMutationResponse = Partial<IVesselType>;

export const VesselTypeDeleteSchemaPayload = z.object({
  ids: z.array(z.string().uuid()),
});

export type IDeleteVesselTypeMutationPayload = z.infer<
  typeof VesselTypeDeleteSchemaPayload
>;

const useDeleteVesselTypeMutation = (
  props?: IBaseMutationProps<Partial<IVesselType>>
) => {
  return useHandleMutation<
    IBaseResponse<IDeleteVesselTypeMutationResponse>,
    IDeleteVesselTypeMutationPayload
  >({
    method: IHTTPMethod.DELETE,
    url: IEndpointVesselType.DELETE,
    onSuccessMessage: "Delete vessel type success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Failed to delete vessel type(s). They may not exist or are already deleted.",
    refetchKey: IFetcherKey.VESSEL_TYPE,
  });
};

export default useDeleteVesselTypeMutation;
