import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import './products.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Products = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);

  const getAllProducts = () => {
    axios
      .get(`${apiUrl}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => getAllProducts());

  const deleteProduct = (product) => {
    Swal.fire({
      icon: 'warning',
      title: `Do you Soure to Delete This Prodeuct`,
      showCancelButton: true,
      confirmButtonText: 'Yes Delete',
      confirmButtonColor: '#ff2400',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your Product has been deleted.',
          icon: 'success',
        });

        axios
          .delete(`${apiUrl}/products/${product}`)
          .then(() => getAllProducts())
          .catch((err) => console.log(err));
      }
    });
  };

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
          {products.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}...</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => deleteProduct(item.id)}
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
          })}
        </tbody>
      </table>
    </>
  );
};
