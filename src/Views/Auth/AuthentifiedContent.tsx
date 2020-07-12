import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Home from "../Home/Home";
import ProductsList from "../Products/ProductsList";
import AddProduct from "../Products/AddProduct";
import AddCategory from "../Products/AddCategory";
import ProductsOrdersList from "../OrdersList/ProductsOrdersList";
import GardensOrdersList from "../OrdersList/GardensOrdersList";
import AddOrder from "../OrdersList/AddOrder";
import OrdersHistory from "../OrdersList/OrdersHistory";

function AuthentifiedContent({token}) {
  return (
    <Router>
      <Navigation />
      <div className="page-wrapper">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/productslist">
            <ProductsList token={token}/>
          </Route>
          <Route path="/addproduct">
            <AddProduct token={token}/>
          </Route>
          <Route path="/addcategory">
            <AddCategory token={token} />
          </Route>
          <Route path="/modifyproduct">
            <AddProduct token={token}/>
          </Route>
          <Route path="/productsorderslist">
            <ProductsOrdersList token={token}/>
          </Route>
          <Route path="/gardensorderslist">
            <GardensOrdersList token={token} />
          </Route>
          <Route path="/addorder">
            <AddOrder token={token}/>
          </Route>
          <Route path="/ordershistory">
            <OrdersHistory token={token}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AuthentifiedContent;
