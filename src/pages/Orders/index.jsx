import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "react-feather";

import { FoodIcon } from "../../assets/icons.jsx";
import formatNumbers from "../../utils/formatNumbers.js";
import useTelegram from "../../hooks/useTelegram.js";
import useProductsStore from "../../store/categories";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton/index.jsx";
import cls from "./styles.module.scss";

export default function Orders() {
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const { products, addToCard } = useProductsStore((state) => state);

  const [showBtns, setShowBtns] = useState(false);

  const orders = useMemo(() => {
    return products.filter((i) => i.count);
  }, [products]);

  useEffect(() => {
    tg.MainButton.text = `TO'LOVGA O'TISH - ${formatNumbers(
      orders.reduce((acc, cur) => acc + cur.count * cur.price, 0)
    )} so'm`;
    tg.MainButton.show();
    tg.BackButton.show();
  }, [tg, products, orders]);

  tg.onEvent("mainButtonClicked", () => navigate("/payment"));
  tg.onEvent("backButtonClicked", () => navigate("/"));

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
                <RectangeIconButton bgColor="#e64d44" onClick={() => addToCard(order.id, "minus")}>
                  <Minus size={18} color="#fff" />
                </RectangeIconButton>
                <RectangeIconButton bgColor="#f8a917" onClick={() => addToCard(order.id, "plus")}>
                  <Plus size={18} color="#fff" />
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
    </div>
  );
}
