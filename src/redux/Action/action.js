import axios from "axios";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
import * as types from "./actionType";

// utils
import {
  toast
} from "react-toastify";

// login ----------------------------------------------------------------------------------------------

// export const loginUser = (data, callback) => {
//   return function () {
//     var headers = {
//       "Content-type": "application/json",
//     };
//     axios
//       .post(
//         `${GLOBAL_CONSTANTS.BACKEND_API_URL}api/v1/auth/login`,
//         JSON.stringify(data), {
//           headers,
//         }
//       )
//       .then((resp) => {
//         callback(resp);
//       })
//       .catch((error) => {
//         toast.error(
//           error?.response?.data?.meta?.message ?? "User doesn't exist, Please Signup", {
//             autoClose: 2000,
//           }
//         );
//         callback(error);
//       });
//   };
// };

// export const verifyUsertOtp = (data, callback) => {
//   return function () {
//     var headers = {
//       "Content-type": "application/json",
//     };
//     axios
//       .post(
//         `${GLOBAL_CONSTANTS.BACKEND_API_URL}api/v1/auth/verify`,
//         JSON.stringify(data), {
//           headers,
//         }
//       )
//       .then((resp) => {
//         callback(resp);
//       })
//       .catch((error) => {
//         toast.error(
//           error?.response?.data?.meta?.message ?? "Something went wrong", {
//             autoClose: 2000,
//           }
//         );
//       });
//   };
// };

// export const loginSso = (data, callback) => {
//   return function () {
//     var headers = {
//       "Content-type": "application/json",
//     };
//     axios
//       .post(
//         `${GLOBAL_CONSTANTS.BACKEND_API_URL}api/v1/auth/ssologin`,
//         JSON.stringify(data), {
//           headers,
//         }
//       )
//       .then((resp) => {
//         callback(resp);
//       })
//       .catch((error) => {
//         toast.error(
//           error?.response?.data?.meta?.message ?? "Something went wrong", {
//             autoClose: 2000,
//           }
//         );
//       });
//   };
// };
// // user create -----------------------------------------------------------------------------------------

// export const user_create_API = (data, callback = () => {}) => {
//   return function () {
//     var headers = {
//       "Content-type": "application/json",
//       Authorization: `${GLOBAL_CONSTANTS.token}`,
//       "atma-session-id": localStorage.getItem("atma-session-id"),
//     };
//     axios
//       .post(
//         `${GLOBAL_CONSTANTS.BACKEND_API_URL}api/v1/users/user_create`,
//         JSON.stringify(data), {
//           headers,
//         }
//       )
//       .then((resp) => {
//         callback(resp);
//       })
//       .catch((error) => {
//         toast.error(
//           error?.response?.data?.meta?.message ?? "User already exists, Please login", {
//             autoClose: 2000,
//           }
//         );
//       });
//   };
// };

 