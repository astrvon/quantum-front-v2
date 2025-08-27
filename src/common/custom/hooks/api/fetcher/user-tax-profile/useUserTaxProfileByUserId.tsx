import { IEndpointUserTaxProfile } from "@/common/customHooks/api/endpoints/user-tax-profile.endpoint.enum";
import { IUserTaxProfile } from "@/common/interfaces/data/userTaxProfile";

import useHandleFetcher from "../../useHandleFetcher";
import FetcherKey from "../fetchKey";

interface IUserTaxProfileByUserIdParams {
  userId?: string;
}

export interface IUserTaxProfileByUserIdProps {
  params: IUserTaxProfileByUserIdParams;
  enabled?: boolean;
}

const useUserTaxProfileByUserId = ({
  params,
  enabled = false,
}: IUserTaxProfileByUserIdProps) => {
  const fetch = useHandleFetcher<Partial<IUserTaxProfile>>({
    key: FetcherKey.USER_TAX_PROFILE,
    url: IEndpointUserTaxProfile.USER_TAX_PROFILE_BY_USER_ID,
    params,
    enabled,
  });

  return fetch;
};

export default useUserTaxProfileByUserId;
