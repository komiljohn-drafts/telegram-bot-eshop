import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "react-feather";

import { FoodIcon } from "../../assets/icons.jsx";
import formatNumbers from "../../utils/formatNumbers.js";
import useProductsStore from "../../store/categories";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton/index.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton/index.jsx";
import cls from "./styles.module.scss";

export default function Orders() {
  const navigate = useNavigate();

  const { products, addToCard } = useProductsStore((state) => state);

  const [showBtns, setShowBtns] = useState(false);

  const orders = useMemo(() => {
    return products.filter((i) => i.count);
  }, [products]);

  const totalPrice = useMemo(() => {
    return products.filter((i) => i.count > 0).reduce((acc, cur) => acc + cur.count * cur.price, 0);
  }, [products]);

  return (
    <div className={cls.wrapper}>
      <div className={cls.bigTitle}>
        <p className={cls.title}>Buyurtmangiz</p>
        {!showBtns && (
          <div className={cls.btns}>
            <p className={cls.editBtn} onClick={() => setShowBtns(true)}>
              O&apos;zgartirish
            </p>
          </div>
        )}
      </div>
      {orders.map((order) => (
        <div className={cls.order} key={order.id}>
          <div className={cls.left}>
            <div>
              <FoodIcon className={cls.icon} />
            </div>
            <div className={cls.text}>
              <p className={cls.top}>
                <span className={cls.title}>{order.title}</span>
                <span className={cls.count}>{order.count}x</span>
              </p>
              <p className={cls.hint}>{order.description}</p>
            </div>
          </div>
          <div className={cls.right}>
            <p>{formatNumbers(order.count * order.price)} so&apos;m</p>
            {showBtns && (
              <div className={cls.buttons}>
                <RectangeIconButton onClick={() => addToCard(order.id, "minus")}>
                  <Minus size={18} color="#14b706" />
                </RectangeIconButton>
                <RectangeIconButton onClick={() => addToCard(order.id, "plus")}>
                  <Plus size={18} color="#14b706" />
                </RectangeIconButton>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className={cls.requestsBlock}>
        <textarea rows={1} placeholder="Komment..." />
        <p>Taklif, talab va shikoyatlar uchun</p>
      </div>
      <div className={cls.button}>
        <PrimaryButton onClick={() => navigate("/payment")}>
          To'lovga o'tish - {formatNumbers(totalPrice)} so'm
        </PrimaryButton>
      </div>
    </div>
  );
}
