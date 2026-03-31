import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const ViewUser = () => {
  const { userId } = useParams();
  const navigation = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['Users'],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => res.data.data.user),
  });

  if (isLoading) return <h1>Loading...</h1>;
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
            value={data.firstName}
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
            value={data.lastName}
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
            value={data.email}
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
            value={data.role}
            placeholder="Product Category"
            aria-describedby="emailHelp"
          />
        </div>
        <button
          onClick={() => navigation('/users')}
          className="btn btn-secondary"
        >
          Back
        </button>
      </form>
    </>
  );
};
