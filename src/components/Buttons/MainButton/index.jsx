import PrimaryButton from "../PrimaryButton";
import cls from "./styles.module.scss";

export default function MainButton({ onClick, center, children, disabled, styles }) {
  return (
    <div className={cls.button} style={styles}>
      <PrimaryButton center={center} onClick={onClick} disabled={disabled}>
        {children}
      </PrimaryButton>
    </div>
  );
}
