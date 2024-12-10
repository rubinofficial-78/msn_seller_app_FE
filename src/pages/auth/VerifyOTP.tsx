import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, getUserDetails, loginUser } from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import adyaLogo from "../../assests/adya.png";
import { toast } from "react-toastify";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(30); // 30 seconds timer
  const [canResend, setCanResend] = useState(false);
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

  // Add timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  // Handle input change for each OTP digit
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
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

  // Handle resend OTP
  const handleResendOTP = async () => {
    if (!canResend) return;

    try {
      const userId = localStorage.getItem("userid");
      const email = localStorage.getItem("pendingLoginEmail");

      if (!email) {
        toast.error("Email not found. Please try logging in again.");
        navigate("/login");
        return;
      }

      // Dispatch login action again to get new OTP
      const response = await dispatch(loginUser(email) as any);

      if (response?.data) {
        // Reset timer and disable resend button
        setTimer(30);
        setCanResend(false);
        
        // Clear existing OTP
        setOtp(["", "", "", "", "", ""]);
        
        // Focus first input
        const firstInput = document.getElementById("otp-0");
        firstInput?.focus();

        toast.success("New OTP has been sent to your email");
      } else {
        throw new Error("Failed to resend OTP");
      }
    } catch (err: any) {
      console.error("Resend OTP error:", err);
      toast.error(err?.message || "Failed to resend OTP. Please try again.");
    }
  };

  const toggleOTPVisibility = () => {
    setShowOTP(!showOTP);
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
              {/* OTP Input Grid with Eye Icon */}
              <div className="relative w-full max-w-md mx-auto">
                <div className="flex justify-center gap-3 mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type={showOTP ? "text" : "password"}
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={(e) => {
                        e.preventDefault();
                        const pastedData = e.clipboardData.getData('text');
                        const numbers = pastedData.replace(/\D/g, '').slice(0, 6).split('');
                        
                        // Fill available OTP fields with pasted numbers
                        const newOtp = [...otp];
                        numbers.forEach((num, idx) => {
                          if (idx < 6) newOtp[idx] = num;
                        });
                        setOtp(newOtp);
                        
                        // Focus on next empty field or last field
                        const nextEmptyIndex = newOtp.findIndex(val => !val);
                        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
                        document.getElementById(`otp-${focusIndex}`)?.focus();
                      }}
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
                
                {/* Eye Icon Button - Moved below the OTP inputs */}
                <button
                  type="button"
                  onClick={toggleOTPVisibility}
                  className="absolute right-0 -bottom-8
                           p-2 text-gray-500 hover:text-gray-700
                           transition-colors duration-200"
                >
                  {showOTP ? (
                    <EyeOff size={20} className="text-gray-500" />
                  ) : (
                    <Eye size={20} className="text-gray-500" />
                  )}
                </button>
              </div>

              {/* Resend OTP Link */}
              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={!canResend}
                  className={`text-sm transition-colors duration-300 ${
                    canResend 
                      ? "text-blue-600 hover:text-blue-700" 
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {canResend ? (
                    "Resend OTP"
                  ) : (
                    <>
                      Resend OTP in{" "}
                      <span className="font-medium text-gray-600">
                        {timer}s
                      </span>
                    </>
                  )}
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

// Add type for JWT token payload
interface CustomJwtPayload extends JwtPayload {
  roles?: string[];
  user_types?: Array<{ name: string }>;
  affiliate_details?: {
    user_role: string;
  };
}
