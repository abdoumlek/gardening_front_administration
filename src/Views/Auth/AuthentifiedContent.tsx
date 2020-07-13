import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Home from "../Home/Home";
import ProductsOrdersList from "../OrdersList/ProductsOrdersList";
import GardensOrdersList from "../OrdersList/GardensOrdersList";
import AddOrder from "../OrdersList/AddOrder";
import OrdersHistory from "../OrdersList/OrdersHistory";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

const ProductsList = lazy(() => import("../Products/ProductsList"));
const AddProduct = lazy(() => import("../Products/AddProduct"));
const AddCategory = lazy(() => import("../Products/AddCategory"));
function AuthentifiedContent({ token }) {
  return (
    <Router>
      <Navigation />
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/productslist">
            <Suspense fallback={<LoadingScreen />}>
              <ProductsList token={token} />
            </Suspense>
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
        </Switch>
      </div>
    </Router>
  );
}

export default AuthentifiedContent;
