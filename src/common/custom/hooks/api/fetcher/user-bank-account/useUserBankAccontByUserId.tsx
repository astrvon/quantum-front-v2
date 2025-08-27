import { IEndpointUserBankAccount } from "@/common/customHooks/api/endpoints/user-bank-account.endpoint.enum";
import { IUserBankAccount } from "@/common/interfaces/data/userBankAccount";

import useHandleFetcher from "../../useHandleFetcher";
import FetcherKey from "../fetchKey";

interface IUserBankAccountByUserIdParams {
  userId?: string;
}

export interface IUserBankAccountByUserIdProps {
  params: IUserBankAccountByUserIdParams;
  enabled?: boolean;
}

const useUserBankAccountByUserId = ({
  params,
  enabled = false,
}: IUserBankAccountByUserIdProps) => {
  const fetch = useHandleFetcher<Partial<IUserBankAccount[]>>({
    key: FetcherKey.USER_BANK_ACCOUNT,
    url: IEndpointUserBankAccount.USER_BANK_ACCOUNT_BY_USER_ID,
    params,
    enabled,
  });

  return fetch;
};

export default useUserBankAccountByUserId;
