import React, { useEffect } from "react";

import { fakeData } from "./fakeData";
import { FoodIcon } from "../../assets/icons.jsx";
import cls from "./styles.module.scss";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import useCategoriesStore from "../../store/categories";
import useTelegram from "../../hooks/useTelegram";
import PlusButton from "../../components/Buttons/PlusButton";
import MinusButton from "../../components/Buttons/MinusButton";
import formatNumbers from "../../utils/formatNumbers";

export default function Categories(props) {
  const { setCurrentPage } = props;

  const { categories, addToCard, addCategories } = useCategoriesStore((state) => state);
  const tg = useTelegram();

  useEffect(() => {
    addCategories(fakeData);
  }, [fakeData]);

  useEffect(() => {
    if (categories.some((i) => i.count)) {
      tg.MainButton.text = "BUYURTMAGA O'TISH";
      tg.MainButton.show();
    } else if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
  }, [tg, categories]);

  tg.onEvent("mainButtonClicked", () => setCurrentPage("orders"));

  return (
    <div className={cls.main}>
      <div className={cls.wrapper}>
        {categories.map((item) => (
          <div className={cls.item} key={item.id}>
            {!!item.count && <div className={cls.count}>{item.count}</div>}
            <div className={cls.icon}>
              <FoodIcon />
            </div>
            <div className={cls.text}>
              <p className={cls.title}>{item.title}</p>
              <p className={cls.price}>{formatNumbers(item.price)} so&apos;m</p>
            </div>
            {item.count ? (
              <div className={cls.buttons}>
                <MinusButton onClick={() => addToCard(item.id, "minus")} />
                <PlusButton onClick={() => addToCard(item.id, "plus")} />
              </div>
            ) : (
              <PrimaryButton onClick={() => addToCard(item.id, "plus")}>Add</PrimaryButton>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
