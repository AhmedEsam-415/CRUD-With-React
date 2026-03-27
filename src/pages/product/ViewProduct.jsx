import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const ViewProduct = () => {
  //! The idea here in useParams
  let { productId } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/${productId}`)
      .then((res) => setProduct(res.data));
  }, [apiUrl, productId]);

  return (
    <>
      <h1>Product {productId}</h1>
      <br />
      {product.rating ? (
        <div>
          <h1>{product.title}</h1>
          <p>Price: {product.price}</p>
          <p>description: {product.description}</p>
          <p>category: {product.category}</p>
          <p>Rate: {product.rating.rate} </p>
          <p>Count Rating: {product.rating.count} </p>
        </div>
      ) : (
        <div>
          <h1>{product.title}</h1>
          <p>Price: {product.price}</p>
          <p>description: {product.description}</p>
        </div>
      )}
    </>
  );
};
