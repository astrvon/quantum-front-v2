import { IBankAccount } from "@/common/interfaces/data/bankAccount";
import { IPagination } from "@/common/interfaces/pagination";

import { IEndpointBankAccount } from "../../endpoints/bank-account.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetListBankAccountParams {
  pagination: IPagination;
  customerId: string;
}

export interface IUseGetListBankAccountProps {
  params: IUseGetListBankAccountParams;
  enabled?: boolean;
}

const useGetListBankAccountFetch = ({
  params,
  enabled = false,
}: IUseGetListBankAccountProps) => {
  return useHandleFetcher<IBankAccount[]>({
    key: IFetcherKey.BANK_ACCOUNT,
    url: IEndpointBankAccount.CUSTOMER,
    params,
    enabled,
  });
};

export default useGetListBankAccountFetch;
