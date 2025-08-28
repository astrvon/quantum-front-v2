import { IEndpointCustomerType } from "@/common/custom/hooks/api/endpoints/customer-type.endpoint.enum";
import { ICustomerType } from "@/common/interfaces/data/customerType";

import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

export interface IFindOneCustomerTypeProps {
  enabled?: boolean;
}

const useFindOneCustomerType = ({
  enabled = false,
}: IFindOneCustomerTypeProps) => {
  return useHandleFetcher<ICustomerType>({
    key: IFetcherKey.CUSTOMER_TYPE,
    url: IEndpointCustomerType.FIND_ONE,
    enabled,
  });
};

export default useFindOneCustomerType;
