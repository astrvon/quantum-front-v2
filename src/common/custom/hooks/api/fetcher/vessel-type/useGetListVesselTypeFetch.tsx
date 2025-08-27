import { IVesselType } from "@/common/interfaces/data/vesselType";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointVesselType } from "../../endpoints/vessel-type.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListVesselTypeParams {
  pagination: IPagination;
  filters?: {
    name?: string;
    typeCode?: string;
    createdBy?: string;
    updatedBy?: string;
    isActive?: boolean;
  };
}

export interface IUseGetListVesselTypeProps {
  params?: IUseGetListVesselTypeParams;
  enabled?: boolean;
}

const useGetListVesselTypeFetch = ({
  params,
  enabled = false,
}: IUseGetListVesselTypeProps) => {
  const fetch = useHandleFetcher<IVesselType[]>({
    key: IFetcherKey.VESSEL_TYPE,
    url: IEndpointVesselType.LIST,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListVesselTypeFetch;
