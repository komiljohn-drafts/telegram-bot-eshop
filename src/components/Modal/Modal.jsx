import { useRef } from "react";

import SecondaryButton from "../Buttons/SecondaryButton";
import useOutsideClick from "../../hooks/useOutsideClick";
import useProductsStore from "../../store/categories";
import cls from "./styles.module.scss";

export default function Modal({ setShowModal }) {
  const ref = useRef();

  const [products, setProducts] = useProductsStore((state) => [state.products, state.setProducts]);

  useOutsideClick(ref, () => setShowModal(false));

  const clearOrder = () => {
    setProducts(products.map((i) => ({ ...i, count: 0 })));
    setShowModal(false);
  };

  return (
    <div className={cls.wrapper}>
      <div className={cls.inner} ref={ref}>
        <p className={cls.title}>Savat bo'shatilsinmi?</p>
        <p className={cls.desc}>Savatni bo'shatmoqchiligingizga aminmisin?</p>
        <div className={cls.btns}>
          <SecondaryButton onClick={() => setShowModal(false)}>Yo'q</SecondaryButton>
          <SecondaryButton onClick={clearOrder} styles={{ backgroundColor: "#1a5d1a", color: "#fff" }}>
            Ha
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
