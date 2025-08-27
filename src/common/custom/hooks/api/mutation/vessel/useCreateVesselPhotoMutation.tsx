    import { z } from "zod";

    import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
    import { IBaseResponse } from "@/common/interfaces/baseResponse";
    import { IRefVesselPhoto } from "@/common/interfaces/data/vesselPhoto";
    import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";

    import { IEndpointVessel } from "../../endpoints/vessel.endpoint.enum";
    import IFetcherKey from "../../fetcher/fetchKey";
    import useHandleMutation from "../../useHandleMutation";

    export type ICreateVesselPhotoMutationResponse = Partial<IRefVesselPhoto>;

    export const VesselPhotoCreateSchemaPayload = z.object({
    base64: z.string().url().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    vesselId: z.string().uuid(),
    isPanorama: z.boolean().optional(),
    isCover: z.boolean().optional(),
    takenAt: z.coerce.date().optional(),
    });

    export type ICreateVesselPhotoMutationPayload = z.infer<
    typeof VesselPhotoCreateSchemaPayload
    >;

    const useCreateVesselPhotoMutation = (
    props?: IBaseMutationProps<Partial<IRefVesselPhoto>>
    ) => {
    return useHandleMutation<
        IBaseResponse<ICreateVesselPhotoMutationResponse>,
        ICreateVesselPhotoMutationPayload
    >({
        method: IHTTPMethod.POST,
        url: IEndpointVessel.ADD_VESSEL_PHOTO,
        onSuccessMessage: "Add vessel photo success!",
        onSuccessCallback: (response) => {
        if (props?.onSuccessCallback) props?.onSuccessCallback?.(response.data);
        },
        onErrorMessage:
        "Oops! Something went wrong. You may have entered duplicate or invalid data.",
        refetchKey: [IFetcherKey.VESSEL, IFetcherKey.VESSEL_PHOTO],
    });
    };

    export default useCreateVesselPhotoMutation;
