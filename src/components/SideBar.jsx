import { NavLink } from 'react-router';

export const SideBar = () => {
  return (
    <>
      <nav className="list-unstyled">
        <li>
          <NavLink to="/products" end>
            Get All Products
          </NavLink>
        </li>
        <li>
          <NavLink to={'/users'}>Get All Users</NavLink>
        </li>
      </nav>
    </>
  );
};
