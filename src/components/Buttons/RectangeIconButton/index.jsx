import cls from "./styles.module.scss";

export default function RectangeIconButton(props) {
  const { children, bgColor = "#eee", width = "initial" } = props;

  return (
    <div className={cls.button} style={{ backgroundColor: bgColor, width }} {...props}>
      {children}
    </div>
  );
}
