import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  // DB With json Server
  const apiUrl = import.meta.env.VITE_API_URL;

  let navegat = useNavigate();

  const formSubmet = (e) => {
    e.preventDefault();

    axios
      .post(`${apiUrl}/products`, {
        title,
        price,
        description,
      })
      .then(() => navegat('/products'));
  };

  return (
    <>
      <h1>Add product</h1>

      <form onSubmit={formSubmet}>
        <div className="mb-3">
          <label htmlFor="productTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="productTitle"
            placeholder="Product Title"
            aria-describedby="emailHelp"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            price
          </label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="Product Price"
            aria-describedby="emailHelp"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            placeholder="Product Description"
            aria-describedby="emailHelp"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </>
  );
};
