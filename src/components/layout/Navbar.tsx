import CoffeeShopLogo from "./../../assets/images/logo_coffee_shop.png";
import { NavLink } from "react-router-dom";
import { CartButton } from "../Cart/CartButton";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm bg-white">
      <div className="container-fluid py-2">
        <a className="navbar-brand" href="/">
          <img src={CoffeeShopLogo} alt="" height="45px" loading="lazy" />
        </a>

        <CartButton />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse order-lg-1"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link text-secondary ${isActive ? "active" : ""}`
                }
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/track-order"
                className={({ isActive }) =>
                  `nav-link text-secondary ${isActive ? "active" : ""}`
                }
              >
                Track order
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
