import { create } from "zustand";
import { persist } from "zustand/middleware";

import { StorageName } from "../storageName";

interface RecentItem {
  key: string;
  label: string;
}

interface RecentState {
  recent: RecentItem[];
  addRecent: (item: RecentItem) => void;
  removeRecent: (key: string) => void;
  clearRecent: () => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set, get) => ({
      recent: [],
      addRecent: (item) => {
        const current = get().recent.filter((r) => r.key !== item.key);
        let updated = [item, ...current];
        updated = updated.slice(0, 5);
        set({ recent: updated });
      },
      removeRecent: (key) => {
        const updated = get().recent.filter((r) => r.key !== key);
        set({ recent: updated });
      },
      clearRecent: () => set({ recent: [] }),
    }),
    {
      name: StorageName.recentStorage.toString(),
    },
  ),
);
