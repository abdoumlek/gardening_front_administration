import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import "./ProductsList.css";
import Product from "../../Components/Product/Product";
import { Link, useHistory } from "react-router-dom";
const ProductsList: FC<any> = ({ token }) => {
  const [products, setProducts] = useState<any>([]);
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
          setProducts(response.data);
          setLoading(false);
        })
        .catch((e) => console.error(e));
    };
    getProducts();
  }, [token]);

  console.log(products);

  const openProduct = (product) => {
    history.push("/add-product/" + product.id);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-2">
      <h1 className="text-center mb-5">Liste des produits</h1>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <Link to="/add-product" className="btn btn-success float-right">
              <span>+ ajouter un produit</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="products-list">
        {products.map((p) => {
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

export default ProductsList;
