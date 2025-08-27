import { create } from "zustand";

interface BreadcrumbState {
  breadcrumb: string[];
  setBreadcrumb: (crumbs: string[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  breadcrumb: [],
  setBreadcrumb: (crumbs) => set({ breadcrumb: crumbs }),
}));
