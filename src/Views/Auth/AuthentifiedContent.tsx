import React, { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Home from "../Home/Home";
import ProductsOrdersList from "../OrdersList/ProductsOrdersList";
import GardensOrdersList from "../OrdersList/GardensOrdersList";
import AddOrder from "../OrdersList/AddOrder";
import OrdersHistory from "../OrdersList/OrdersHistory";
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
          <Route path="/productslist">
            <ProductsList token={token} />
          </Route>
          <Route path="/addproduct">
            <Suspense fallback={<LoadingScreen />}>
              <AddProduct token={token} />
            </Suspense>
          </Route>
          <Route path="/addcategory">
            <Suspense fallback={<LoadingScreen />}>
              <AddCategory token={token} />
            </Suspense>
          </Route>
          <Route path="/modifyproduct">
            <AddProduct token={token} />
          </Route>
          <Route path="/productsorderslist">
            <ProductsOrdersList token={token} />
          </Route>
          <Route path="/gardensorderslist">
            <GardensOrdersList token={token} />
          </Route>
          <Route path="/addorder">
            <AddOrder token={token} />
          </Route>
          <Route path="/ordershistory">
            <OrdersHistory token={token} />
          </Route>
          <Route path="/addtogallery">
            <AddGallery token={token} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AuthentifiedContent;
