import { motion } from "framer-motion";

import Category from "./Category";
import useCategoriesStore from "../../store/categories";
import useFetchGet from "../../hooks/useFetchGet";
import cls from "./styles.module.scss";

export default function Categories() {
  const { activeCategory, setActiveCategory } = useCategoriesStore((state) => state);

  const [categories, isLoading] = useFetchGet("http://botm.uz/v1/tag");

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div className={cls.categories} variants={container} initial="hidden" animate="visible">
      {isLoading ? (
        <div>Getting data...</div>
      ) : categories.length ? (
        categories.map((c) => (
          <Category
            key={c.id}
            activeCategory={activeCategory.id === c.id}
            setActiveCategory={setActiveCategory}
            data={c}
          />
        ))
      ) : (
        <div>No categories found</div>
      )}
    </motion.div>
  );
}
