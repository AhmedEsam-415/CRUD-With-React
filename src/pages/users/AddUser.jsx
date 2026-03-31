import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const [userAdd, setUserAdd] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const mutation = useMutation({
    mutationFn: () =>
      axios.post('http://localhost:5000/api/users/register', userAdd),
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      navigate('/users');
    },
  });

  const formSubmit = (e) => {
    e.preventDefault();

    mutation.mutate();
  };

  return (
    <>
      <h1>Add User</h1>

      <form onSubmit={formSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            firstName
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="First Name"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setUserAdd({ ...userAdd, firstName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            lastName
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setUserAdd({ ...userAdd, lastName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Email"
            aria-describedby="emailHelp"
            onChange={(e) => setUserAdd({ ...userAdd, email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            aria-describedby="emailHelp"
            onChange={(e) =>
              setUserAdd({ ...userAdd, password: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            placeholder="role"
            aria-describedby="emailHelp"
            onChange={(e) => setUserAdd({ ...userAdd, role: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add User
        </button>
        <button
          onClick={() => navigation('/users')}
          className="btn btn-secondary ms-2 hover:bg-red"
        >
          Back
        </button>
      </form>
    </>
  );
};
