import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GLOBAL_CONSTANTS = {
  BACKEND_API_URL: "http://localhost:3001/",
  // ... other constants
};

export default GLOBAL_CONSTANTS;
