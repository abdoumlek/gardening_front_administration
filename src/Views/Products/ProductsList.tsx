import React, { FC, useState, useEffect } from "react";
import { IKContext, IKImage } from "imagekitio-react";

import axios from "axios";

const AddProduct: FC<any> = ({ token }) => {
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const getProducts = () => {
      axios
        .get(
          "https://plantes-et-jardins-back.herokuapp.com/api/products/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((e) => console.error(e));
    };
    getProducts();
  }, [token]);

  return (
    <div>
      <h1>Products List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Reference</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Buying Price</th>
            <th scope="col">Selling Price</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            return (
              <tr key={p.id}>
                <th scope="row">{p.id}</th>
                <td>
                  <IKContext
                    publicKey="public_LV4KSYYDKUQ9OWZZM0ZIerfMH1s="
                    urlEndpoint="https://ik.imagekit.io/cjvyejrxtm"
                    transformationPosition="path"
                    authenticationEndpoint="https://plantes-et-jardins-back.herokuapp.com/api/products/upload"
                  >
                    <IKImage
                      className="d-block"
                      path={p.photo}
                      transformation={[
                        {
                          height: "100",
                          width: "100",
                          blur: 1
                        },
                      ]}
                    />
                  </IKContext>
                </td>
                <td>{p.name}</td>
                <td>{p.buying_price}</td>
                <td>{p.selling_price}</td>
                <td>{p.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddProduct;
