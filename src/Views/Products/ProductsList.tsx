import React, { FC, useState, useEffect } from "react";
import axios from "axios";

const AddProduct: FC<any> = () => {
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const getProducts = () => {
      axios
        .get("https://plantes-et-jardins-back.herokuapp.com/api/products/admin")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((e) => console.error(e));
    };
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Reference</th>
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
