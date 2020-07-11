import React, { FC, useState } from "react";
import axios from "axios";

const AddProduct: FC<any> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const postCategory = (name, description) => {
    axios
      .post("https://plantes-et-jardins-back.herokuapp.com/api/categories", {
        name: name,
        description: description,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.error(e));
  };
  return (
    <div>
      <h1>Ajouter une categorie de produits</h1>
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
          onChange={(htmlElement) => setDescription(htmlElement.target.value)}
          placeholder="Description de la category"
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <button
        type="button"
        onClick={() => postCategory(name, description)}
        className="btn btn-success"
      >
        Ajouter la category
      </button>
    </div>
  );
};

export default AddProduct;
