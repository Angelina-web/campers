import { Camper } from "@/types/camper";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CamperStoreProps {
  campers: Camper[];
  currentPage: number;
  hasMore: boolean;
  setCampers: (campers: Camper[]) => void;
  addCampers: (campers: Camper[]) => void;
  setCurrentPage: (page: number) => void;
  setHasMore: (value: boolean) => void;
  clearCampers: () => void;
}

const useCamperStore = create<CamperStoreProps>()(
  persist(
    (set, get) => ({
      campers: [],
      currentPage: 1,
      hasMore: true,

      setCampers: (campers) => set({ campers, currentPage: 1 }),

      addCampers: (campers) =>
        set((state) => ({
          campers: [...state.campers, ...campers],
          currentPage: state.currentPage + 1,
        })),

      setCurrentPage: (page) => set({ currentPage: page }),

      setHasMore: (value) => set({ hasMore: value }),

      clearCampers: () => set({ campers: [], currentPage: 1, hasMore: true }),
    }),

    {
      name: "camper-storage",

      partialize: (state) => ({
        currentPage: state.currentPage,
        hasMore: state.hasMore,
      }),
    }
  )
);

export default useCamperStore;
