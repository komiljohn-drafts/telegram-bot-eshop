import React, { useEffect, useMemo } from "react";

import { FoodIcon, MinusIcon, PlusIcon } from "../../assets/icons.jsx";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import useCategoriesStore from "../../store/categories";
import formatNumbers from "../../utils/formatNumbers.js";
import useTelegram from "../../hooks/useTelegram.js";
import cls from "./styles.module.scss";

export default function Orders(props) {
  const { setShowOrder } = props;
  const tg = useTelegram();

  const { categories, addToCard } = useCategoriesStore((state) => state);

  const orders = useMemo(() => {
    return categories.filter((i) => i.count);
  }, [categories]);

  useEffect(() => {
    tg.MainButton.text = `TO'LOVGA O'TISH - ${formatNumbers(
      orders.reduce((acc, cur) => acc + cur.count * cur.price, 0)
    )} so'm`;
    tg.setHeaderColor(tg.themeParams.secondary_bg_color);
    tg.setBackgroundColor(tg.themeParams.secondary_bg_color);
    tg.MainButton.show();
    tg.showAlert(JSON.stringify(tg.themeParams));
    tg.BackButton.show();
  }, [tg, categories, orders]);

  tg.onEvent("backButtonClicked", () => setShowOrder(false));

  return (
    <div className={cls.wrapper}>
      <div className={cls.bigTitle}>Sizning buyurtmangiz</div>
      {orders.map((order) => (
        <div className={cls.order} key={order.id}>
          <div className={cls.left}>
            <div>
              <FoodIcon />
            </div>
            <div className={cls.text}>
              <p>
                <span className={cls.title}>{order.title}</span>
                <span className={cls.count}>{order.count}x</span>
              </p>
              <p className={cls.hint}>{order.description}</p>
            </div>
          </div>
          <div className={cls.right}>
            <p>{formatNumbers(order.count * order.price)} so&apos;m</p>
            <div className={cls.buttons}>
              <PrimaryButton size="small" bgColor="red" onClick={() => addToCard(order.id, "minus")}>
                <MinusIcon className={cls.action_icon} />
              </PrimaryButton>
              <PrimaryButton size="small" onClick={() => addToCard(order.id, "plus")}>
                <PlusIcon className={cls.action_icon} />
              </PrimaryButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
