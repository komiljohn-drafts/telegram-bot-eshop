import { Minus, Plus } from "react-feather";

import PictureUrl from "../../assets/osh.jpeg";
import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import useProductsStore from "../../store/categories";
import cls from "./styles.module.scss";

export default function Product(props) {
  const { data, setPreviewItemId } = props;

  const { addToCard } = useProductsStore((state) => state);

  const handleAddToCard = (e, id, key) => {
    e.stopPropagation();
    addToCard(id, key);
  };

  return (
    <div className={cls.product} onClick={() => setPreviewItemId(data.id)}>
      <div className={cls.image}>
        <img src={PictureUrl} />
      </div>
      <div className={cls.body}>
        <p className={cls.title}>{data.title}</p>
        <p className={cls.price}>{formatNumbers(data.price)} so&apos;m</p>
        <div className={cls.footer}>
          <RectangeIconButton onClick={(e) => handleAddToCard(e, data.id, "minus")}>
            <Minus size={18} color="#14b706" />
          </RectangeIconButton>
          <span className={cls.count}>{data.count}</span>
          <RectangeIconButton onClick={(e) => handleAddToCard(e, data.id, "plus")}>
            <Plus size={18} color="#14b706" />
          </RectangeIconButton>
        </div>
      </div>
    </div>
  );
}
