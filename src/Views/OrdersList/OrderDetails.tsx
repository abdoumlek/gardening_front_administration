import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import ImageLoading from "../../Components/ImageLoading/ImageLoading";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function OrderDetails({ token }) {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  useEffect(() => {
    let orderId = "";
    const loadOrder = (orderId, token) => {
      setLoading(true);
      axios
        .get(
          "https://plantes-et-jardins-back.herokuapp.com/api/orders/" + orderId,
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
    setUpdateLoading(true);
    axios
      .put(
        "https://plantes-et-jardins-back.herokuapp.com/api/orders",
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
        setUpdateLoading(false);
        history.push("/messages-list");
      })
      .catch((e) => {
        console.error(e);
        setUpdateLoading(false);
      });
  };
  if (loading) return <LoadingScreen></LoadingScreen>;
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Informations de l'utilisateur</h1>
          <table>
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
          </table>

          <h1>Informations sur la commande</h1>
          {currentOrder?.products.map((product) => {
            return (
              <table>
                <tr>
                  <td>
                    <ImageLoading
                      alt={product?.name}
                      height={150}
                      width={150}
                      imageUrl={product?.photo}
                    />
                  </td>
                  <td>
                    <table>
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
                        <td>{product?.pivot?.product_price}TND</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            );
          })}
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <button onClick={updateOrder} className="btn btn-success">
            Traiter la commande
          </button>
        </div>
      </div>
    </div>
  );
}
