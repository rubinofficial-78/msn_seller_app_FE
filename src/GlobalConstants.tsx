import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserRole } from "./types/auth";

interface DecodedToken {
  id?: string;
  roles?: string[];
  user_types?: Array<{ name: string }>;
  affiliate_details?: {
    user_role?: string;
  };
  [key: string]: any;
}

// Get the decoded token once and store it
const getDecodedToken = (): DecodedToken => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found in localStorage");
      return {};
    }
    const decoded = jwtDecode(token);
    console.log("Raw Decoded Token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return {};
  }
};

// Store decoded token in a variable
const decoded_token = getDecodedToken();

const determineUserType = (): UserRole => {
  // First check localStorage for explicitly set role
  const storedRole = localStorage.getItem("userRole");
  if (storedRole) {
    console.log("Using stored role from localStorage:", storedRole);
    return storedRole as UserRole;
  }

  console.log("=== Token Debug Information ===");
  console.log("Token Roles Array:", decoded_token?.roles);
  console.log("User Types Array:", decoded_token?.user_types);
  console.log("Affiliate User Role:", decoded_token?.affiliate_details?.user_role);

  // Try to get role from token in different ways
  const role = decoded_token?.roles?.[0] || 
               decoded_token?.user_types?.[0]?.name || 
               decoded_token?.affiliate_details?.user_role;

  if (role) {
    console.log("Determined role from token:", role);
    return role as UserRole;
  }

  console.warn("No role found, defaulting to COMPANY_BRANCHES");
  return "COMPANY_BRANCHES";
};

const userType = determineUserType();
console.log("Final Determined User Type:", userType);

const GLOBAL_CONSTANTS = {
  // BACKEND_API_URL: "http://localhost:3001/",
  BACKEND_API_URL: "http://20.197.4.12:7001/",

  url: import.meta.env.VITE_BACKEND_API_URL as string,
  fileUrl: import.meta.env.VITE_BACKEND_API_URL as string,
  token: "Bearer " + localStorage.getItem("token"),

  // Use decoded_token that we stored earlier
  id: decoded_token?.id,
  roles: decoded_token?.roles,
  userType,
  parent_company_id: decoded_token?.parent_company_id,
  affiliate_details: decoded_token?.affiliate_details,
  userData: decoded_token,

  DEFAULT_IMAGE:
    "https://storage.googleapis.com/adya_upload_pdf/jpeg/ai_cataloging/file-95a133e8-0457-4688-acec-7dc1e5892d87.jpeg",
  DEFAULT_PROFILE_IMAGE:
    "https://storage.googleapis.com/adya_upload_pdf/Settings/Settings/file-61916c1f-4124-4d71-ad5d-d16e71568f56.jpg",

  GOOGLE_API_KEY: import.meta.env.VITE_GOOGLE_API_KEY as string,
  GOOGLE_MAP_API: import.meta.env.VITE_GOOGLE_MAP_API as string,
  GOOGLE_GEO_CODE_API: import.meta.env.VITE_GOOGLE_GEO_CODE_API as string,
  APP_API_ENCRYPTION_KEY: "0123456789abcdef0123456789abcdefghiklmnopqrstuvwxyz",
};

// Add a debug log for the entire constants object
console.log("=== GLOBAL_CONSTANTS ===", GLOBAL_CONSTANTS);

export const useGlobalConstants = () => {
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === "token" || event.key === "userRole") {
      console.log("Token or Role changed:", event.newValue);
      // Force a refresh of the constants when token/role changes
      window.location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageEvent);
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);
};

export default GLOBAL_CONSTANTS;
