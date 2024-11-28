import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import adyaLogo from "../../assests/adya.png";
import { AppDispatch } from "../../redux/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { login } = useAuth();

  // Get loading and error states from Redux with proper typing
  const loading = useSelector((state: RootState) => state.data.loading);
  const reduxError = useSelector((state: RootState) => state.data.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if email is valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      // Dispatch login action and wait for response
      const response = await dispatch(loginUser(email) as any);

      // Store user ID from login response
      if (response?.data) {
        localStorage.setItem("userid", response.data.id.toString());
        // Store new user status
        localStorage.setItem("isNewUser", response.data.new_user.toString());
      }

      // Login successful - update auth context
      login(email);

      // Store email for verification
      localStorage.setItem("pendingLoginEmail", email);

      // Always navigate to verify OTP first
      if (email === "hub@adya.ai") {
        navigate("/verify-otp", {
          state: { redirectTo: "/dashboard/seller-dashboard" },
        });
      } else if (email.includes("admin")) {
        navigate("/verify-otp", {
          state: { redirectTo: "/dashboard" },
        });
      } else {
        // For regular users, check if they're new
        const isNewUser = response.data.new_user;
        navigate("/verify-otp", {
          state: {
            redirectTo: isNewUser
              ? "/onboarding"
              : "/dashboard/seller-dashboard",
          },
        });
      }
    } catch (err) {
      setError(reduxError || "Login failed. Please try again.");
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
