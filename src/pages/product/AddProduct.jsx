import axios from 'axios';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const AddProduct = () => {
  // DB With json Server
  const apiUrl = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  let navegat = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      axios
        .post(`${apiUrl}/products`, {
          title,
          price,
          description,
        })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navegat('/products');
    },
  });

  const formSubmet = (e) => {
    e.preventDefault();

    mutation.mutate();
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
