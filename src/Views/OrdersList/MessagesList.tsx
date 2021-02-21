import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import "./MessagesList.css";
import { useHistory } from "react-router-dom";

const MessagesList: FC<any> = ({ token }) => {
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
    const getOrders = () => {
      setOrdersLoading(true);
      axios
        .get("https://plantes-et-jardins-back.herokuapp.com/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setOrders(
            response.data.filter((o) => {
              return o.status === "new";
              // && o.updated_date.includes(new Date().toISOString())
            })
          );
          setOrdersLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setOrdersLoading(false);
        });
    };
    const getMessages = () => {
      setMessagesLoading(true);
      axios
        .get("https://plantes-et-jardins-back.herokuapp.com/api/messages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setMessages(
            response.data.filter((o) => {
              return o.status === "new";
              // && o.updated_date.includes(new Date().toISOString())
            })
          );
          setMessagesLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setMessagesLoading(false);
        });
    };
    getMessages();
    getOrders();
  }, [token]);

  const openOrder = (id) => {
    history.push("/order-details/" + id);
  };
  const openMessage = (id) => {
    history.push("/message-details/" + id);
  };

  if (ordersLoading || messagesLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-2">
      <h1 className="text-center mb-5">Liste des Messages</h1>
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
                {messages.map((msg) => {
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
      <h1 className="text-center mb-5">Liste des commandes</h1>
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
                {orders.map((order) => {
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
  );
};

export default MessagesList;
