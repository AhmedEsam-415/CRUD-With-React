import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import axios from 'axios';
import Swal from 'sweetalert2';

export const Login = () => {
  // 1. تعريف المتغيرات (State) لحفظ الإيميل والباسورد
  const [logInUser, setLogInUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // اساس اللعبه كلها هنا 
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        logInUser
      );
      return response.data.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      const token = response.token;
      if (token) localStorage.setItem('token', `Bearer ${token}`); // حفظ التوكن

      const role = response.user.role;
      if (role) localStorage.setItem('role', role); // حفظ الرول

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/users');
    },

    onError: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response.data.message || 'Invalid Email or Password!',
      });
    },
  });

  // 2. الدالة اللي هتشتغل لما ندوس على زرار Login
  const handleLogin = (e) => {
    e.preventDefault(); // عشان نمنع الصفحة تعمل Refresh
    mutation.mutate();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                {/* حقل الإيميل */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                    value={logInUser.email}
                    onChange={(e) =>
                      setLogInUser({ ...logInUser, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                </div>

                {/* حقل الباسورد */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    required
                    value={logInUser.password}
                    onChange={(e) =>
                      setLogInUser({ ...logInUser, password: e.target.value })
                    }
                    placeholder="Enter your password"
                  />
                </div>

                {/* زرار الدخول */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
