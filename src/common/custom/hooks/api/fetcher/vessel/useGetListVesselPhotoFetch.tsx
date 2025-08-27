import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListVesselPhotoParams {
  pagination: IPagination;
  filters?: {
    name?: string;
    isActive?: boolean;
    isPanorama?: boolean;
    isCover?: boolean;
    vesselId?: string;
  };
}

export interface IUseGetListVesselPhotoProps {
  params: IUseGetListVesselPhotoParams;
  enabled?: boolean;
}

const useGetListVesselPhotoFetch = ({
  params,
  enabled = false,
}: IUseGetListVesselPhotoProps) => {
  const fetch = useHandleFetcher<IRefVesselPhoto[]>({
    key: IFetcherKey.VESSEL_PHOTO,
    url: IEndpointVessel.LIST_VESSEL_PHOTO,
    params,
    enabled,
  });

  return fetch;
};

export default useGetListVesselPhotoFetch;
