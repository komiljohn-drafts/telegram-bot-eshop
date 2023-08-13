import { create } from "zustand";
import { persist } from "zustand/middleware";

import request from "../../services/client";

const useProductsStore = create(
  persist(
    (set, get) => ({
      products: [],
      persistProducts: [],
      activeCategory: {},
      addToCard: (id, key) =>
        set({
          products: get().products.map((i) =>
            i.id === id ? { ...i, count: i.count >= 0 ? i.count + (key === "plus" ? 1 : -1) : 0 } : i
          ),
        }),
      setProductsAsync: async () => {
        const res = await request("/food");
        const data = await res.json();
        set({
          products: data,
        });
      },
      setProducts: (arr) =>
        set({
          products: arr,
        }),
      setPersistProducts: (arr) =>
        set({
          persistProducts: arr,
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
