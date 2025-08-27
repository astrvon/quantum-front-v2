import { IBankType } from "@/common/interfaces/data/bankType";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointBankType } from "../../endpoints/bank-type.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListBankTypeParams {
  pagination: IPagination;
  filters?: {
    name?: string;
  };
}

export interface IUseGetListBankTypeProps {
  params: IUseGetListBankTypeParams;
  enabled?: boolean;
}

const useGetListBankTypeFetch = ({
  params,
  enabled = false,
}: IUseGetListBankTypeProps) => {
  return useHandleFetcher<IBankType[]>({
    key: IFetcherKey.BANK_TYPE,
    url: IEndpointBankType.LIST,
    params,
    enabled,
  });
};

export default useGetListBankTypeFetch;
