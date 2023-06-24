import cls from "./styles.module.scss";
import { motion } from "framer-motion";

export default function RectangeIconButton(props) {
  const { children, width = "initial", size = "sm" } = props;

  return (
    <motion.div
      whileTap={{ scale: 0.75 }}
      transition={{ duration: 0.1 }}
      className={`${cls.button} ${cls[size]}`}
      style={{ width }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
