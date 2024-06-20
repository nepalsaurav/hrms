import { create } from "zustand";

interface RefreshDataStore {
  isRefresh: boolean;
  refreshData: () => void;
}

const refreshDataStore = create<RefreshDataStore>((set) => ({
  isRefresh: false,
  refreshData: () =>
    set((state: { isRefresh: boolean }) => ({ isRefresh: !state.isRefresh })),
}));

export { refreshDataStore };
