import React, { FC } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const AddProduct: FC<any> = () => {
  return (
    <div>
      <h1>Ajouter une categorie de produits</h1>
      <div className="input-group mb-3">
        <input
          placeholder="Nom de la category"
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div className="input-group mb-3">
        <textarea
          placeholder="Description de la category"
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <button type="button" className="btn btn-success">Ajouter le produit</button>
    </div>
  );
};

export default AddProduct;
