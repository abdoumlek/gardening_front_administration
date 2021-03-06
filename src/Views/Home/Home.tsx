import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Product from "../../Components/Product/Product";
import { useHistory } from "react-router-dom";
const Home: FC<any> = ({ token }) => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<any>([]);
  const [onPromotionProducts, setOnPromotionProducts] = useState<any>([]);
  const [resolvedTodayOrders, setResolvedTodayOrders] = useState<any>([]);
  const [resolvedTodayMessages, setResolvedTodayMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
  // const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const history = useHistory();
  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL + "/products/admin",
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
    const getOrders = () => {
      // setOrdersLoading(true);
      axios
        .get(process.env.REACT_APP_BACKEND_URL +"/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setResolvedTodayOrders(
            response.data.filter((o) => {
              return o.status === "resolved";
              // && o.updated_date.includes(new Date().toISOString())
            })
          );
          // setOrdersLoading(false);
        })
        .catch((e) => {
          console.error(e);
          // setOrdersLoading(false);
        });
    };
    const getMessages = () => {
      // setMessagesLoading(true);
      axios
        .get(process.env.REACT_APP_BACKEND_URL  + "/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setResolvedTodayMessages(
            response.data.filter((o) => {
              return o.status === "resolved";
              // && o.updated_date.includes(new Date().toISOString())
            })
          );
          // setMessagesLoading(false);
        })
        .catch((e) => {
          console.error(e);
          // setMessagesLoading(false);
        });
    };
    getMessages();
    getOrders();
    if (token) getProducts();
  }, [token]);

  const openProduct = (product) => {
    history.push("/add-product/" + product.id);
  };

  const openOrder = (id) => {
    history.push("/order-details/" + id);
  };
  const openMessage = (id) => {
    history.push("/message-details/" + id);
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
      <div className="p-2">
        <h1 className="text-center mb-5">Liste des Messages traités aujourd'hui</h1>
        <div className="container">
          <div className="row mb-3">
            <div className="col max-height">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Sujet de la demande</th>
                    <th>Nom du client</th>
                    <th>Numéro du client</th>
                  </tr>
                </thead>
                <tbody>
                  {resolvedTodayMessages.map((msg) => {
                    return (
                      <tr
                        key={msg.id}
                        onClick={() => {
                          openMessage(msg.id);
                        }}
                      >
                        <td>{msg.subject}</td>
                        <td>{msg.firstName}</td>
                        <td>{msg.phoneNumber}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h1 className="text-center mb-5">Liste des commandes traités aujourd'hui</h1>
        <div className="container">
          <div className="row mb-3">
            <div className="col max-height">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nom du client</th>
                    <th>Numéro du client</th>
                    <th>Adresse du client</th>
                  </tr>
                </thead>
                <tbody>
                  {resolvedTodayOrders.map((order) => {
                    return (
                      <tr
                        key={order.id}
                        onClick={() => {
                          openOrder(order.id);
                        }}
                      >
                        <td>{order.name}</td>
                        <td>{order.phoneNumber}</td>
                        <td>{order.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
