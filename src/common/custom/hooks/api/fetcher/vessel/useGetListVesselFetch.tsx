import { IRefVessel } from "@/common/interfaces/data/vessel";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListVesselParams {
  pagination: IPagination;
  filters?: {
    vesselName?: string;
    vesselCode?: string;
    createdBy?: string;
    updatedBy?: string;
    isActive?: boolean;
    isCompany?: boolean;
    isCustomer?: boolean;
  };
}

export interface IUseGetListVesselProps {
  params: IUseGetListVesselParams;
  enabled?: boolean;
}

const useGetListVesselFetch = ({
  params,
  enabled = false,
}: IUseGetListVesselProps) => {
  const fetch = useHandleFetcher<IRefVessel[]>({
    key: IFetcherKey.VESSEL,
    url: IEndpointVessel.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListVesselFetch;
