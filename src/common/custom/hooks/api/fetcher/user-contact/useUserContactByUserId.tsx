import { IEndpointUserContact } from "@/common/custom/hooks/api/endpoints/user-contact.endpoint.enum";
import { IUserContact } from "@/common/interfaces/data/userContact";

import useHandleFetcher from "../../useHandleFetcher";
import FetcherKey from "../fetchKey";

interface IUserContactByUserIdParams {
  userId?: string;
}

export interface IUserContactByUserIdProps {
  params: IUserContactByUserIdParams;
  enabled?: boolean;
}

const useUserContactByUserId = ({
  params,
  enabled = false,
}: IUserContactByUserIdProps) => {
  const fetch = useHandleFetcher<Partial<IUserContact>>({
    key: FetcherKey.USER_CONTACT,
    url: IEndpointUserContact.USER_CONTACT_BY_USER_ID,
    params,
    enabled,
  });

  return fetch;
};

export default useUserContactByUserId;
