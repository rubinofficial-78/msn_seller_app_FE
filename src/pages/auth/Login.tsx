import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import adyaLogo from '../../assests/adya.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Login the user
    login(email);

    // Store email for verification
    sessionStorage.setItem('pendingLoginEmail', email);

    // Get stored onboarding status
    const hasCompletedOnboarding = sessionStorage.getItem(`onboarding_${email}`);

    // Route based on email type and onboarding status
    if (email === 'hub@adya.ai') {
      // Only hub@adya.ai needs OTP verification
      navigate('/verify-otp', { 
        state: { 
          redirectTo: '/dashboard/seller-dashboard' 
        }
      });
    } else if (email.includes('admin')) {
      // Admin user goes to OTP verification
      navigate('/verify-otp');
    } else if (hasCompletedOnboarding === 'true') {
      // Completed onboarding users go directly to dashboard
      navigate('/dashboard/seller-dashboard');
    } else {
      // New users go to onboarding
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="flex flex-col items-center">
          <img src={adyaLogo} alt="Adya Logo" className="w-20 h-20" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Please provide your email or mobile number to sign up or log in.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Email ID or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}