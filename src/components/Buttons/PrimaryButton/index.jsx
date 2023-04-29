import React from "react";

import cls from "./styles.module.scss";

export default function PrimaryButton({
  bgColor = "yellow",
  size = "medium",
  rounded = true,
  fullWidth,
  children,
  ...props
}) {
  const colors = { yellow: "#faa81d", red: "#e74d46", green: "#33b648" };

  return (
    <div
      className={`${cls.button} ${cls[size]}`}
      style={{
        backgroundColor: colors[bgColor],
        width: fullWidth ? "100%" : "70%",
        borderRadius: rounded ? "6px" : "0",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
