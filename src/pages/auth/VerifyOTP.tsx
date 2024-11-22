import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate OTP here
    navigate('/dashboard');
  };

  const handleResend = () => {
    setTimer(30);
    // In a real app, you would make an API call to resend OTP
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Lock className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the OTP sent to your email/mobile
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-12 h-12 text-center border-2 border-gray-300 rounded-md text-lg focus:border-blue-500 focus:ring-blue-500"
                  />
                ))}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
            </div>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend OTP in {timer} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;