import fetcherKey from "../customHooks/api/fetcher/fetchKey";

/* To scale you just can put it right here
 */
export interface IBaseMutationProps<T> {
  onSuccessCallback?: (data: T) => void;
  refetchKey?: fetcherKey | fetcherKey[];
  endpointVersion?: number;
}
