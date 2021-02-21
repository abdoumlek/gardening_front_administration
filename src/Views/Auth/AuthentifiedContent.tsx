import React, { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Navigation from "../../Components/Navigation/Navigation";
import Home from "../Home/Home";
import MessagesList from "../OrdersList/MessagesList";
import MessageDetails from "../OrdersList/MessageDetails";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import ProductsList from "../Products/ProductsList";
import AddGallery from "../Gallery/AddGallery";
import "./AuthentifiedContent.css";
import MobileNavigation from "../../Components/Navigation/MobileNavigation";
import OrderDetails from "../OrdersList/OrderDetails";
import GalleryList from "../Gallery/GalleryList";
import CategoryList from "../Category/CategroyList";
import axios from "axios";
const AddProduct = lazy(() => import("../Products/AddProduct"));
const AddCategory = lazy(() => import("../Category/AddCategory"));

function AuthentifiedContent({ token }) {

  const history = useHistory();

  axios.interceptors.response.use(
    function(successRes) {
      return successRes;
    }, 
    function(error) {
      sessionStorage.removeItem('token');
      history.push("/login");
      return Promise.reject(error);
    }
  );
  return (
    <Router>
      <Navigation />
      <MobileNavigation />
      <div className="page-wrapper">
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <Home  token={token} />
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
              <CategoryList token={token} />
            </Suspense>
          </Route>
          <Route path="/add-category">
            <Suspense fallback={<LoadingScreen />}>
              <AddCategory token={token} />
            </Suspense>
          </Route>
          <Route path="/messages-list">
            <Suspense fallback={<LoadingScreen />}>
              <MessagesList token={token} />
            </Suspense>
          </Route>
          <Route path="/modify-product">
            <Suspense fallback={<LoadingScreen />}>
              <AddProduct token={token} />
            </Suspense>
          </Route>
          <Route path="/message-details">
            <MessageDetails token={token} />
          </Route>
          <Route path="/order-details">
            <OrderDetails token={token} />
          </Route>
          <Route path="/add-gallery">
            <AddGallery token={token} />
          </Route>
          <Route path="/gallery">
            <GalleryList token={token} />
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
