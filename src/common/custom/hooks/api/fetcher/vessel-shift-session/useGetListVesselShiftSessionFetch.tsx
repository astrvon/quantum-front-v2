import { IVesselShiftSession } from "@/common/interfaces/data/vesselShiftSession";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointVesselShiftSession } from "../../endpoints/vessel-shift-session.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListVesselShiftSessionParams {
  pagination: IPagination;
  filters?: {
    name?: string;
    createdBy?: string;
    updatedBy?: string;
    isActive?: boolean;
  };
}

export interface IUseGetListVesselShiftSessionProps {
  params: IUseGetListVesselShiftSessionParams;
  enabled?: boolean;
}

const useGetListVesselShiftSessionFetch = ({
  params,
  enabled = false,
}: IUseGetListVesselShiftSessionProps) => {
  const fetch = useHandleFetcher<IVesselShiftSession[]>({
    key: IFetcherKey.VESSEL_SHIFT_SESSION,
    url: IEndpointVesselShiftSession.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListVesselShiftSessionFetch;
