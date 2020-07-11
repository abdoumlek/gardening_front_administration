import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Views/Home/Home";
import ProductsList from "./Views/Products/ProductsList";
import AddProduct from "./Views/Products/AddProduct";
import ProductsOrdersList from "./Views/OrdersList/ProductsOrdersList";
import GardensOrdersList from "./Views/OrdersList/GardensOrdersList";
import "./App.css"
import AddOrder from "./Views/OrdersList/AddOrder";
import OrdersHistory from "./Views/OrdersList/OrdersHistory";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/productslist">
            <ProductsList />
          </Route>
          <Route path="/addproduct">
            <AddProduct />
          </Route>
          <Route path="/productsorderslist">
            <ProductsOrdersList />
          </Route>
          <Route path="/gardensorderslist">
            <GardensOrdersList />
          </Route>
          <Route path="/addorder">
            <AddOrder />
          </Route>
          <Route path="/ordershistory">
            <OrdersHistory />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
