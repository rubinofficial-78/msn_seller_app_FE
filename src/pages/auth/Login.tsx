import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import adyaLogo from "../../assests/adya.png";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { toast } from "react-toastify";

// Add this CSS at the top of your file or in a separate CSS file
const styles = {
  backgroundAnimation: `
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  `,
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email or mobile number format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email
    const phoneRegex = /^\d{10}$/; // Regex for 10-digit mobile number

    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setError("Please enter a valid email or mobile number.");
      toast.error("Please enter a valid email or mobile number.");
      return;
    }

    try {
      // Dispatch login action and wait for response
      const response = await dispatch(loginUser(email) as any);

      if (response?.data) {
        // Store token and user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.id.toString());
        localStorage.setItem("isNewUser", response.data.new_user.toString());

        // Force reload GLOBAL_CONSTANTS to get updated user type
        const userType = GLOBAL_CONSTANTS.userType;
        console.log("User Type after login:", userType);

        // Login successful - update auth context
        login(email);

        // Determine redirect path based on user type and new user status
        let redirectPath = "/verify-otp";
        const isNewUser = response.data.new_user;

        if (isNewUser) {
          redirectPath = "/onboarding";
        } else {
          switch (userType) {
            case "ADMIN":
              redirectPath = "/dashboard";
              break;
            case "SELLER":
              redirectPath = "/dashboard/seller-dashboard";
              break;
            case "AFFILIATE_PARTNER":
            case "COMPANY_PARTNER":
            case "COMPANY_BRANCHES":
            case "COMPANY_PARTNER_USERS":
              redirectPath = "/dashboard";
              break;
            default:
              redirectPath = "/dashboard";
          }
        }

        // Navigate to OTP verification with the final redirect path
        navigate("/verify-otp", {
          state: { redirectTo: redirectPath },
        });
      } else {
        throw new Error("Login failed - no data received");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Login failed. Please try again.");
      toast.error(err?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDF8F4]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dotted Rectangle - Left */}
        <div 
          className="absolute left-[10%] top-[30%] w-20 h-28 bg-[#FFE4C8] opacity-60"
          style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Dotted Rectangle - Right */}
        <div 
          className="absolute right-[10%] bottom-[20%] w-20 h-28 bg-[#FFE4C8] opacity-60"
          style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '8px 8px'
          }}
        />

        {/* Curved Lines */}
        <div className="absolute left-[15%] top-[20%] w-32 h-32 opacity-30">
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

        <div className="absolute right-[15%] top-[60%] w-32 h-32 opacity-30">
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
        <div className="absolute left-[25%] top-[40%] w-12 h-16 border border-gray-300 opacity-30" />
        <div className="absolute right-[25%] bottom-[30%] w-12 h-16 border border-gray-300 opacity-30" />

        {/* Illustration - Right */}
        {/* <div className="absolute right-[15%] top-[30%] w-64 h-64 opacity-80">
          <img 
            src="/illustrations/working-girl.svg" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </div> */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Login Card - Updated with cream background */}
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
              <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
              <p className="text-gray-600 text-center">
                Please provide your email or mobile number to sign up or log in.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50/50 text-red-500 px-4 py-3 rounded-lg text-center text-sm">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/50 border border-[#FFE4C8]/30 rounded-lg 
                           text-gray-900 placeholder-gray-500
                           focus:border-[#FFE4C8]/50 focus:ring-0 
                           transition-all duration-300
                           hover:border-[#FFE4C8]/40"
                  placeholder="Enter Email ID or Phone Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                id="login-button"
                type="submit"
                className="w-full py-3 px-4 bg-blue-900 text-white rounded-lg font-medium
                         transform transition-all duration-300 hover:scale-[1.02]
                         hover:shadow-lg active:scale-[0.98] focus:outline-none
                         hover:bg-blue-800"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
