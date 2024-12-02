import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id?: string;
  roles?: string[];
  parent_company_id?: string;
  affiliate_details?: any;
  [key: string]: any;
}

// Add safe token decoding
const getDecodedToken = (): DecodedToken => {
  try {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : {};
  } catch (error) {
    console.warn("Invalid token format:", error);
    return {};
  }
};

const decoded_token = getDecodedToken();
console.log("Token Roles Array:", decoded_token?.roles);
console.log("User Types Array:", decoded_token?.user_types);
console.log(
  "Affiliate User Role:",
  decoded_token?.affiliate_details?.user_role
);

const GLOBAL_CONSTANTS = {
  BACKEND_API_URL: "http://localhost:3001/",

  url: import.meta.env.VITE_BACKEND_API_URL as string,
  fileUrl: import.meta.env.VITE_BACKEND_API_URL as string,
  token: "Bearer " + localStorage.getItem("token"),

  id: decoded_token?.id,
  roles: decoded_token?.roles,
  userType:
    decoded_token?.roles?.[0] ||
    decoded_token?.user_types?.[0]?.name ||
    decoded_token?.affiliate_details?.user_role,

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

export const useGlobalConstants = () => {
  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === "token") {
      GLOBAL_CONSTANTS.token = "Bearer " + event.newValue;
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
