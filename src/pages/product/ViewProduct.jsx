import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const ViewProduct = () => {
  //! The idea here in useParams
  let { productId } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', productId],
    queryFn: () =>
      axios.get(`${apiUrl}/products/${productId}`).then((res) => res.data),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Product {productId}</h1>
      <br />
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>Price: {data.price}</p>
          <p>description: {data.description}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </>
  );
};
