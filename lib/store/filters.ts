import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterStore {
  // Location
  location: string;
  setLocation: (value: string) => void;

  // Equipment checkboxes
  equipment: string[];
  toggleEquipment: (value: string) => void;

  // Camper type (radio)
  form: string;
  setForm: (value: string) => void;

  // Transmission (radio)
  transmission: string;
  setTransmission: (value: string) => void;

  // Final applied filters sent to API
  activeFilters: {
    location: string;
    equipment: string[];
    form: string;
    transmission: string;
  };
  applyFilters: () => void;

  // Hydration
  _hasHydrated: boolean;
  setHasHydrated: () => void;
}

const useFilterStore = create<FilterStore>()(
  persist(
    (set, get) => ({
      location: "",
      equipment: [],
      form: "",
      transmission: "",

      activeFilters: {
        location: "",
        equipment: [],
        form: "",
        transmission: "",
      },

      _hasHydrated: false,
      setHasHydrated: () => set({ _hasHydrated: true }),

      setLocation: (value) => set({ location: value }),

      toggleEquipment: (value) =>
        set((state) => ({
          equipment: state.equipment.includes(value)
            ? state.equipment.filter((f) => f !== value)
            : [...state.equipment, value],
        })),

      setForm: (value) =>
        set(() => ({
          form: value,
        })),

      setTransmission: (value) =>
        set(() => ({
          transmission: value,
        })),

      applyFilters: () => {
        const { location, equipment, form, transmission } = get();
        set({
          activeFilters: {
            location,
            equipment,
            form,
            transmission,
          },
        });
      },
    }),

    {
      name: "filter-storage",

      partialize: (state) => ({
        location: state.location,
        equipment: state.equipment,
        form: state.form,
        transmission: state.transmission,
        activeFilters: state.activeFilters,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.();
      },
    }
  )
);

export default useFilterStore;
