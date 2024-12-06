import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import adyaLogo from "../../assests/adya.png";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import { toast } from "react-toastify";

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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="flex flex-col items-center">
          <img id="adya-logo" src={adyaLogo} alt="Adya Logo" className="w-20 h-20" />
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
              type="text"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Email ID or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            id="login-button"
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
