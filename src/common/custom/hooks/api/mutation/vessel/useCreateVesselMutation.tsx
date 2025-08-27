import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRefVessel } from "@/common/interfaces/data/vessel";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type ICreateVesselMutationResponse = Partial<IRefVessel>;

export const VesselCreateSchemaPayload = z.object({
  vesselName: z.string(),
  imoNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  builtDate: z.coerce.date().optional(),
  builtShipyard: z.string().optional(),
  vesselCode: z.string(),
  vesselProjectCounter: z.number().optional(),
  grossRegisterTonnage: z.number().optional(),
  deadweightTonnage: z.number().optional(),
  lbp: z.number().optional(),
  bmld: z.number().optional(),
  hmld: z.number().optional(),
  flag: z.string().optional(),
  callsign: z.string().optional(),
  classRegisterNumber: z.string().optional(),
  smsSerialNumber: z.string().optional(),
  partNumber: z.string().optional(),
  lengthOverAll: z.number().optional(),
  draftExtreme: z.number().optional(),
  fuelTankCapacities: z.number().optional(),
  freshWaterTankCapacities: z.number().optional(),
  power: z.string().optional(),
  speed: z.string().optional(),
  bollardPull: z.number().optional(),
  complement: z.number().int().optional(),

  shiftSessionId: z.string().uuid().optional(),
  vesselTypeId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  customerId: z.string().uuid().optional(),
});

export type ICreateVesselMutationPayload = z.infer<
  typeof VesselCreateSchemaPayload
>;

const useCreateVesselMutation = (
  props?: IBaseMutationProps<Partial<IRefVessel>>
) => {
  return useHandleMutation<
    IBaseResponse<ICreateVesselMutationResponse>,
    ICreateVesselMutationPayload
  >({
    method: IHTTPMethod.POST,
    url: IEndpointVessel.ADD,
    onSuccessMessage: "Add vessel success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.VESSEL,
  });
};

export default useCreateVesselMutation;
