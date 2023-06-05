import { Minus, Plus } from "react-feather";

import cls from "./styles.module.scss";
import PictureUrl from "../../assets/osh.jpeg";
import formatNumbers from "../../utils/formatNumbers";

export default function Product(props) {
  const { data, setPreviewItem } = props;
  return (
    <div className={cls.product} onClick={() => setPreviewItem(data)}>
      <div className={cls.image}>
        <img src={PictureUrl} />
      </div>
      <div className={cls.body}>
        <p className={cls.title}>{data.title}</p>
        <div className={cls.footer}>
          <span className={cls.price}>{formatNumbers(data.price)} so&apos;m</span>
          <div className={cls.action}>
            <Minus size={18} />
            <span className={cls.count}>7</span>
            <Plus size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
