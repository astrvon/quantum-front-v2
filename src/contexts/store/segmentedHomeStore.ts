import { create } from "zustand";
import { persist } from "zustand/middleware";

import { StorageName } from "../storageName";

export enum ISegmentKey {
  PRODUCTS = "Products",
  TRANSACTION = "Transaction",
  ADJUSTMENT_TRANSACTION = "Adjustment Transaction",
}

/* Rather use && <compoent/> to render better wrap it on memo and
 * and proxy to global state, so rendering isolated & on css level, also get track where the last was.
 * and then one point, i dont need to rendering modal that already being hide by css level that already being hide.
 */
export interface ISegmentedHomeState {
  isSegment: ISegmentKey;
  setSegment: (key: ISegmentKey) => void;
}

export const useSegmentedHomeStore = create<ISegmentedHomeState>()(
  persist(
    (set) => ({
      isSegment: ISegmentKey.PRODUCTS,
      setSegment: (key) => set({ isSegment: key }),
    }),
    {
      name: StorageName.segmentedHomeStorage.toString(),
    }
  )
);
