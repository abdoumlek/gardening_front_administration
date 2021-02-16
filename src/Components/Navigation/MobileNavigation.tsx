import React, { useState, useEffect, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationMobile.css";


export default function MobileNavigation() {
  return (
    <ul className="bg-gradient-primary mobile-navigation d-lg-none">
      <li className="navigation-item">
        <Link to="/gallery" className="nav-link">
        <img
            className="icon"
            height={20}
            width={20}
            src="/image.png"
            alt="gallerie"
          />
          <p>Gallerie</p>
        </Link>
      </li>
      <li className="navigation-item">
        <Link to="/products-list" className="nav-link">
          <img
            className="icon"
            height={20}
            width={20}
            src="/plant-pot.png"
            alt="produits"
          />
          <p>Produits</p>
        </Link>
      </li>
      <li className="navigation-item">
        <Link to="/products-orders-list" className="nav-link">
          <img
            className="icon"
            height={20}
            width={20}
            src="/clipboard.png"
            alt="commandes"
          />
          <p>Commandes</p>
        </Link>
      </li>
    </ul>
  );
}
