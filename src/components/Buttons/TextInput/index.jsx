import cls from "./styles.module.scss";

export default function TextInput({ ...props }) {
  return (
    <div className={`${cls.wrapper}`} {...props}>
      <input />
    </div>
  );
}
