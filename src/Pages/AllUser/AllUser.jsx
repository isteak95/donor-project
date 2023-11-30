import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-user');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const refech = () => {
    // Implement a function to refetch users
    // For example, you can call fetchUsers() again
    // and update the state accordingly

  };

  useEffect(() => {
    filterUsers();
  }, [statusFilter, users]);

  const filterUsers = () => {
    if (statusFilter === 'all') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.status === statusFilter));
    }
  };

  const handleBlock = (users) => {
    axios.patch(`http://localhost:5000/users/block/${users._id}`)
    .then(res => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refech();
        toast.success('volunteer successful!');

      }
    })
    .catch(error => {
      console.error('Error making user a volunteer:', error);
    });
  };

  const handleUnblock = (users) => {
    axios.patch(`http://localhost:5000/users/unblock/${users._id}`)
    .then(res => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refech();
        toast.success('volunteer successful!');

      }
    })
    .catch(error => {
      console.error('Error making user a volunteer:', error);
    });
  };

  const handleMakeVolunteer = (users) => {
    // Implement logic to make user a volunteer
    axios.patch(`http://localhost:5000/users/volunteer/${users._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refech();
          toast.success('volunteer successful!');

        }
      })
      .catch(error => {
        console.error('Error making user a volunteer:', error);
      });
  };
  
  const handleMakeAdmin = (users) => {
    axios.patch(`http://localhost:5000/users/admin/${users._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refech();
          toast.success('Admin successful!');

        }
      })
      .catch(error => {
        console.error('Error making user admin:', error);
      });
  };

  return (
    <div className='lg:mx-10 my-10 '>
      <h2 className=' mt-5 text-center text-black text-3xl font-bold'>All User </h2>

      <div className=' my-10 text-center text-black lg:text-3xl font-bold'>
        <label className="mr-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="block">Blocked</option>
        </select>
      </div>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th className='lg:text-lg text-black'>Avatar</th>
            <th className='lg:text-lg text-black'>Email</th>
            <th className='lg:text-lg text-black'>Name</th>
            <th className='lg:text-lg text-black'>Status</th>
            <th className='lg:text-lg text-black'>Actions</th>
          </tr>
        </thead>
        <tbody className=' bg-base-300'>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.avater}
                  className="h-10 w-10 rounded-full cursor-pointer"
                  alt={`${user.name}'s avatar`}
                />
              </td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.status}</td>
              <td>
                <div className='my-2 '>
                  {user.status === 'active' ? (
                    <button className='btn btn-error text-white ' onClick={() => handleBlock(user)}>
                      Block User
                    </button>
                  ) : (
                    <button className='btn btn-error text-white ' onClick={() => handleUnblock(user)}>
                      Unblock User
                    </button>
                  )}
                </div>
                <div className='my-2 '>
                  <button className='btn btn-success text-white mr-3 ' onClick={() => handleMakeVolunteer(user)}>
                    Make Volunteer
                  </button>
                  <button className='btn btn-accent  ' onClick={() => handleMakeAdmin(user)}>
                    Make Admin
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer position="top-right" />

    </div>
  );
};

export default AllUser;
