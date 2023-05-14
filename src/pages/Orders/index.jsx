import { useEffect, useMemo, useState } from "react";

import { FoodIcon } from "../../assets/icons.jsx";
import useCategoriesStore from "../../store/categories";
import formatNumbers from "../../utils/formatNumbers.js";
import useTelegram from "../../hooks/useTelegram.js";
import PlusButton from "../../components/Buttons/PlusButton/index.jsx";
import MinusButton from "../../components/Buttons/MinusButton/index.jsx";
import cls from "./styles.module.scss";

export default function Orders(props) {
  const { setCurrentPage } = props;
  const { tg } = useTelegram();

  const { categories, addToCard } = useCategoriesStore((state) => state);

  const [showBtns, setShowBtns] = useState(false);

  const orders = useMemo(() => {
    return categories.filter((i) => i.count);
  }, [categories]);

  useEffect(() => {
    tg.MainButton.text = `TO'LOVGA O'TISH - ${formatNumbers(
      orders.reduce((acc, cur) => acc + cur.count * cur.price, 0)
    )} so'm`;
    tg.MainButton.show();
    tg.BackButton.show();
  }, [tg, categories, orders]);

  tg.onEvent("backButtonClicked", () => setCurrentPage("main"));
  tg.onEvent("mainButtonClicked", () => setCurrentPage("payment"));

  return (
    <div className={cls.wrapper}>
      <div className={cls.bigTitle}>
        <p className={cls.title}>Buyurtmangiz</p>
        <div className={cls.btns}>
          <p className={cls.editBtn} onClick={() => setShowBtns(true)}>
            O&apos;zgartirish
          </p>
          <p className={cls.addBtn} onClick={() => setCurrentPage("main")}>
            Qo&apos;shish
          </p>
        </div>
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
                <MinusButton onClick={() => addToCard(order.id, "minus")} />
                <PlusButton onClick={() => addToCard(order.id, "plus")} />
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
