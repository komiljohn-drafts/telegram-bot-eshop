import cls from "./styles.module.scss";
import { motion } from "framer-motion";

export default function PrimaryButton({ size = "medium", children, classes = "", ...props }) {
  return (
    <motion.div whileTap={{ scale: 0.9 }} className={`${cls.button} ${cls[size]} ${classes}`} {...props}>
      {children}
    </motion.div>
  );
}
