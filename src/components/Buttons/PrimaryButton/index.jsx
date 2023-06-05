import cls from "./styles.module.scss";

export default function PrimaryButton({ size = "medium", children, classes = "", ...props }) {
  return (
    <div className={`${cls.button} ${cls[size]} ${classes}`} {...props}>
      {children}
    </div>
  );
}
