import { fakeData } from "./fakeData";

import Category from "./Category";
import useCategoriesStore from "../../store/categories";
import cls from "./styles.module.scss";

export default function Categories() {
  const { activeCategory, setActiveCategory } = useCategoriesStore((state) => state);

  console.log("activeCategory", activeCategory);

  return (
    <div className={cls.categories}>
      {fakeData.map((c) => (
        <Category
          key={c.id}
          activeCategory={activeCategory.id === c.id}
          setActiveCategory={setActiveCategory}
          data={c}
        />
      ))}
    </div>
  );
}
