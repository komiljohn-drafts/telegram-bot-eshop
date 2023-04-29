import React, { useEffect } from "react";
import { fakeData } from "./fakeData";
import { FoodIcon, MinusIcon, PlusIcon } from "../../assets/icons.jsx";
import cls from "./styles.module.scss";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import useCategoriesStore from "../../store/categories";
import useTelegram from "../../hooks/useTelegram";

export default function Categories(props) {
  const { setShowOrder } = props;

  const { categories, addToCard, addCategories } = useCategoriesStore((state) => state);
  const tg = useTelegram();

  useEffect(() => {
    addCategories(fakeData);
  }, [fakeData]);

  useEffect(() => {
    if (categories.some((i) => i.count)) {
      tg.MainButton.text = "Buyurtmaga o'tish";
      tg.MainButton.show();
    } else if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
  }, [tg, categories]);

  tg.onEvent("mainButtonClicked", () => setShowOrder(true));

  return (
    <div className={cls.main}>
      {/* <p onClick={() => setShowOrder(true)}>ACTION</p> */}
      <div className={cls.wrapper}>
        {categories.map((item) => (
          <div className={cls.item} key={item.id}>
            {!!item.count && <div className={cls.count}>{item.count}</div>}
            <div className={cls.icon}>
              <FoodIcon />
            </div>
            <p className={cls.text}>
              <span className={cls.title}>{item.title}</span>
              {" - "}
              <span className={cls.price}>{item.price}s</span>
            </p>
            {item.count ? (
              <div className={cls.buttons}>
                <PrimaryButton bgColor="red" onClick={() => addToCard(item.id, "minus")}>
                  <MinusIcon className={cls.action_icon} />
                </PrimaryButton>
                <PrimaryButton onClick={() => addToCard(item.id, "plus")}>
                  <PlusIcon className={cls.action_icon} />
                </PrimaryButton>
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
