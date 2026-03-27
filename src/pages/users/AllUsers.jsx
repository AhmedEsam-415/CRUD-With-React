import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';

export const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUser = () => {
    axios
      .get('http://localhost:5000/api/users')
      .then((res) => setUsers(res.data.data.Users));
  };

  useEffect(() => getAllUser(), []);

  const deleteUser = (userID) => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want Delete This User?',
      showCancelButton: true,
      confirmButtonColor: ' #d33 ',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Deleted!', '', 'success');

        axios
          .delete(`http://localhost:5000/api/users/${userID}`)
          .then(() => getAllUser())
          .catch((err) => console.log(err));
      } else if (result.isDenied)
        Swal.fire('Changes are not saved', '', 'info');
    });
  };

  return (
    <>
      <h1>All Users</h1>

      <NavLink to={'add'} end>
        <button className="btn btn-success">Add New User</button>
      </NavLink>

      <table className="table table-striped mt-5 products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length >= 1 ? (
            users.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(item._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                    <NavLink to={item._id} className="btn btn-info btn-sm mx-3">
                      view
                    </NavLink>
                    <NavLink
                      to={`edit/${item._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </NavLink>
                  </td>
                </tr>
              );
            })
          ) : (
            <>
              <h1>Loading...</h1>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};
