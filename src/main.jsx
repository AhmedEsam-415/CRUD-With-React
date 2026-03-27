import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

// React Router Dom
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import { Home } from './pages/home/Home.jsx';
import { Products } from './pages/product/Products.jsx';
import { AddProduct } from './pages/product/AddProduct.jsx';
import { ViewProduct } from './pages/product/ViewProduct.jsx';
import { EditProduct } from './pages/product/EditProduct.jsx';

let router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'products',
        children: [
          { index: true, element: <Products /> },
          { path: 'add', element: <AddProduct /> },
          { path: ':productId', element: <ViewProduct /> },
          { path: 'edit/:productId', element: <EditProduct /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
