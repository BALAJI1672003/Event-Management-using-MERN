import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserAlt } from 'react-icons/fa'; 

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://eventmanagement-backend-2.onrender.com/api/auth/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/auth/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
      // Show success toast notification
      toast.success('User deleted successfully!', {
        position: 'top-center',
        autoClose: 3000, // Duration in milliseconds
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      // Show error toast notification
      toast.error('Failed to delete user!', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen px-5 py-10 bg-gray-100">
      <h1 className="mb-10 text-3xl font-bold text-center text-gray-800">User List</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <div key={user._id} className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <FaUserAlt className="text-2xl text-gray-600" /> {/* User Icon */}
              <h2 className="text-xl font-semibold text-gray-700">{user.name}</h2>
            </div>
            <p className="text-gray-500">{user.email}</p>
            <button
              onClick={() => deleteUser(user._id)}
              className="inline-block px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Toast Container for showing notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
