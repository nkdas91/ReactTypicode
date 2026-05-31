import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavouritesStore {
  favourites: number[];
  toggleFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
}

const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],

      toggleFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.includes(id)
            ? state.favourites.filter((favId) => favId !== id)
            : [...state.favourites, id],
        })),

      isFavourite: (id) => {
        return get().favourites.includes(id);
      },
    }),
    {
      name: "favourites",
    },
  ),
);

export default useFavouritesStore;
