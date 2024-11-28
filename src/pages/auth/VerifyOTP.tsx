import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import adyaLogo from '../../assests/adya.png';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = sessionStorage.getItem('pendingLoginEmail');

  // Handle input change for each OTP digit
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (email === 'hub@adya.ai') {
      // Get the redirect path from location state or use default
      const redirectTo = location.state?.redirectTo || '/dashboard/seller-dashboard';
      navigate(redirectTo);
    } else if (email?.includes('admin')) {
      navigate('/dashboard');
    } else {
      // This case shouldn't happen as other users don't need OTP
      navigate('/dashboard/seller-dashboard');
    }
  };

  const handleResendOTP = () => {
    // Add resend OTP logic here
    console.log('Resending OTP...');
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

        <form onSubmit={handleSubmit} className="mt-8">
          {/* OTP Input Grid */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              />
            ))}
          </div>

          {/* Resend OTP Link */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Resend OTP to {email ? `s***${email.slice(email.indexOf('@'))}` : ''}
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
}