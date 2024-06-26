import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
   const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Clear error message on component mount
  useEffect(() => {
    setError(null);
  }, []);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      if (response.data && response.data.user && response.data.user.email) {
        localStorage.setItem('Profile', JSON.stringify(response.data));
      }
      const { token } = response.data;
      localStorage.setItem('Token', token);
      console.log('Login successful! Token:', token);
         navigate('/landingpage');
    } catch (error) {
      console.log(error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white flex items-center justify-center bg-gradient-to-r from-orange-700 to-violet-900">
      <Link to="/">
        <FaArrowLeft className="text-white text-2xl cursor-pointer" />
      </Link>
      <div className="p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="relative mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email/Username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-field font-bold bg-transparent text-white border-b-2 border-white py-2 px-3"
              required
            />
            <FaEnvelope className="inline-block top-3 left-3 text-gray-500" />
          </div>
          {/* Password input */}
          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="nput-field font-bold bg-transparent text-white border-b-2 border-white py-2 px-3"
              required
            />
            <div
              className="absolute top-3 right-9 text-xl cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              
            />
            <label htmlFor="rememberMe" className="text-white">
              Remember Me
            </label>
          </div>
          {/* Submit button */}
          <div className="flex items-center justify-center pt-9">
            <button
              type="submit"
              className="btn-login text-2xl bg-gradient-to-r from-red-800 to-violet-600  hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline "
              
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
        {/* Signup link */}
        <div className="mt-4">
          <p>Don't have an account?<Link to="/signup">Sign up</Link></p>
          
        </div>
      </div>
    </div>
  );
}

export default SignIn;
