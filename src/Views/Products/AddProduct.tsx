import React, { FC, useState, useEffect } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import ImageLoading from "../../Components/ImageLoading/ImageLoading";

import { toast } from "react-toastify";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

const AddProduct: FC<any> = ({ token }) => {
  const [categories, setCategories] = useState<any>([]);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let productId = "";
    const loadProduct = (productId, token) => {
      setLoading(true);
      axios
        .get(
          process.env.REACT_APP_BACKEND_URL + "/products/admin/" +
            productId,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setCurrentProduct(response.data);
          setLoading(false);
        })
        .catch((e) => console.error(e));
    };
    if (location.pathname.includes("/add-product/")) {
      productId = location.pathname.split("/add-product/")[1];
    }
    if (productId.length && token.length) loadProduct(productId, token);
  }, [location, token]);

  useEffect(() => {
    const getCategories = () => {
      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((e) =>
          toast.error(
            "une erreur c'est produite lors de la récupération de la liste des catégories"
          )
        );
    };
    getCategories();
  }, [token]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<number>(1);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(
    "/Pas_d_image_disponible_RgDT7_k2u.svg"
  );
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [buyingPrice, setBuyingPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [discount, setDiscount] = useState<string>("0.00");

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setDescription(currentProduct.description);
      setCategory(currentProduct.category_id);
      setImageUrl(currentProduct.photo);
      setSellingPrice(currentProduct.selling_price);
      setBuyingPrice(currentProduct.buying_price);
      setQuantity(currentProduct.quantity);
      setDiscount(currentProduct.discount);
    }
  }, [currentProduct]);

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
    setActionLoading(true);
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL +  "/products",
        {
          name: name,
          description: description,
          category_id: category,
          photo: imageUrl,
          selling_price: sellingPrice,
          buying_price: buyingPrice,
          quantity: quantity,
          discount: parseFloat(discount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Produit ajouté avec Succés");
        history.push("/products-list");
      })
      .catch((e) => toast.error("une erreur c'est produite lors de l'ajout"))
      .finally(() => setActionLoading(false));
  };
  const updateProduct = (
    name,
    description,
    category,
    imageUrl,
    sellingPrice,
    buyingPrice,
    quantity,
    discount
  ) => {
    setActionLoading(true);
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/products",
        {
          name: name,
          description: description,
          category_id: category,
          photo: imageUrl,
          selling_price: sellingPrice,
          buying_price: buyingPrice,
          quantity: quantity,
          discount: parseFloat(discount),
          id: currentProduct ? currentProduct.id : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        history.push("/products-list");
        toast.success("Produit modifié avec Succés");
      })
      .catch((e) =>
        toast.error("une erreur c'est produite lors de la modification")
      )
      .finally(() => setActionLoading(false));
  };
  const deleteProduct = (id) => {
    setDeleteLoading(true);
    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL + "/products/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        history.push("/products-list");
        toast.success("Produit supprimé avec Succés");
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
    <div>
      <h1 className="text-center mb-5">
        {currentProduct ? "Modifier un produit" : "Ajouter un produit"}{" "}
      </h1>
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
              <select
                value={discount}
                onChange={(htmlElement) =>
                  setDiscount(htmlElement.target.value)
                }
                className="custom-select custom-select-lg mb-3"
              >
                <option key="0.00" value="0.00">
                  0%
                </option>
                <option key="0.05" value="0.05">
                  5%
                </option>
                <option key="0.10" value="0.10">
                  10%
                </option>
                <option key="0.15" value="0.15">
                  15%
                </option>
                <option key="0.20" value="0.20">
                  20%
                </option>
                <option key="0.25" value="0.25">
                  25%
                </option>
                <option key="0.30" value="0.30">
                  30%
                </option>
                <option key="0.35" value="0.35">
                  35%
                </option>
                <option key="0.40" value="0.40">
                  40%
                </option>
                <option key="0.45" value="0.45">
                  45%
                </option>
                <option key="0.50" value="0.50">
                  50%
                </option>
              </select>
            </div>
            <div className="text-center mb-5">
              <button
                type="button"
                onClick={() => {
                  currentProduct
                    ? updateProduct(
                        name,
                        description,
                        category,
                        imageUrl,
                        sellingPrice,
                        buyingPrice,
                        quantity,
                        discount
                      )
                    : postProduct(
                        name,
                        description,
                        category,
                        imageUrl,
                        sellingPrice,
                        buyingPrice,
                        quantity,
                        discount
                      );
                }}
                className="btn m-2 btn-success"
              >
                {actionLoading && (
                  <span className="min-width-140">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </span>
                )}
                {!actionLoading && (
                  <span>
                    {currentProduct
                      ? "Modifier un produit"
                      : "Ajouter un produit"}
                  </span>
                )}
              </button>
              {currentProduct && (
                <button
                  type="button"
                  onClick={() => deleteProduct(currentProduct.id)}
                  className="btn m-2 btn-danger"
                >
                  {deleteLoading && (
                    <span className="min-width-155">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </span>
                  )}
                  {!deleteLoading && <span>Supprimer un produit</span>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
