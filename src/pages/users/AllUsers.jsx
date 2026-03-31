import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router';

import axios from 'axios';
import Swal from 'sweetalert2';

export const AllUsers = () => {
  const queryClient = useQueryClient();
  const userRole = localStorage.getItem('role');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['Users'],
    queryFn: async () =>
      await axios.get('http://localhost:5000/api/users').then((res) => {
        const fetchedData = res.data.data.Users;
        // لو الباك إند رجع نص اسمه No Data، رجع إنت مصفوفة فاضية عشان الـ map ميضربش
        if (fetchedData === 'No Data') {
          return [];
        }
        return fetchedData;
      }),
  });

  const mutation = useMutation({
    mutationFn: async (userID) => {
      return await axios.delete(`http://localhost:5000/api/users/${userID}`);
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['Users'] });
      Swal.fire('Deleted!', '', 'success');
    },
    onError: (error) => {
      const errorMessage = error.message || 'Something went wrong!';
      Swal.fire('Error!', errorMessage, 'error');
    },
  });

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
        mutation.mutate(userID);
      }
    });
  };

  if (isLoading) return <h1>Loading...</h1>;
  if ((isError, error))
    return <h1>Error occurred while fetching users. {error.message}</h1>;

  return (
    <>
      <h1>All Users</h1>

      {userRole === 'admin' && (
        <NavLink to={'add'} end>
          <button className="btn btn-success">Add New Product</button>
        </NavLink>
      )}

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
          {/* 1. أول حاجة نختبر لو الداتا لسة بتحمل */}
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center">
                Loading...
              </td>
            </tr>
          ) : /* 2. نتأكد إن الداتا موجودة وفيها عناصر */
          data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                // يفضل دايماً تستخدم _id بدل index في الـ key
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    {userRole === 'admin' && (
                      <button
                        onClick={() => deleteUser(item._id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    )}
                    <NavLink to={item._id} className="btn btn-info btn-sm mx-3">
                      View
                    </NavLink>
                    {userRole === 'admin' && (
                      <NavLink
                        to={`edit/${item._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </NavLink>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            /* 3. لو الـ API رد ومفيش أي يوزرز (الداتا فاضية) */
            <tr>
              {/* خليت الـ colSpan 6 عشان يغطي كل العواميد بما فيها الأزرار */}
              <td colSpan="6" className="text-center">
                <h1>No users found.</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
