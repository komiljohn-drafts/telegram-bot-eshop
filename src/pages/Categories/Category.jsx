import cls from "./styles.module.scss";

export default function Category(props) {
  const { data, activeCategory, setActiveCategory } = props;
  return (
    <div className={`${cls.category} ${activeCategory ? cls.active : ""}`} onClick={() => setActiveCategory(data)}>
      <img width={30} height={30} src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" />
      <span>{data.title}</span>
    </div>
  );
}
