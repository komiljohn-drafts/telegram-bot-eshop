import React from "react";

import cls from "./styles.module.scss";

export default function PrimaryButton({
  bgColor = "yellow",
  size = "medium",
  rounded = true,
  fullWidth,
  children,
  classes = "",
  ...props
}) {
  const colors = { yellow: "#faa81d", red: "#e74d46", green: "#33b648" };

  return (
    <div
      className={`${cls.button} ${cls[size]} ${classes}`}
      style={{
        backgroundColor: colors[bgColor],
        width: fullWidth ? "100%" : "",
        borderRadius: rounded ? "7px" : "0",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
