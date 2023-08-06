import PrimaryButton from "../PrimaryButton";
import cls from "./styles.module.scss";

export default function MainButton({ onClick, center, children, disabled }) {
  return (
    <div className={cls.button}>
      <PrimaryButton center={center} onClick={onClick} disabled={disabled}>
        {children}
      </PrimaryButton>
    </div>
  );
}
