import { useEffect } from "react";
import Categories from "./pages/Categories";

function App() {
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    tg.ready();
  }, []);

  const handleClose = () => {
    tg.close();
  };

  // console.log("window telegram webapp => ", window.Telegram.WebApp);

  return (
    <div>
      <Categories />
      <div onClick={handleClose}>Close</div>
    </div>
  );
}

export default App;
