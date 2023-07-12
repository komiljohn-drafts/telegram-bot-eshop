import cls from "./styles.module.scss";
import { motion } from "framer-motion";

export default function PrimaryButton({ size = "medium", children, onClick, disabled, classes = "", ...props }) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className={`${cls.button} ${disabled ? cls.disabled : ""} ${cls[size]} ${classes}`}
      onClick={() => !disabled && onClick()}
      {...props}
    >
      {children}
    </motion.div>
  );
}
