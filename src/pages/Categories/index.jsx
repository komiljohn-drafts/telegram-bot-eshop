import Category from "./Category";
import useCategoriesStore from "../../store/categories";
import useFetchGet from "../../hooks/useFetchGet";
import cls from "./styles.module.scss";

export default function Categories() {
  const { activeCategory, setActiveCategory } = useCategoriesStore((state) => state);

  const [categories, isLoading] = useFetchGet("http://botm.uz/v1/tag");

  return (
    <div className={cls.categories}>
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
    </div>
  );
}
