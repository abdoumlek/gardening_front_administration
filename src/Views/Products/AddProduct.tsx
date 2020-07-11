import React, { FC } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const AddProduct: FC<any> = () => {
  return (
    <div>
      <h1>Ajouter un produit</h1>
      <div className="input-group mb-3">
        <input
          placeholder="Nom du produit"
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div className="input-group mb-3">
        <textarea
          placeholder="Description du produit"
          className="form-control"
          aria-label="With textarea"
        ></textarea>
      </div>
      <select className="custom-select custom-select-lg mb-3">
        <option selected>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <IKContext
        publicKey="public_LV4KSYYDKUQ9OWZZM0ZIerfMH1s="
        urlEndpoint="https://ik.imagekit.io/cjvyejrxtm"
        transformationPosition="path"
        authenticationEndpoint="https://plantes-et-jardins-back.herokuapp.com/api/products/admin/uploadimage"
      >
        <div className="custom-file mb-3">
          <IKUpload
            className="custom-file-input"
            id="image-input"
            fileName="my-upload"
          />
          <label className="custom-file-label" htmlFor="image-input">
            Choose image
          </label>
        </div>
      </IKContext>
      <div className="input-group mb-3">
        <input
          placeholder="Prix de vente"
          type="number"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div className="input-group mb-3">
        <input
          placeholder="Prix d'achat"
          type="number"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div className="input-group mb-3">
        <input
          placeholder="Nombre d'articeles en stock"
          type="number"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <div className="input-group mb-3">
        <input
          placeholder="Remise"
          type="number"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <button type="button" className="btn btn-success">Ajouter le produit</button>
    </div>
  );
};

export default AddProduct;
