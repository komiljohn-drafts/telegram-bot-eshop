import cls from "./styles.module.scss";

export default function RectangeIconButton(props) {
  const { children } = props;

  return <div className={cls.button}>{children}</div>;
}
