import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

export const EditProduct = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [productId, apiUrl]);

  const formSubmet = (e) => {
    e.preventDefault();

    axios
      .put(`${apiUrl}/products/${productId}`, {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
      })
      .then(() =>
        Swal.fire({
          title: 'Drag me!',
          icon: 'success',
          draggable: true,
        })
      )
      .catch((err) => console.log(err));

    navigate('/products');
  };

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

        {product.category && (
          <div className="mb-3">
            <label htmlFor="productcategory" className="form-label">
              category
            </label>
            <input
              type="text"
              className="form-control"
              id="productcategory"
              value={product.category}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
              placeholder="Product Category"
              aria-describedby="emailHelp"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Update Product
        </button>
      </form>
    </>
  );
};
