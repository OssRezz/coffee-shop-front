import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { CartOffcanvas } from "../Cart/CartOffcanvas";

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
    </>
  );
};

export default Layout;
