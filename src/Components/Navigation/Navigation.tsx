import React, { useState, useEffect, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation: FC<any> = () => {
  const [linkClasses, setLinkClasses] = useState<string[]>([]);
  let location = useLocation();
  useEffect(() => {
    const initialClasses = [
      "nav-item ",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
      "nav-item",
    ];
    setLinkClasses(initialClasses);
    switch (location?.pathname) {
      case "/products-list": {
        initialClasses[1] = initialClasses[1] + " active";
        setLinkClasses(initialClasses);
        break;
      }
      case "/categories-list": {
        initialClasses[7] = initialClasses[7] + " active";
        setLinkClasses(initialClasses);
        break;
      }
      case "/messages-list": {
        initialClasses[4] = initialClasses[4] + " active";
        setLinkClasses(initialClasses);
        break;
      }
      case "/gallery": {
        initialClasses[8] = initialClasses[8] + " active";
        setLinkClasses(initialClasses);
        break;
      }
      default: {
        initialClasses[0] = initialClasses[0] + " active";
        setLinkClasses(initialClasses);
        break;
      }
    }
  }, [location]);

  return (
    <ul className="navigation-component navbar-nav bg-gradient-primary position-fixed sidebar d-none d-lg-block">
      <Link to="/" className="nav-link">
        <div className="sidebar-brand-text">Plantes & Jardins Admin</div>
      </Link>

      <hr className="sidebar-divider" />

      <li className={linkClasses[0]}>
        <Link to="/" className="nav-link">
          Accueil
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading mb-2">Produits</div>

      <li className={linkClasses[1]}>
        <Link to="/products-list" className="nav-link">
          Liste des produits
        </Link>
      </li>

      <li className={linkClasses[7]}>
        <Link to="/categories-list" className="nav-link">
          Liste des categories
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading mb-2">Commandes et demandes</div>

      <li className={linkClasses[4]}>
        <Link to="/messages-list" className="nav-link">
          Liste des demandes
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading mb-2">Galerie</div>

      <li className={linkClasses[8]}>
        <Link to="/gallery" className="nav-link">
        Galerie
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
