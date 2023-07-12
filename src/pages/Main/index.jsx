import { useEffect } from "react";

import Products from "../Products";
import Categories from "../Categories";
import useTelegram from "../../hooks/useTelegram";

export default function Main() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.BackButton.hide();
  }, []);

  return (
    <div>
      <Categories />
      <Products />
    </div>
  );
}
