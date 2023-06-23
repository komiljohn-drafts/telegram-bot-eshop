import { useEffect, useRef, useState } from "react";
import { Minus, Plus, X } from "react-feather";
import { useNavigate } from "react-router-dom";

import { fakeData } from "./fakeData";
import PictureUrl from "../../assets/osh.jpeg";
import Product from "./Product";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import useProductsStore from "../../store/categories";
import useTelegram from "../../hooks/useTelegram";
import cls from "./styles.module.scss";

export default function Products() {
  const [previewItemId, setPreviewItemId] = useState(null);

  const { products, activeCategory, addToCard, setProducts } = useProductsStore((state) => state);
  const ref = useRef(null);
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useOutsideClick(ref, () => setPreviewItemId(null));

  useEffect(() => {
    if (products.some((i) => i.count)) {
      tg.MainButton.text = "BUYURTMAGA O'TISH";
      tg.MainButton.show();
    } else if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }
  }, [tg, products]);

  tg.onEvent("mainButtonClicked", () => navigate("orders"));
  tg.onEvent("backButtonClicked", () => tg.close());

  useEffect(() => {
    setProducts(fakeData);
  }, []);

  return (
    <div className={cls.products}>
      <p className={cls.bigTitle}>{activeCategory.name}</p>
      <div className={cls.inner}>
        {products.map((c) => (
          <Product key={c.id} setPreviewItemId={setPreviewItemId} data={c} />
        ))}
      </div>
      {previewItemId && (
        <div className={cls.preview}>
          <div className={cls.inner} ref={ref}>
            <div className={cls.close}>
              <X size={16} onClick={() => setPreviewItemId(null)} />
            </div>
            <div className={cls.image}>
              <img src={PictureUrl} />
            </div>
            <div className={cls.body}>
              <div className={cls.head}>
                <p className={cls.title}>{products.find((i) => i.id === previewItemId).title}</p>
                <p className={cls.price}>
                  {formatNumbers(products.find((i) => i.id === previewItemId).price)} so&apos;m
                </p>
                <p className={cls.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis corporis inventore est neque eius.
                  Optio enim repudiandae dolor nulla deserunt.
                </p>
              </div>
              <div className={cls.footer}>
                {/* <PrimaryButton>O&apos;chirish</PrimaryButton> */}
                <div className={cls.action}>
                  <RectangeIconButton
                    size="md"
                    onClick={() => addToCard(products.find((i) => i.id === previewItemId).id, "minus")}
                  >
                    <Minus size={18} color="#14b706" />
                  </RectangeIconButton>
                  <span className={cls.countPreview}>{products.find((i) => i.id === previewItemId).count}</span>
                  <RectangeIconButton
                    size="md"
                    onClick={() => addToCard(products.find((i) => i.id === previewItemId).id, "plus")}
                  >
                    <Plus size={18} color="#14b706" />
                  </RectangeIconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
