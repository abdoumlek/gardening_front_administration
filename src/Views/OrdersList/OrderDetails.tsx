import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function OrderDetails({ token }) {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  // const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  console.log(currentOrder);

  useEffect(() => {
    let orderTotal = 0;
    if (currentOrder) {
      currentOrder.products.forEach((p) => {
        orderTotal = orderTotal + p.pivot.product_count * p.pivot.product_price;
      });
      orderTotal = orderTotal +  7;
      setTotal(orderTotal);
    }
  }, [currentOrder]);

  useEffect(() => {
    let orderId = "";
    const loadOrder = (orderId, token) => {
      setLoading(true);
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL  + "/orders/" + orderId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setCurrentOrder(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    if (location.pathname.includes("/order-details/")) {
      orderId = location.pathname.split("/order-details/")[1];
    }
    if (orderId.length && token.length) loadOrder(orderId, token);
  }, [location, token]);

  const updateOrder = () => {
    // setUpdateLoading(true);
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/orders",
        {
          id: currentOrder.id,
          status: "resolved",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // setUpdateLoading(false);
        history.push("/messages-list");
      })
      .catch((e) => {
        console.error(e);
        // setUpdateLoading(false);
      });
  };
  if (loading) return <LoadingScreen></LoadingScreen>;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Informations de l'utilisateur</h1>
          <table>
            <tbody>
              <tr>
                <td>nom et prénom : </td>
                <td>{currentOrder?.name}</td>
              </tr>
              <tr>
                <td>adresse : </td>
                <td>{currentOrder?.address}</td>
              </tr>
              <tr>
                <td>numéro de téléphone : </td>
                <td>{currentOrder?.phoneNumber}</td>
              </tr>
            </tbody>
          </table>

          <h1>Informations sur la commande</h1>
          {currentOrder?.products.map((product) => {
            return (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img
                        alt={product?.name}
                        src={process.env.REACT_APP_THUMBNAILS_FOLDER + product?.photo}
                      />
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>référence du produit: </td>
                            <td>{product.id}</td>
                          </tr>
                          <tr>
                            <td>nom du produit: </td>
                            <td>{product.name}</td>
                          </tr>
                          <tr>
                            <td>quantité : </td>
                            <td>
                              <strong>{product?.pivot?.product_count}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>prix unitaire aprés remise : </td>
                            <td>{parseFloat(product?.pivot?.product_price).toFixed(3)}TND</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h1>Prix total de la commande (livraison incluse 7.000 TND)</h1>
          <h2>{total.toFixed(3)}TND</h2>
        </div>
      </div>
      {currentOrder?.status === "new" && (
        <div className="row">
          <div className="col text-center">
            <button onClick={updateOrder} className="btn btn-success">
              Traiter la commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
