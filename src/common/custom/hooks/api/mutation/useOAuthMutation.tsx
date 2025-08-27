// "use client";
//
// import { useBreakpointValue } from "@chakra-ui/react";
//
// import { IBaseMutationProps } from "@/common/interfaces/baseMutationProps";
// import { IBaseResponse } from "@/common/interfaces/baseResponse";
// import { IHTTPMethod } from "@/common/interfaces/enum/httpMethod.enum";
// import { toaster } from "@/components/ui/toaster";
//
// import FetcherKey from "../fetcher/fetchKey";
// import useHandleMutation from "../useHandleMutation";
//
// export type IOAuthMutationResponse = { url: string };
//
// const useOAuthMutation = (
//   props?: IBaseMutationProps<IOAuthMutationResponse>,
// ) => {
//   const isMobile = useBreakpointValue({ base: true, md: false });
//
//   return useHandleMutation<IBaseResponse<IOAuthMutationResponse>, null>({
//     // Config
//     method: IHTTPMethod.GET,
//     url: "auth/twitter-x/login",
//     endpointVersion: props?.endpointVersion,
//
//     // Request
//     onSuccessMessage: "Guide you to Twitter/X!",
//     onSuccessCallback: (response) => {
//       try {
//         const { url } = response.data; // OAuth URL from response
//
//         if (!url) {
//           return toaster.create({
//             description: "OAuth URL is missing in the response",
//             type: "error",
//           });
//         }
//
//         // Detect mobile devices using window.navigator
//         const isMobileAgent = /iPhone|iPad|iPod|Android/i.test(
//           navigator.userAgent,
//         );
//
//         if (isMobile || isMobileAgent) {
//           // Mobile: Redirect instead of opening a popup
//           window.location.href = url;
//         } else {
//           // Desktop: Open in a popup
//           window.open(
//             url,
//             "oauthPopup",
//             "width=500,height=600,noopener,noreferrer",
//           );
//
//           // if (!popup) {
//           //   throw new Error(
//           //     "Failed to open popup. Make sure popups are allowed.",
//           //   );
//           // }
//
//           // ---------
//           // if u need
//           // _________
//           // Check if the popup is closed
//           //
//
//           // const timer = setInterval(() => {
//           //   console.log({
//           //     popup,
//           //     closed: popup.closed,
//           //   });
//           //   if (popup?.closed) {
//           //     clearInterval(timer);
//           //     console.log("Popup window closed");
//           //     console.log({
//           //       handler: getSub(),
//           //     });
//           //     // Handle post-OAuth actions
//           //   }
//           // }, 500);
//         }
//       } catch (error) {
//         console.error({ error });
//       }
//     },
//     onErrorMessage: "Fail to guide you to Twitter/X :(",
//     refetchKey: FetcherKey.PROFILE,
//   });
// };
//
// export default useOAuthMutation;
