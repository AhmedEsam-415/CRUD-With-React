import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export const EditProduct = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () =>
      axios.get(`${apiUrl}/products/${productId}`).then((res) => res.data),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data) setProduct(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: () => axios.patch(`${apiUrl}/products/${productId}`, product),
    onSuccess: async () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
      await Swal.fire({
        title: 'Updated!',
        icon: 'success',
        draggable: true,
      });
      navigate('/products');
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong while updating.',
        icon: 'error',
      });
      console.error('Mutation Error:', error);
    },
  });

  const formSubmet = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error loading product</h2>;

  return (
    <>
      <h1>Edit Product </h1>

      <form onSubmit={formSubmet}>
        <div className="mb-3">
          <label htmlFor="productTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="productTitle"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
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
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Product Price"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor={`productDescription`} className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="productDescription"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Product Description"
            aria-describedby="emailHelp"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
        <div
          onClick={() => navigate('/products')}
          className="btn btn-secondary ms-2"
        >
          Back
        </div>
      </form>
    </>
  );
};
