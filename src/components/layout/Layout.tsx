import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { CartOffcanvas } from "../Cart/CartOffcanvas";
import ToastManager from "../Alerts/Toast/ToastManager";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container-fluid  py-5  px-md-5 py-md-5">
        <Outlet />
      </main>
      <CartOffcanvas />
      <ToastManager />
    </>
  );
};

export default Layout;
