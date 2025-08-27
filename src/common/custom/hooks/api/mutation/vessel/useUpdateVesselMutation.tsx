import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { IRefVessel } from "@/common/interfaces/data/vessel";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export type IUpdateVesselMutationResponse = Partial<IRefVessel>;

export const VesselUpdateSchemaPayload = z.object({
  id: z.string().uuid(),

  vesselName: z.string().trim().min(1).nullable().optional(),
  imoNumber: z.string().trim().nullable().optional(),
  serialNumber: z.string().trim().nullable().optional(),
  builtDate: z.coerce.date().optional(),
  builtShipyard: z.string().trim().nullable().optional(),
  vesselCode: z.string().trim().min(1).nullable().optional(),
  vesselProjectCounter: z.number().int().optional(),
  grossRegisterTonnage: z.number().optional(),
  deadweightTonnage: z.number().optional(),
  lbp: z.number().optional(),
  bmld: z.number().optional(),
  hmld: z.number().optional(),
  flag: z.string().trim().nullable().optional(),
  callsign: z.string().trim().nullable().optional(),
  classRegisterNumber: z.string().trim().nullable().optional(),
  smsSerialNumber: z.string().trim().nullable().optional(),
  partNumber: z.string().trim().nullable().optional(),
  lengthOverAll: z.number().optional(),
  draftExtreme: z.number().optional(),
  fuelTankCapacities: z.number().optional(),
  freshWaterTankCapacities: z.number().optional(),
  power: z.string().trim().nullable().optional(),
  speed: z.string().trim().nullable().optional(),
  bollardPull: z.number().optional(),
  complement: z.number().int().optional(),

  shiftSessionId: z.string().uuid().optional(),
  vesselTypeId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  customerId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
});

export type IUpdateVesselMutationPayload = z.infer<
  typeof VesselUpdateSchemaPayload
>;

const useUpdateVesselMutation = (
  props?: IBaseMutationProps<Partial<IRefVessel>>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateVesselMutationResponse>,
    IUpdateVesselMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointVessel.UPDATE,
    onSuccessMessage: "Update vessel success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.VESSEL,
  });
};

export default useUpdateVesselMutation;
