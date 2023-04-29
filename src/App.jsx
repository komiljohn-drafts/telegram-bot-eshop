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

  const [showOrder, setShowOrder] = useState(false);

  tg.onEvent("backButtonClicked", () => tg.showAlert("New message"));

  return <div>{showOrder ? <Orders /> : <Categories setShowOrder={setShowOrder} />}</div>;
}

export default App;
