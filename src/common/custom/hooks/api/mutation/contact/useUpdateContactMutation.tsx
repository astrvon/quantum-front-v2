import { z } from "zod";

import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
import { IBaseResponse } from "@/common/interfaces/baseResponse";
import { ContactCategoryEnum } from "@/common/interfaces/enum/contactCategory.enum";
import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

import { IEndpointContact } from "../../endpoints/contact.endpoint.enum";
import IFetcherKey from "../../fetcher/fetchKey";
import useHandleMutation from "../../useHandleMutation";

export const UpdateContactSchemaPayload = z.object({
  id: z.string().uuid().optional(),
  city: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  zipCode: z.string().optional(),
  phoneNumber: z.string().optional(),
  isActive: z.boolean().optional(),
  customerId: z.string().optional(),
  category: z.enum([ContactCategoryEnum.USER, ContactCategoryEnum.CUSTOMER]),
});

export type IUpdateContactMutationPayload = z.infer<
  typeof UpdateContactSchemaPayload
>;

const useUpdateContactMutation = (
  props?: IBaseMutationProps<IUpdateContactMutationPayload>
) => {
  return useHandleMutation<
    IBaseResponse<IUpdateContactMutationPayload>,
    IUpdateContactMutationPayload
  >({
    method: IHTTPMethod.PATCH,
    url: IEndpointContact.UPDATE,
    onSuccessMessage: "Update contact success!",
    onSuccessCallback: (response) => {
      if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
    },
    onErrorMessage:
      "Oops! Something went wrong. You may have entered duplicate or invalid data.",
    refetchKey: IFetcherKey.CONTACT,
  });
};

export default useUpdateContactMutation;
