import { motion } from "framer-motion";

import cls from "./styles.module.scss";

export default function PrimaryButton({
  size = "medium",
  center,
  children,
  onClick,
  disabled,
  styles,
  classes = "",
  fullWidth,
  ...props
}) {
  return (
    <motion.div
      style={{ justifyContent: center ? "center" : "space-between", width: fullWidth ? "300px" : "", ...styles }}
      whileTap={{ scale: 0.9 }}
      className={`${cls.button} ${disabled ? cls.disabled : ""} ${cls[size]} ${classes}`}
      onClick={() => !disabled && onClick()}
      {...props}
    >
      {children}
    </motion.div>
  );
}
