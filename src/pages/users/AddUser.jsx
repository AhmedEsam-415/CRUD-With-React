import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/users/register', {
        firstName,
        lastName,
        email,
        role,
        password,
      })
      .then(() => navigate('/users'))
      .catch((err) => console.log(err));
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
            onChange={(e) => setFirstName(e.target.value)}
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
            onChange={(e) => setLastName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
    </>
  );
};
