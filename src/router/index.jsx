import { Outlet, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";

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

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<div>404 - Not found</div>} />
      </Route>
    </Routes>
  );
}
