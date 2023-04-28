import React, { useState } from "react";
import { fakeData } from "./fakeData";
import { FoodIcon, MinusIcon, PlusIcon } from "../../assets/icons.jsx";
import cls from "./styles.module.scss";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

export default function Categories() {
  const [data, setData] = useState(localStorage.getItem("fakeData") ?? fakeData);

  const handleAdd = (id, key) => {
    setData((p) =>
      p.map((i) => (i.id === id ? { ...i, count: i.count >= 0 ? i.count + (key === "plus" ? 1 : -1) : 0 } : i))
    );
  };

  return (
    <div className={cls.main}>
      <div className={cls.wrapper}>
        {data.map((item) => (
          <div className={cls.item} key={item.id}>
            {!!item.count && <div className={cls.count}>{item.count}</div>}
            <div className={cls.icon}>
              <FoodIcon />
            </div>
            <p className={cls.text}>
              <span className={cls.title}>{item.title}</span>
              {" - "}
              <span className={cls.price}>{item.price}</span>
            </p>
            {item.count ? (
              <div className={cls.buttons}>
                <PrimaryButton bgColor="red" onClick={() => handleAdd(item.id, "minus")}>
                  <MinusIcon className={cls.action_icon} />
                </PrimaryButton>
                <PrimaryButton onClick={() => handleAdd(item.id, "plus")}>
                  <PlusIcon className={cls.action_icon} />
                </PrimaryButton>
              </div>
            ) : (
              <PrimaryButton onClick={() => handleAdd(item.id, "plus")}>Add</PrimaryButton>
            )}
          </div>
        ))}
      </div>
      <PrimaryButton bgColor="green" size="large" fullWidth>
        View order
      </PrimaryButton>
    </div>
  );
}
