import { NavLink } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

import './products.css';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const Products = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_API_URL}/products`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: async (product) =>
      await axios.delete(`${apiUrl}/products/${product}`),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: `Do you Soure to Delete This Prodeuct`,
      showCancelButton: true,
      confirmButtonText: 'Yes Delete',
      confirmButtonColor: '#ff2400',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        mutation.mutate(id);

        Swal.fire({
          title: 'Deleted!',
          text: 'Your Product has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <h1>Products Page</h1>

      <NavLink to={'add'} end>
        <button className="btn btn-success">Add New Product</button>
      </NavLink>

      <table className="table table-striped mt-5 products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>description</th>
            <th>Price</th>
            <th>Operation</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}...</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    <NavLink to={item.id} className="btn btn-info btn-sm mx-3">
                      view
                    </NavLink>
                    <NavLink
                      to={`edit/${item.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </NavLink>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={'5'} style={{ textAlign: 'center' }}>
                <h1>No products found</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
