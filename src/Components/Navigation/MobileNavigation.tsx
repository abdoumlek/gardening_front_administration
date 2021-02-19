import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationMobile.css";

export default function MobileNavigation() {
  const [navClasses, setNavClasses] = useState([
    "navigation-active",
    "",
    "",
    "",
  ]);
  let location = useLocation();
  useEffect(() => {
    if (location?.pathname.toLowerCase().includes("product")) {
      setNavClasses(["", "navigation-active", "", ""]);
    } else if (location?.pathname.toLowerCase().includes("gallery")) {
      setNavClasses(["", "", "navigation-active", ""]);
    } else if (location?.pathname.toLowerCase().includes("message")) {
      setNavClasses(["", "", "", "navigation-active"]);
    } else {
      setNavClasses(["navigation-active", "", "", ""]);
    }
  }, [location]);
  return (
    <ul className="bg-gradient-primary mobile-navigation d-lg-none">
      <li className="navigation-item">
        <Link to="/" className="nav-link">
          {navClasses[0].length > 0 ? (
            <img
              className="icon"
              height={20}
              width={20}
              src="/home_active.png"
              alt="accueil"
            />
          ) : (
            <img
              className="icon"
              height={20}
              width={20}
              src="/home.png"
              alt="accueil"
            />
          )}
          <p className={navClasses[0]}>Accueil</p>
        </Link>
      </li>

      <li className="navigation-item">
        <Link to="/products-list" className="nav-link">
          {navClasses[1].length > 0 ? (
            <img
              className="icon"
              height={20}
              width={20}
              src="/plant-pot_active.png"
              alt="accueil"
            />
          ) : (
            <img
              className="icon"
              height={20}
              width={20}
              src="/plant-pot.png"
              alt="produits"
            />
          )}
          <p className={navClasses[1]}>Produits</p>
        </Link>
      </li>
      <li className="navigation-item">
        <Link to="/gallery" className="nav-link">
          {navClasses[2].length > 0 ? (
            <img
              className="icon"
              height={20}
              width={20}
              src="/image_active.png"
              alt="accueil"
            />
          ) : (
            <img
              className="icon"
              height={20}
              width={20}
              src="/image.png"
              alt="gallerie"
            />
          )}
          <p className={navClasses[2]}>Gallerie</p>
        </Link>
      </li>
      <li className="navigation-item">
        <Link to="/messages-list" className="nav-link">
          {navClasses[3].length > 0 ? (
            <img
              className="icon"
              height={20}
              width={20}
              src="/clipboard_active.png"
              alt="accueil"
            />
          ) : (
            <img
              className="icon"
              height={20}
              width={20}
              src="/clipboard.png"
              alt="commandes"
            />
          )}
          <p className={navClasses[3]}>Commandes</p>
        </Link>
      </li>
    </ul>
  );
}
