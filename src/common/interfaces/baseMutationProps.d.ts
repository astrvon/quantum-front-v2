import fetcherKey from "../custom/hooks/api/fetcher/fetchKey";

/* To scale you just can put it right here
 */
export interface IBaseMutationProps<T> {
  onSuccessCallback?: (data: T) => void;
  refetchKey?: fetcherKey | fetcherKey[];
  endpointVersion?: number;
}
