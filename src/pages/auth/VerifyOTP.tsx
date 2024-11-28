import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, getUserDetails } from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import adyaLogo from "../../assests/adya.png";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = localStorage.getItem("pendingLoginEmail");

  const loading = useSelector(
    (state: RootState) => state.data.otpVerification.loading
  );
  const reduxError = useSelector(
    (state: RootState) => state.data.otpVerification.error
  );

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
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const userId = localStorage.getItem("userid");
      const isNewUser = localStorage.getItem("isNewUser") === "true";

      // Verify OTP
      const otpResponse = await dispatch(
        verifyOTP(Number(userId), otpValue) as any
      );

      // Store the token
      if (otpResponse?.data?.token) {
        localStorage.setItem("token", otpResponse.data.token);
      }

      // Get user details
      const userResponse = await dispatch(
        getUserDetails(Number(userId)) as any
      );

      // Clear verification data
      localStorage.removeItem("pendingLoginEmail");

      if (isNewUser) {
        // New users always go to onboarding first
        navigate("/onboarding");
      } else {
        // Check user type for existing users
        const userType = userResponse?.data?.user_type?.value;
        if (userType === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard/seller-dashboard");
        }
      }
    } catch (err) {
      setError(reduxError || "OTP verification failed. Please try again.");
    }
  };

  const handleResendOTP = () => {
    // Add resend OTP logic here
    toast.info("Resending OTP...", { autoClose: 2000 });
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
              Resend OTP to{" "}
              {email ? `s***${email.slice(email.indexOf("@"))}` : ""}
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Verifying..." : "CONTINUE"}
          </button>
        </form>
      </div>
    </div>
  );
}
