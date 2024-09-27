import { Outlet } from "react-router-dom";
import Header from "src/components/header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
