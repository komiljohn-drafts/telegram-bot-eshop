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
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import cls from "./styles.module.scss";

export default function Products() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { products, activeCategory, addToCard, setProducts, setPersistProducts } = useProductsStore((state) => state);

  useOutsideClick(ref, () => setPreviewItemId(null));

  const [previewItemId, setPreviewItemId] = useState(null);

  const orderCount = products.filter((p) => p.count > 0).length;

  const getCurrentItem = () => products.find((i) => i.id === previewItemId);

  const handleAddToCard = (e, id, key) => {
    e.stopPropagation();
    addToCard(id, key);
  };

  useEffect(() => {
    if (!products.length) {
      setProducts(fakeData);
      setPersistProducts(fakeData);
    }
  }, [products]);

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
              className={cls.previewInner}
              ref={ref}
              initial={{ bottom: "-100%" }}
              animate={{ bottom: "0%" }}
              exit={{ bottom: "-100%" }}
            >
              <X className={cls.close} size={24} onClick={() => setPreviewItemId(null)} />
              <div className={cls.image}>
                <img src={PictureUrl} />
              </div>
              <div className={cls.body}>
                <div className={cls.head}>
                  <p className={cls.title}>{getCurrentItem().title}</p>
                  <p className={cls.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis corporis inventore est neque
                    eius. Optio enim repudiandae dolor nulla deserunt.
                  </p>
                </div>
                <div className={cls.footer}>
                  <div className={cls.action}>
                    {getCurrentItem().count > 0 ? (
                      <>
                        <RectangeIconButton size="lg" onClick={() => addToCard(getCurrentItem().id, "minus")}>
                          <Minus size={18} />
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
                          <Plus size={18} />
                        </RectangeIconButton>
                      </>
                    ) : (
                      <SecondaryButton
                        fullWidth
                        onClick={(e) => handleAddToCard(e, getCurrentItem().id, "plus")}
                        styles={{ backgroundColor: "#eee", color: "#000", fontWeight: "400" }}
                      >
                        Savatga qo'shish
                      </SecondaryButton>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <MainButton
        styles={{ backgroundColor: previewItemId ? "#fff" : "" }}
        disabled={!(totalPrice > 0)}
        onClick={() => navigate("/orders")}
      >
        <span>Buyurtmaga o'tish</span>
        <p>
          <span className={cls.orderCount}>{orderCount}</span>
          <span>{formatNumbers(totalPrice)} so'm</span>
        </p>
      </MainButton>
    </div>
  );
}
