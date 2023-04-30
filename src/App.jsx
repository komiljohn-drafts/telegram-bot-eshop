import { useEffect, useState } from "react";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";

function App() {
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    tg.ready();
    tg.MainButton.color = "#33b648";
    tg.MainButton.textColor = "#fff";
  }, [tg]);

  // console.log(tg.themeParams);

  const [currentPage, setCurrentPage] = useState("main");

  return (
    <div>
      {currentPage === "main" ? (
        <Categories setCurrentPage={setCurrentPage} />
      ) : currentPage === "orders" ? (
        <Orders setCurrentPage={setCurrentPage} />
      ) : currentPage === "payment" ? (
        <Payment setCurrentPage={setCurrentPage} />
      ) : (
        <Categories setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

export default App;
