import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  addFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (id) => {
        const list = get().favorites;
        if (!list.includes(id)) {
          set({ favorites: [...list, id] });
        }
      },

      toggleFavorite: (id) => {
        const list = get().favorites;
        set({
          favorites: list.includes(id)
            ? list.filter((fav) => fav !== id)
            : [...list, id],
        });
      },
    }),

    {
      name: "favorites-storage",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

export default useFavoritesStore;
