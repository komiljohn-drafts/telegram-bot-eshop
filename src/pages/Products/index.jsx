import { useEffect, useRef, useState } from "react";
import { Minus, Plus, X } from "react-feather";

import { fakeData } from "./fakeData";
import useCategoriesStore from "../../store/categories";
import useTelegram from "../../hooks/useTelegram";
import PictureUrl from "../../assets/osh.jpeg";
import Product from "./Product";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import cls from "./styles.module.scss";

export default function Products(props) {
  const { setCurrentPage } = props;
  const [previewItem, setPreviewItem] = useState(null);

  const { categories, activeCategory } = useCategoriesStore((state) => state);
  const { tg } = useTelegram();
  const ref = useRef(null);

  useOutsideClick(ref, () => setPreviewItem(null));

  useEffect(() => {
    if (categories.some((i) => i.count)) {
      tg.MainButton.text = "BUYURTMAGA O'TISH";
      tg.MainButton.show();
    } else if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
  }, [tg, categories]);

  tg.onEvent("mainButtonClicked", () => setCurrentPage("orders"));
  // tg.onEvent("backButtonClicked", () => tg.close());

  return (
    <div className={cls.products}>
      <p className={cls.bigTitle}>{activeCategory.title}</p>
      <div className={cls.inner}>
        {fakeData.map((c) => (
          <Product key={c.id} setPreviewItem={setPreviewItem} data={c} />
        ))}
      </div>
      {previewItem && (
        <div className={cls.preview}>
          <div className={cls.inner} ref={ref}>
            <div className={cls.close}>
              <X size={16} onClick={() => setPreviewItem(null)} />
            </div>
            <div className={cls.image}>
              <img src={PictureUrl} />
            </div>
            <div className={cls.body}>
              <div className={cls.head}>
                <p className={cls.title}>{previewItem.title}</p>
                <p className={cls.price}>{formatNumbers(previewItem.price)} so&apos;m</p>
                <p className={cls.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis corporis inventore est neque eius.
                  Optio enim repudiandae dolor nulla deserunt.
                </p>
              </div>
              <div className={cls.footer}>
                <div className={cls.action}>
                  <RectangeIconButton>
                    <Minus size={16} />
                  </RectangeIconButton>
                  <span className={cls.price}>{3}</span>
                  <RectangeIconButton>
                    <Plus size={16} />
                  </RectangeIconButton>
                </div>
                <PrimaryButton>O&apos;chirish</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
