import cls from "./styles.module.scss";

export default function RectangeIconButton(props) {
  const { children, width = "initial", size = "sm" } = props;

  return (
    <div className={`${cls.button} ${cls[size]}`} style={{ width }} {...props}>
      {children}
    </div>
  );
}
