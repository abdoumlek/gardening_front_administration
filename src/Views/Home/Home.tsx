import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Product from "../../Components/Product/Product";
import { useHistory } from "react-router-dom";
const Home: FC<any> = ({ token }) => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<any>([]);
  const [onPromotionProducts, setOnPromotionProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(
          "https://plantes-et-jardins-back.herokuapp.com/api/products/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setOutOfStockProducts(response.data.filter((p) => p.quantity < 2));
          setOnPromotionProducts(
            response.data.filter((p) => p.discount !== "0.00")
          );
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    if (token) getProducts();
  }, [token]);

  const openProduct = (product) => {
    history.push("/add-product/" + product.id);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-2">
      <h1 className="text-center mb-5">Liste des produits hors stock</h1>
      <div className="container">
        <div className="row mb-3"></div>
      </div>
      <div className="products-list max-height">
        {outOfStockProducts.map((p) => {
          return (
            <div
              className="single-product"
              key={p.id}
              onClick={() => {
                openProduct(p);
              }}
            >
              <Product
                buying_price={p.buying_price}
                name={p.name}
                photo={p.photo}
                selling_price={p.selling_price}
                category={p.category}
                reference={p.reference}
                quantity={p.quantity}
              />
            </div>
          );
        })}
      </div>
      <h1 className="text-center mb-5">Liste des produits en promotion</h1>
      <div className="products-list max-height">
        {onPromotionProducts.map((p) => {
          return (
            <div
              className="single-product"
              key={p.id}
              onClick={() => {
                openProduct(p);
              }}
            >
              <Product
                buying_price={p.buying_price}
                name={p.name}
                photo={p.photo}
                selling_price={p.selling_price}
                category={p.category}
                reference={p.reference}
                quantity={p.quantity}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
