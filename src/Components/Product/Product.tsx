import React, { FC } from "react";
import "./Product.css";

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
      <img alt={name}  src={process.env.REACT_APP_THUMBNAILS_FOLDER+photo} />
      <div className="text-content  px-2">
        <p className="text-center mb-1 product-name">
          {name} {reference ? " - " + reference : null}
        </p>
        <p>
          <span>Catégorie: </span>
          {category}
        </p>
        <hr className="divider" />
        <p>
          <span>Prix d'achat: </span>
          {buying_price}
        </p>
        <p>
          <span>Prix de vente: </span>
          {selling_price}
        </p>
        <p>
          <span>En stock: </span>
          {quantity}
        </p>
      </div>
    </div>
  );
};
export default Product;
