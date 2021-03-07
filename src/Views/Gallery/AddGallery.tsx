import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddGallery = ({ token }) => {
  const [name, setName] = useState<string>("");
  const history = useHistory();

  const [description, setDescription] = useState<string>("");
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>(
    "/Pas_d_image_disponible_RgDT7_k2u.svg"
  );

  const uploadFile = (file: any) => {
    setUploadLoading(true);
    const formData = new FormData();
    formData.append("file", file.target.files[0]);
    formData.append("width", "300");
    formData.append("height", "400");
    formData.append("withThumbnails", "true");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/upload-image",
        formData,
        config
      )
      .then((response) => {
        setImageUrl(response.data);
      })
      .catch((e) =>
        toast.error("une erreur c'est produite lors du chargement de l'image")
      )
      .finally(() => setUploadLoading(false));
  };

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

            <div className="custom-file mb-3">
              <input
                type="file"
                className="custom-file-input"
                id="image-input"
                onChange={(file) => uploadFile(file)}
              />
              <label className="custom-file-label" htmlFor="image-input">
                Choose image
              </label>
            </div>
            <div className="text-center">
              <img
                alt="gallery"
                src={process.env.REACT_APP_UPLOADS_FOLDER + imageUrl}
              />
              {uploadLoading && (
                    <span
                      className="spinner-border spinner-border-sm text-success"
                      role="status"
                      aria-hidden="true"
                    ></span>
                )}
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
