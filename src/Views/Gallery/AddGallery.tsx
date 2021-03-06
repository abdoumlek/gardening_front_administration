import React, { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import ImageLoading from "../../Components/ImageLoading/ImageLoading";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddGallery = ({ token }) => {
  const [name, setName] = useState<string>("");
  const history = useHistory();

  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>(
    "/Pas_d_image_disponible_RgDT7_k2u.svg"
  );

  const PostImageToGallery = (name, description, imageUrl) => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/galleries",
        {
          name: name,
          description: description,
          photo: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Image ajouté avec Succés");
        history.push("/gallery");
      })
      .catch((e) => toast.error("une erreur c'est produite lors de l'ajout"));
  };

  return (
    <div>
      <h1 className="text-center mb-5">Ajouter une image dans la gallerie</h1>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <label>Nom de l'image</label>
            <div className="input-group mb-3">
              <input
                value={name}
                onChange={(htmlElement) => setName(htmlElement.target.value)}
                placeholder="Nom de l'image"
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>Description de la tâche éffectuée</label>

            <div className="input-group mb-3">
              <textarea
                rows={5}
                value={description}
                onChange={(htmlElement) =>
                  setDescription(htmlElement.target.value)
                }
                placeholder="Description de la tâche éffectuée"
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <label>Image à ajouter dans la galerie</label>

            <IKContext
              publicKey="public_LV4KSYYDKUQ9OWZZM0ZIerfMH1s="
              urlEndpoint="https://ik.imagekit.io/cjvyejrxtm"
              transformationPosition="path"
              authenticationEndpoint="https://plantes-et-jardins-back.herokuapp.com/api/galleries/upload"
            >
              <div className="custom-file mb-3">
                <IKUpload
                  className="custom-file-input"
                  id="image-input"
                  fileName="my-upload"
                  onSuccess={(res) => setImageUrl(res.filePath)}
                />
                <label className="custom-file-label" htmlFor="image-input">
                  Choose image
                </label>
              </div>
            </IKContext>
            <div className="text-center">
              <ImageLoading
                alt="image ajouté"
                height={300}
                width={300}
                imageUrl={imageUrl}
              />
            </div>
            <div className="text-center mb-5">
              <button
                type="button"
                onClick={() => PostImageToGallery(name, description, imageUrl)}
                className="btn btn-success"
              >
                Ajouter l'image à la gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
