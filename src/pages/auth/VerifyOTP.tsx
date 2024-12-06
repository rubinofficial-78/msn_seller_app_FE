import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, getUserDetails } from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import adyaLogo from "../../assests/adya.png";
import { toast } from "react-toastify";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { jwtDecode } from "jwt-decode";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = localStorage.getItem("pendingLoginEmail");
  const redirectTo = location.state?.redirectTo;

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

      if (otpResponse?.data?.token) {
        // Store the new token
        localStorage.setItem("token", otpResponse.data.token);
        
        // Force reload GLOBAL_CONSTANTS with new token
        const decoded = jwtDecode(otpResponse.data.token);
        console.log("Decoded Token after OTP:", decoded);
        
        // Extract role from token
        const userRole = decoded?.roles?.[0] || 
                        decoded?.user_types?.[0]?.name || 
                        decoded?.affiliate_details?.user_role;
        
        console.log("Extracted User Role:", userRole);
        localStorage.setItem("userRole", userRole);

        // Get user details with new token
        const userResponse = await dispatch(
          getUserDetails(Number(userId)) as any
        );

        console.log("User Details Response:", userResponse);

        // Force a page reload to update GLOBAL_CONSTANTS
        if (!isNewUser) {
          window.location.href = userRole === "SELLER" 
            ? "/dashboard/seller-dashboard"
            : "/dashboard";
          return;
        }

        if (isNewUser) {
          navigate("/onboarding");
        }
      } else {
        throw new Error("OTP verification failed - no token received");
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setError(err?.message || "OTP verification failed. Please try again.");
      toast.error(err?.message || "OTP verification failed. Please try again.");
    }
  };

  const handleResendOTP = () => {
    // Add resend OTP logic here
    toast.info("Resending OTP...", { autoClose: 2000 });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDF8F4]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dotted Rectangle - Left */}
        <div 
          className="absolute left-[10%] bottom-[20%] w-20 h-28 bg-[#FFE4C8] opacity-60"
          style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Dotted Rectangle - Right */}
        <div 
          className="absolute right-[10%] top-[30%] w-20 h-28 bg-[#FFE4C8] opacity-60"
          style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Curved Lines */}
        <div className="absolute left-[15%] bottom-[30%] w-32 h-32 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M10,50 Q30,20 50,50 T90,50" 
              fill="none" 
              stroke="#000" 
              strokeWidth="1"
              className="animate-draw"
            />
          </svg>
        </div>

        <div className="absolute right-[15%] bottom-[40%] w-32 h-32 opacity-30">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d="M10,50 Q30,80 50,50 T90,50" 
              fill="none" 
              stroke="#000" 
              strokeWidth="1"
              className="animate-draw"
            />
          </svg>
        </div>

        {/* Small Rectangles */}
        <div className="absolute left-[25%] bottom-[25%] w-12 h-16 border border-gray-300 opacity-30" />
        <div className="absolute right-[25%] top-[35%] w-12 h-16 border border-gray-300 opacity-30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* OTP Verification Card - Updated with cream background */}
          <div className="bg-[#FDF8F4] rounded-2xl shadow-lg p-8 space-y-6 border border-[#FFE4C8]/20">
            {/* Logo Container */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-white/50 rounded-full shadow-sm animate-pulse-slow">
                <img
                  id="adya-logo"
                  src={adyaLogo}
                  alt="Adya Logo"
                  className="w-16 h-16 animate-float"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
              <p className="text-gray-600 text-center">
                Please enter the verification code sent to your {email ? `email ${email.slice(0, 3)}***${email.slice(email.indexOf("@"))}` : "registered email"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50/50 text-red-500 px-4 py-3 rounded-lg text-center text-sm">
                {error}
              </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* OTP Input Grid */}
              <div className="flex justify-center gap-3">
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
                    className="w-12 h-12 text-center text-xl font-semibold 
                             bg-white/80 border-2 border-[#FFE4C8]/50 rounded-lg 
                             text-gray-900 
                             focus:border-[#FFE4C8]/70 focus:ring-0 
                             transition-all duration-300
                             hover:border-[#FFE4C8]/60
                             shadow-sm"
                  />
                ))}
              </div>

              {/* Resend OTP Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-300"
                >
                  Didn't receive code? Resend OTP
                </button>
              </div>

              {/* Submit Button */}
              <button
                id="verify-otp-continue-button"
                type="submit"
                className="w-full py-3 px-4 bg-blue-900 text-white rounded-lg font-medium
                         transform transition-all duration-300 hover:scale-[1.02]
                         hover:shadow-lg active:scale-[0.98] focus:outline-none
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-blue-800"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
