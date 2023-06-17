import { create } from "zustand";
import { persist } from "zustand/middleware";

const useProductsStore = create(
  persist(
    (set, get) => ({
      products: [],
      activeCategory: {},
      addToCard: (id, key) =>
        set({
          products: get().products.map((i) =>
            i.id === id ? { ...i, count: i.count >= 0 ? i.count + (key === "plus" ? 1 : -1) : 0 } : i
          ),
        }),
      setProductsAsync: async () => {
        const res = await fetch("http://botm.uz/v1/food");
        const data = await res.json();
        set({
          products: data,
        });
      },
      setProducts: (arr) =>
        set({
          products: get().products.length ? get().products : [...arr],
        }),
      setActiveCategory: (obj) => {
        set({
          activeCategory: obj,
        });
      },
    }),
    { name: "products-storage" }
  )
);

export default useProductsStore;
