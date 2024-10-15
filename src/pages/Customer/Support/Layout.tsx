import { Outlet } from "react-router-dom";
import SupportHeader from "src/components/header/customer/SupportHeader";

function Layout() {
  return (
    <div>
      <SupportHeader />

      <Outlet />
    </div>
  );
}

export default Layout;
