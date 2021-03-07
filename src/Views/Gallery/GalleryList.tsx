import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const GalleryList: FC<any> = ({ token }) => {
  const [galleries, setGalleries] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  useEffect(() => {
    const getGalleries = () => {
      setLoading(true);
      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/galleries", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setGalleries(response.data);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    if (token && !deleteLoading) getGalleries();
  }, [token, deleteLoading]);

  const removeImage = (id) => {
    setDeleteLoading(true);
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL + "/galleries/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Image supprimée avec Succés");
      })
      .catch((e) =>
        toast.error("une erreur c'est produite lors de la suppression")
      )
      .finally(() => setDeleteLoading(false));
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-2">
      <h1 className="text-center mb-5">Galerie</h1>
      <div className="container">
        <div className="row mb-3">
          <div className="col">
            <Link to="/add-gallery" className="btn btn-success float-right">
              <span>+ ajouter une image</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="galleries-list">
        {galleries.map((g) => {
          return (
            <div className="row" key={g.id}>
              <div className="col">
                <img
                  alt={g.name}
                  src={process.env.REACT_APP_UPLOADS_FOLDER + g.photo}
                />
              </div>
              <div className="col">
                <h3>{g.name}</h3>
                <p>{g.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeImage(g.id);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryList;
