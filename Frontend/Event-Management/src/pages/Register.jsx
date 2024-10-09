import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
  });
  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: "top-center" // Updated this line
      });
      return;
    }
  
    try {
      const response = await axios.post('https://eventmanagement-backend-2.onrender.com/api/auth/register', formData);
      toast.success('Account created successfully!', {
        position: "top-center" // Updated this line
      });
      navigate('/');
    } catch (error) {
      toast.error('Error creating account', {
        position: "top-center" // Updated this line
      });
    }
  };
  

  return (
    <section className="flex items-center justify-center w-full h-full min-h-screen bg-white">
      <ToastContainer /> {/* ToastContainer must be included to display toasts */}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:w-[400px] lg:w-[500px]">
        <div className="w-full p-8 bg-white rounded-lg shadow-md">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-900">Create an account</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none">Create an account</button>
            <p className="text-sm font-light text-center text-gray-500">
              Already have an account? <a href="#" className="font-medium text-blue-600 hover:underline">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
