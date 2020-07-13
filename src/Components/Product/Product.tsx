import React, { FC } from "react";
import "./Product.css";
import ImageLoading from "../ImageLoading/ImageLoading";

type ProductType = {
  reference: string;
  photo: string;
  name: string;
  category: string;
  buying_price: number;
  selling_price: number;
  quantity: number;
};
const Product: FC<ProductType> = ({
  reference,
  photo,
  name,
  category,
  buying_price,
  selling_price,
  quantity,
}) => {
  return (
    <div className="product-component">
      <ImageLoading alt={name} height={150} width={150} imageUrl={photo} />
      <div className="text-content">
        <p className="text-center mb-3">
          {name} {reference ? " - " + reference : null}
        </p>
        <p>categorie: {category}</p>
        <hr className="divider" />
        <p >prix d'achat: {buying_price}</p>
        <p >prix de vente: {selling_price}</p>
        <p >en stock: {quantity}</p>
      </div>
    </div>
  );
};
export default Product;
