import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoriesStore = create(
  persist(
    (set, get) => ({
      categories: [],
      addToCard: (id, key) =>
        set({
          categories: get().categories.map((i) =>
            i.id === id ? { ...i, count: i.count >= 0 ? i.count + (key === "plus" ? 1 : -1) : 0 } : i
          ),
        }),
      addCategories: (arr) =>
        set({
          categories: get().categories.length ? get().categories : [...arr],
        }),
    }),
    { name: "categories-storage" }
  )
);

export default useCategoriesStore;
