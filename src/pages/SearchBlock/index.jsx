import { useState } from "react";
import { Search, ShoppingBag } from "react-feather";

import cls from "./styles.module.scss";
import useProductsStore from "../../store/categories";

export default function SearchBlock() {
  const { products, setProducts } = useProductsStore((state) => state);

  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
    // console.log("products");
    setProducts(products.filter((i) => i.title.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const orderCount = products.filter((p) => p.count > 0).length;

  return (
    <div className={cls.wrapper}>
      <div className={cls.search}>
        <Search color="#707172" />
        <input placeholder="Qidirish..." value={value} onChange={onChange} />
      </div>
      <div className={cls.busket}>
        <div className={cls.inner}>
          <ShoppingBag />
          <span>{orderCount}</span>
        </div>
      </div>
    </div>
  );
}
