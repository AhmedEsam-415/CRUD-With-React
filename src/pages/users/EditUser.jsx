import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

export const EditUser = () => {
  const [userEdit, setUserEdit] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const { userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['Users'],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/users/${userId}`)
        .then((res) => res.data.data.user),
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (data) setUserEdit(data);
  }, [data]);

  const mutation = useMutation({
    mutationFn: () =>
      axios.patch(`http://localhost:5000/api/users/${userId}`, userEdit),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['Users'] });

      await Swal.fire({
        title: 'User Updated Successfully',
        icon: 'success',
        draggable: true,
      });

      navigate('/users');
    },
  });

  const hendelSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) return <h1>Loading...</h1>;

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
            value={userEdit.firstName}
            onChange={(e) =>
              setUserEdit({ ...userEdit, firstName: e.target.value })
            }
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
            value={userEdit.lastName}
            onChange={(e) =>
              setUserEdit({ ...userEdit, lastName: e.target.value })
            }
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
            value={userEdit.email}
            aria-describedby="emailHelp"
            onChange={(e) =>
              setUserEdit({ ...userEdit, email: e.target.value })
            }
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
            value={userEdit.role}
            placeholder="Product Category"
            aria-describedby="emailHelp"
            onChange={(e) => setUserEdit({ ...userEdit, role: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
        <div
          onClick={() => navigate('/users')}
          className="btn btn-secondary ms-2"
        >
          Back
        </div>
      </form>
    </>
  );
};
