import React, { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Home from "../Home/Home";
import ProductsOrdersList from "../OrdersList/ProductsOrdersList";
import AddOrder from "../OrdersList/AddOrder";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ProductsList from "../Products/ProductsList";
import AddGallery from "../Gallery/AddGallery";
import "./AuthentifiedContent.css";
import MobileNavigation from "../../Components/Navigation/MobileNavigation";
const AddProduct = lazy(() => import("../Products/AddProduct"));
const AddCategory = lazy(() => import("../Products/AddCategory"));

function AuthentifiedContent({ token }) {
  return (
    <Router>
      <Navigation />
      <MobileNavigation />
      <div className="page-wrapper">
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products-list">
            <ProductsList token={token} />
          </Route>
          <Route path="/add-product">
            <Suspense fallback={<LoadingScreen />}>
              <AddProduct token={token} />
            </Suspense>
          </Route>
          <Route path="/categories-list">
            <Suspense fallback={<LoadingScreen />}>
              <AddCategory token={token} />
            </Suspense>
          </Route>
          <Route path="/add-category">
            <Suspense fallback={<LoadingScreen />}>
              <AddCategory token={token} />
            </Suspense>
          </Route>
          <Route path="/messages-list">
            <Suspense fallback={<LoadingScreen />}>
              <ProductsOrdersList token={token} />
            </Suspense>
          </Route>
          <Route path="/modify-product">
            <Suspense fallback={<LoadingScreen />}>
              <AddProduct token={token} />
            </Suspense>
          </Route>
          <Route path="/add-order">
            <AddOrder token={token} />
          </Route>
          <Route path="/add-gallery">
            <AddGallery token={token} />
          </Route>
          <Route path="/gallery">
            <AddGallery token={token} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AuthentifiedContent;
