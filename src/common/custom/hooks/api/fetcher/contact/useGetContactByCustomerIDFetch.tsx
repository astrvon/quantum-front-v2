import { IContact } from "@/common/interfaces/data/contact";

import { IEndpointContact } from "../../endpoints/contact.endpoint.enum";
import useHandleFetcher from "../../useHandleFetcher";
import IFetcherKey from "../fetchKey";

interface IUseGetContactByUserIDFetchParams {
  customerId: string;
}

export interface IUseGetContactByUserIDFetchProps {
  params: IUseGetContactByUserIDFetchParams;
  enabled?: boolean;
}

const useGetContactByUserIDFetch = ({
  params,
  enabled = true,
}: IUseGetContactByUserIDFetchProps) => {
  return useHandleFetcher<IContact>({
    key: IFetcherKey.CONTACT,
    url: IEndpointContact.CUSTOMER,
    params,
    enabled,
  });
};

export default useGetContactByUserIDFetch;
