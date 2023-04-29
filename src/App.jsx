import { useEffect, useState } from "react";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";

function App() {
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    tg.ready();
    tg.MainButton.color = "#33b648";
    tg.MainButton.textColor = "#fff";
  }, []);

  // console.log(tg.themeParams);

  const [showOrder, setShowOrder] = useState(false);

  return <div>{showOrder ? <Orders setShowOrder={setShowOrder} /> : <Categories setShowOrder={setShowOrder} />}</div>;
}

export default App;
