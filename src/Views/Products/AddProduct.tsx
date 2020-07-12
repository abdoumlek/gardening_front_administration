import React, { FC, useState, useEffect } from "react";
import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import axios from "axios";

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
        .catch((e) => console.error(e));
    };
    getCategories();
  }, [token]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string>(
    "/shekhar-chandra-sahu-72P_hMW2l_g-unsplash_6Md5qI8a-.jpg"
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
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>Ajouter un produit</h1>
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
          value={description}
          onChange={(htmlElement) => setDescription(htmlElement.target.value)}
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
      <label>Image du produit</label>

      <IKContext
        publicKey="public_LV4KSYYDKUQ9OWZZM0ZIerfMH1s="
        urlEndpoint="https://ik.imagekit.io/cjvyejrxtm"
        transformationPosition="path"
        authenticationEndpoint="https://plantes-et-jardins-back.herokuapp.com/api/products/upload"
      >
        <div className="custom-file mb-3">
          {/* TODO add image logic */}
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
        <IKImage
          className="d-block"
          path={imageUrl}
          transformation={[
            {
              height: "300",
              width: "300",
              blur: 3
            },
          ]}
        />
      </IKContext>
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
  );
};

export default AddProduct;
