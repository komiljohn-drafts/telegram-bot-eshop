import { useEffect, useMemo, useRef, useState } from "react";
import { Minus, Plus, X } from "react-feather";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { fakeData } from "./fakeData";
import PictureUrl from "../../assets/osh.jpeg";
import Product from "./Product";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import useProductsStore from "../../store/categories";
import MainButton from "../../components/Buttons/MainButton";
import cls from "./styles.module.scss";

export default function Products() {
  const [previewItemId, setPreviewItemId] = useState(null);

  const { products, activeCategory, addToCard, setProducts } = useProductsStore((state) => state);
  const ref = useRef(null);
  const navigate = useNavigate();

  useOutsideClick(ref, () => setPreviewItemId(null));

  useEffect(() => {
    setProducts(fakeData);
  }, []);

  const totalPrice = useMemo(() => {
    return products.filter((i) => i.count > 0).reduce((acc, cur) => acc + cur.count * cur.price, 0);
  }, [products]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const getCurrentItem = () => products.find((i) => i.id === previewItemId);

  return (
    <div className={cls.products}>
      <p className={cls.bigTitle}>{activeCategory.name}</p>
      <motion.div className={cls.inner} variants={container} initial="hidden" animate="visible">
        {products.map((c) => (
          <Product key={c.id} setPreviewItemId={setPreviewItemId} data={c} />
        ))}
      </motion.div>
      <AnimatePresence>
        {previewItemId && (
          <div className={cls.preview}>
            <motion.div
              className={cls.inner}
              ref={ref}
              initial={{ bottom: "-100%" }}
              animate={{ bottom: "0%" }}
              exit={{ bottom: "-100%" }}
            >
              <div className={cls.close}>
                <X size={16} onClick={() => setPreviewItemId(null)} />
              </div>
              <div className={cls.image}>
                <img src={PictureUrl} />
              </div>
              <div className={cls.body}>
                <div className={cls.head}>
                  <p className={cls.price}>{formatNumbers(getCurrentItem().price)} so&apos;m</p>
                  <p className={cls.title}>{getCurrentItem().title}</p>
                  <p className={cls.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis corporis inventore est neque
                    eius. Optio enim repudiandae dolor nulla deserunt.
                  </p>
                </div>
                <div className={cls.footer}>
                  {/* <PrimaryButton>O&apos;chirish</PrimaryButton> */}
                  <div className={cls.action}>
                    <RectangeIconButton size="lg" onClick={() => addToCard(getCurrentItem().id, "minus")}>
                      <Minus size={18} color="#14b706" />
                    </RectangeIconButton>
                    <motion.span
                      key={getCurrentItem().count}
                      className={cls.countPreview}
                      animate={{ scale: 1, color: "#000" }}
                      initial={{ scale: 1.2, color: "#14b706" }}
                    >
                      {getCurrentItem().count}
                    </motion.span>
                    <RectangeIconButton size="lg" onClick={() => addToCard(getCurrentItem().id, "plus")}>
                      <Plus size={18} color="#14b706" />
                    </RectangeIconButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <MainButton disabled={!(totalPrice > 0)} onClick={() => navigate("/orders")}>
        <span>Buyurtmaga o'tish</span>
        <p>
          <span className={cls.orderCount}>3</span>
          <span>{formatNumbers(totalPrice)} so'm</span>
        </p>
      </MainButton>
    </div>
  );
}
