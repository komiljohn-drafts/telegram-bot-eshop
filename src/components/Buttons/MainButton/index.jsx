import PrimaryButton from "../PrimaryButton";
import cls from "./styles.module.scss";

export default function MainButton({ onClick, children, disabled }) {
  return (
    <div className={cls.button}>
      <PrimaryButton onClick={onClick} disabled={disabled}>
        {children}
      </PrimaryButton>
    </div>
  );
}
