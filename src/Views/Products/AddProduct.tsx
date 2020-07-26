import React, { FC, useState, useEffect } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import ImageLoading from "../../Components/ImageLoading/ImageLoading";

import { toast } from "react-toastify";

const AddProduct: FC<any> = ({ token }) => {
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    const getCategories = () => {
      axios
        .get("https://plantes-et-jardins-back.herokuapp.com/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((e) => toast.error("une erreur c'est produite lors de la récupération de la liste des catégories"));
    };
    getCategories();
  }, [token]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string>(
    "/Pas_d_image_disponible_RgDT7_k2u.svg"
  );
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [buyingPrice, setBuyingPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const postProduct = (
    name,
    description,
    category,
    imageUrl,
    sellingPrice,
    buyingPrice,
    quantity,
    discount
  ) => {
    axios
      .post(
        "https://plantes-et-jardins-back.herokuapp.com/api/products",
        {
          name: name,
          description: description,
          category_id: category,
          photo: imageUrl,
          selling_price: sellingPrice,
          buying_price: buyingPrice,
          quantity: quantity,
          discount: discount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => toast.success("Produit ajouté avec Succés"))
      .catch((e) => toast.error("une erreur c'est produite lors de l'ajout"));
  };

  return (
    <div>
      <h1 className="text-center mb-5">Ajouter un produit</h1>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <label>Nom du produit</label>
            <div className="input-group mb-3">
              <input
                value={name}
                onChange={(htmlElement) => setName(htmlElement.target.value)}
                placeholder="Nom du produit"
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>Description du produit</label>

            <div className="input-group mb-3">
              <textarea
                rows={5}
                value={description}
                onChange={(htmlElement) =>
                  setDescription(htmlElement.target.value)
                }
                placeholder="Description du produit"
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <label>Category du produit</label>

            <select
              value={category}
              onChange={(htmlElement) =>
                setCategory(parseInt(htmlElement.target.value))
              }
              className="custom-select custom-select-lg mb-3"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-lg-6">
            <label>Image du produit</label>

            <IKContext
              publicKey="public_LV4KSYYDKUQ9OWZZM0ZIerfMH1s="
              urlEndpoint="https://ik.imagekit.io/cjvyejrxtm"
              transformationPosition="path"
              authenticationEndpoint="https://plantes-et-jardins-back.herokuapp.com/api/products/upload"
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
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <label>Prix de vente du produit</label>

            <div className="input-group mb-3">
              <input
                value={sellingPrice}
                onChange={(htmlElement) =>
                  setSellingPrice(parseFloat(htmlElement.target.value))
                }
                placeholder="Prix de vente"
                type="number"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>Prix d'achat du produit</label>

            <div className="input-group mb-3">
              <input
                value={buyingPrice}
                onChange={(htmlElement) =>
                  setBuyingPrice(parseFloat(htmlElement.target.value))
                }
                placeholder="Prix d'achat"
                type="number"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>Quantité du produit en stock</label>

            <div className="input-group mb-3">
              <input
                value={quantity}
                onChange={(htmlElement) =>
                  setQuantity(parseInt(htmlElement.target.value))
                }
                placeholder="Nombre d'articeles en stock"
                type="number"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>Remise pour ce produit</label>

            <div className="input-group mb-3">
              <input
                value={discount}
                onChange={(htmlElement) =>
                  setDiscount(parseFloat(htmlElement.target.value))
                }
                placeholder="Remise"
                type="number"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="text-center mb-5">
              <button
                type="button"
                onClick={() =>
                  postProduct(
                    name,
                    description,
                    category,
                    imageUrl,
                    sellingPrice,
                    buyingPrice,
                    quantity,
                    discount
                  )
                }
                className="btn btn-success"
              >
                Ajouter le produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
