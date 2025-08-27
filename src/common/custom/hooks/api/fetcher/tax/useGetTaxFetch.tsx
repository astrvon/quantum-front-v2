import { ITax } from "@/common/interfaces/data/tax";

import { IEndpointTax } from "../../endpoints/tax.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetTaxByCustomerIDFetchParams {
  customerId: string;
}

export interface IUseGetTaxByCustomerIDFetchProps {
  params: IUseGetTaxByCustomerIDFetchParams;
  enabled?: boolean;
}

const useGetTaxByCustomerIDFetch = ({
  params,
  enabled = false,
}: IUseGetTaxByCustomerIDFetchProps) => {
  return useHandleFetcher<ITax>({
    key: IFetcherKey.TAX,
    url: IEndpointTax.CUSTOMER,
    params,
    enabled,
  });
};

export default useGetTaxByCustomerIDFetch;
