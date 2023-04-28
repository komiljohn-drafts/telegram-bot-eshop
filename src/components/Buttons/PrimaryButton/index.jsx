import React from "react";

import cls from "./styles.module.scss";

export default function PrimaryButton({ bgColor = "yellow", size = "medium", fullWidth, children, ...props }) {
  const colors = { yellow: "#f4d408", red: "#f00", green: "green" };

  return (
    <div
      className={`${cls.button} ${cls[size]}`}
      style={{ backgroundColor: colors[bgColor], width: fullWidth ? "100%" : "70%" }}
      {...props}
    >
      {children}
    </div>
  );
}
