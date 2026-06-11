import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Zustand store state and actions for managing favourite posts.
 */
interface FavouritesStore {
  /**
   * List of favourited post IDs.
   */
  favourites: number[];

  /**
   * Adds a post to favourites if it is not already present,
   * otherwise removes it.
   *
   * @param {number} id - Post ID to toggle
   */
  toggleFavourite: (id: number) => void;

  /**
   * Checks whether a post is currently favourited.
   *
   * @param {number} id - Post ID to check
   * @returns {boolean} True if the post is favourited
   */
  isFavourite: (id: number) => boolean;
}

/**
 * Zustand store for managing favourite posts.
 *
 * Features:
 * - add/remove favourites
 * - favourite status lookup
 * - persistence via localStorage
 */
const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      /**
       * Collection of favourited post IDs.
       */
      favourites: [],

      /**
       * Toggles favourite status for a post.
       *
       * If the post is already favourited, it is removed.
       * Otherwise, it is added to the favourites list.
       *
       * @param {number} id - Post ID to toggle
       */
      toggleFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.includes(id)
            ? state.favourites.filter((favId) => favId !== id)
            : [...state.favourites, id],
        })),

      /**
       * Determines whether a post is currently favourited.
       *
       * @param {number} id - Post ID to check
       * @returns {boolean} True if the post is favourited
       */
      isFavourite: (id) => {
        return get().favourites.includes(id);
      },
    }),

    {
      /**
       * Storage key used to persist favourites in localStorage.
       */
      name: "favourites",
    },
  ),
);

export default useFavouritesStore;
