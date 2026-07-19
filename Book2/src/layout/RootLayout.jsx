import React from "react";
import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom"; // Outlet is a placeholder that renders whatever child route is currently active (more on this below). useLocation gives you access to the current URL info.
import Footer from "../components/Footer";
import Herosection from "../components/Herosection";
import Cart from "../pages/Cart";
import checkout from "../pages/Checkout";

const RootLayout = () => {
  const location = useLocation(); //  location is just the variable name you're choosing to store that returned object in, so you can use it afterward. it can be changed to anything
  const isHome = location.pathname === "/"; // In your route configuration (App.tsx) — you call it path: Inside a component/page — once you retrieve it via useLocation(), it's called pathname: pathname when being used inside a react component , it has to be retrieved via useLocation before it can be used
  const isWhiteNav =
    location.pathname.startsWith("/checkout") || // this is basically just declared just to know and be sure which page the path is on the || in javascript as we learnt is "or"  If the user is on /cart or /checkout (or any path starting with those, like /checkout/payment) → isWhiteNav is true, and since hideAuthButtons just copies that value, hideAuthButtons is also true. If the user is on any other page (homepage /, or say /about, /products, etc.) → isWhiteNav is false, and hideAuthButtons is also false.
    location.pathname.startsWith("/cart");
  const hideAuthButtons = isWhiteNav;

  const isCart = location.pathname.startsWith("/cart");
  const isCheckout = location.pathname.startsWith("/checkout");

  return (
    <div className="min-h-screen ">
      <div
        className={
          isCart || isCheckout
            ? "bg-white"
            : "bg-linear-to-r from-[#EED4CB] to-[#FFFFFF]"
        }
      >
        <NavBar
          whiteBg={isWhiteNav} // first boolean value
          hideAuthButtons={hideAuthButtons} // second boolean value
          isHome={isHome} // Third boolean value
        />
        {isHome && <Herosection />}

        {/* Page content */}
        <main>
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
