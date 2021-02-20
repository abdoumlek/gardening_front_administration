import React, { FC, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct: FC<any> = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const postCategory = (name, description) => {
    axios
      .post(
        "https://plantes-et-jardins-back.herokuapp.com/api/categories",
        {
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Catégorie ajoutée avec Succés");
      })
      .catch((e) => toast.error("une erreur c'est produite lors de l'ajout"));
  };
  return (
    <div>
      <h1 className="text-center mb-5">Ajouter une categorie de produits</h1>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <label>Nom de la category</label>

            <div className="input-group mb-3">
              <input
                value={name}
                onChange={(htmlElement) => setName(htmlElement.target.value)}
                placeholder="Nom de la category"
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>Description de la category</label>

            <div className="input-group mb-3">
              <textarea
                value={description}
                onChange={(htmlElement) =>
                  setDescription(htmlElement.target.value)
                }
                placeholder="Description de la category"
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => postCategory(name, description)}
                className="btn btn-success"
              >
                Ajouter la category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
