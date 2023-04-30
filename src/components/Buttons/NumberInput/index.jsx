import InputMask from "react-input-mask";

import cls from "./styles.module.scss";

export default function NumberInput({ mask, label, form, name, required, placeholder, ...props }) {
  return (
    <div className={`${cls.wrapper}`} {...props}>
      <div className={cls.label}>{label}</div>
      <InputMask
        // mask options
        mask={mask}
        alwaysShowMask={false}
        className={cls.input}
        // input options
        type={"text"}
        placeholder={placeholder}
        // react hook form register
        {...form.register(name, { required })}
      />
    </div>
  );
}
