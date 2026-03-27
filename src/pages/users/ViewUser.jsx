import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ViewUser = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((res) => setUser(res.data.data.user));
  }, [userId]);

  return (
    <>
      <div>ViewUser</div>

      <form className="mt-3">
        <div className="mb-3">
          <label htmlFor="userfirstName" className="form-label">
            firstName
          </label>
          <input
            type="text"
            className="form-control"
            id="userfirstName"
            value={user.firstName}
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
            value={user.lastName}
            aria-describedby="emailHelp"
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
          />
        </div>
      </form>
    </>
  );
};
