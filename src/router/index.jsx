import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Orders from "../pages/Orders";
import Payment from "../pages/Payment";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Outlet />
          </div>
        }
      >
        <Route index element={<Main />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
