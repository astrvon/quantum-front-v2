import { create } from "zustand";
import { persist } from "zustand/middleware";

import { StorageName } from "../storageName";

export interface IBearState {
  bears: number;
  increaseBears: () => void;
  decreaseBears: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<IBearState>()(
  persist(
    (set) => ({
      bears: 0,
      increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
      decreaseBears: () => set((state) => ({ bears: state.bears - 1 })),
      removeAllBears: () => set({ bears: 0 }),
    }),
    {
      name: StorageName.bearStorage.toString(),
    }
  )
);
