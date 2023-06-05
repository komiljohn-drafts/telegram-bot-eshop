import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCategoriesStore = create(
  persist(
    (set, get) => ({
      categories: [],
      activeCategory: {},
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
      setActiveCategory: (obj) => {
        set({
          activeCategory: obj,
        });
      },
    }),
    { name: "categories-storage" }
  )
);

export default useCategoriesStore;
