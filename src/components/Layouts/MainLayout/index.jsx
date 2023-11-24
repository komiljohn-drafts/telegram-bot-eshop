import Logo from "../../../assets/logo";
import cls from "./styles.module.scss";

export default function MainLayout({ children }) {
  return (
    <div>
      <div className={cls.logo}>
        <Logo />
      </div>
      {children}
    </div>
  );
}
