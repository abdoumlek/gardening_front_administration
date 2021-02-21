import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

export default function OrderDetails({ token }) {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<any>(null);

  useEffect(() => {
    let messageId = "";
    const loadMessage = (messageId, token) => {
      setLoading(true);
      axios
        .get(
          "https://plantes-et-jardins-back.herokuapp.com/api/messages/" +
            messageId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setCurrentMessage(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    if (location.pathname.includes("/message-details/")) {
      messageId = location.pathname.split("/message-details/")[1];
    }
    if (messageId.length && token.length) loadMessage(messageId, token);
  }, [location, token]);

  const updateMessage = () => {
    setUpdateLoading(true);
    axios
      .put(
        "https://plantes-et-jardins-back.herokuapp.com/api/messages",
        {
          id: currentMessage.id,
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
          <h1>Demande de contact</h1>
          <table>
            <tbody>
              <tr>
                <td>Objet de votre demande: </td>
                <td>{currentMessage?.subject}</td>
              </tr>
              <tr>
                <td>Nom: </td>
                <td>{currentMessage?.lastName}</td>
              </tr>
              <tr>
                <td>Prénom: </td>
                <td>{currentMessage?.firstName}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{currentMessage?.email}</td>
              </tr>
              <tr>
                <td>Numéro de téléphone: </td>
                <td>{currentMessage?.phoneNumber}</td>
              </tr>
              <tr>
                <td>contenu du message: </td>
                <td>{currentMessage?.message}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <button onClick={updateMessage} className="btn btn-success">
            Traiter la demande
          </button>
        </div>
      </div>
    </div>
  );
}
