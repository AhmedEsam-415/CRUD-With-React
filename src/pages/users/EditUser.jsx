import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EditUser = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => setUser(res.data.data.user));
  }, [userId]);

  const hendelSubmit = () => {
    axios
      .patch(`http://localhost:5000/api/users/${userId}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      })
      .then(() =>
        Swal.fire({
          title: 'Drag me!',
          icon: 'success',
          draggable: true,
        })
      )
      .catch((err) => console.log(err));

    navigate('/users');
  };

  return (
    <>
      <div>EditUser</div>

      <form onSubmit={hendelSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="userfirstName" className="form-label">
            firstName
          </label>
          <input
            type="text"
            className="form-control"
            id="userfirstName"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userlastName" className="form-label">
            lastName
          </label>
          <input
            type="text"
            className="form-control"
            id="userlastName"
            aria-describedby="emailHelp"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor={`userEmail`} className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="userEmail"
            value={user.email}
            aria-describedby="emailHelp"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userRole" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="userRole"
            value={user.role}
            placeholder="Product Category"
            aria-describedby="emailHelp"
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
    </>
  );
};
