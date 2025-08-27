import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IVesselType } from "@/common/interfaces/data/vesselType";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVesselType } from "../../endpoints/vessel-type.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type ICreateVesselTypeMutationResponse = Partial<IVesselType>;

export const VesselTypeCreateSchemaPayload = z.object({
  name: z.string().toUpperCase(),
  description: z.string().optional(),
  vesselTypeCode: z.string().toUpperCase().optional(),
  lastNumber: z.number().optional(),
});

export type ICreateVesselTypeMutationPayload = z.infer<
  typeof VesselTypeCreateSchemaPayload
>;

const useCreateVesselTypeMutation = (
  props?: IBaseMutationProps<Partial<IVesselType>>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateVesselTypeMutationResponse>,
    ICreateVesselTypeMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointVesselType.ADD,
    onSuccessMessage: "Add vessel type success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.VESSEL_TYPE,
  });
};

export default useCreateVesselTypeMutation;
