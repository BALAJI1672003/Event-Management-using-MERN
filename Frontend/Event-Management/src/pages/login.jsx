import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // For navigating after login

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/auth/login", formData);
      
      if (response.data) {
        toast.success('Login successful!', { position: 'top-center' });
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('Admin',response.data.isAdmin);
        setTimeout(() => {
          navigate('/home');
        }, 2000); 
      } else {
        toast.error('Invalid email or password', { position: 'top-center' });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', { position: 'top-center' });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange} // Handle input change
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange} // Handle input change
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="flex flex-row justify-center gap-3 mt-10 text-sm text-center text-gray-500">
            Don't have an account?
            <Link to="/register">
              <h3 className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register here</h3>
            </Link>             
          </p>
        </div>
      </div>
    </>
  );
}
