import { IUser } from "@/common/interfaces/data/user";

import { IEndpointAuth } from "../endpoints/auth.endpoint.enum";
import useHandleFetcher from "../useHandleFetcher";

import FetcherKey from "./fetchKey";

const useProfileFetch = () => {
  return useHandleFetcher<IUser>({
    key: FetcherKey.PROFILE,
    url: IEndpointAuth.PROFILE,
  });
};

export default useProfileFetch;
