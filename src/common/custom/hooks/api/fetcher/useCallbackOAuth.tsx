import { IUser } from "@/common/interfaces/data/user";

import useHandleFetcher from "../useHandleFetcher";

import FetcherKey from "./fetchKey";

export interface ITransactionsFetchProps {
  code: string | null;
  challengeId: string | null;
  enabled?: boolean;
}

const useCallbackOAuth = ({
  code,
  challengeId,
  enabled,
}: ITransactionsFetchProps) => {
  const fetch = useHandleFetcher<IUser>({
    key: FetcherKey.OAUTH,
    url: "auth/twitter-x/callback",
    params: { code, challengeId },
    enabled,
  });

  return fetch;
};

export default useCallbackOAuth;
