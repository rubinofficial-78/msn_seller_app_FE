import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_DASHBOARD_COUNTS_REQUEST,
  GET_DASHBOARD_COUNTS_SUCCESS,
  GET_DASHBOARD_COUNTS_FAILURE,
  GET_SELLER_COUNTS_REQUEST,
  GET_SELLER_COUNTS_SUCCESS,
  GET_SELLER_COUNTS_FAILURE,
  GET_AFFILIATE_PARTNER_COUNTS_REQUEST,
  GET_AFFILIATE_PARTNER_COUNTS_SUCCESS,
  GET_AFFILIATE_PARTNER_COUNTS_FAILURE,
  GET_LOOKUP_CODES_REQUEST,
  GET_LOOKUP_CODES_SUCCESS,
  GET_LOOKUP_CODES_FAILURE,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_STORE_DETAILS_REQUEST,
  UPDATE_STORE_DETAILS_SUCCESS,
  UPDATE_STORE_DETAILS_FAILURE,
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILURE,
  UPDATE_BUSINESS_SETTINGS_REQUEST,
  UPDATE_BUSINESS_SETTINGS_SUCCESS,
  UPDATE_BUSINESS_SETTINGS_FAILURE,
  UPDATE_BANK_DETAILS_REQUEST,
  UPDATE_BANK_DETAILS_SUCCESS,
  UPDATE_BANK_DETAILS_FAILURE,
  GET_SELLER_DASHBOARD_COUNTS_REQUEST,
  GET_SELLER_DASHBOARD_COUNTS_SUCCESS,
  GET_SELLER_DASHBOARD_COUNTS_FAILURE
} from './action.types';
import { RootState, AuthActionTypes, FileUploadPayload, FileUploadResponse } from '../types';

export const loginUser = (
  email: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post('http://localhost:3001/api/v1/backend_master/auth/login', {
        login: email
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error instanceof Error ? error.message : 'Login failed'
      });
      throw error;
    }
  };
};

export const verifyOTP = (
  userId: number,
  otp: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: VERIFY_OTP_REQUEST });

    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/backend_master/auth/verify_otp',
        {
          id: userId,
          otp: otp
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: VERIFY_OTP_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: VERIFY_OTP_FAILURE,
        payload: error instanceof Error ? error.message : 'OTP verification failed'
      });
      throw error;
    }
  };
};

export const getUserDetails = (
  userId: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_USER_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3001/api/v1/backend_master/auth/get/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: GET_USER_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: GET_USER_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to get user details'
      });
      throw error;
    }
  };
};

export const getDashboardCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_DASHBOARD_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3001/api/v1/backend_master/dashboard/count',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: GET_DASHBOARD_COUNTS_SUCCESS,
        payload: response.data.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: GET_DASHBOARD_COUNTS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch dashboard counts'
      });
      throw error;
    }
  };
};

export const getSellerCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLER_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3001/api/v1/backend_master/seller/count',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: GET_SELLER_COUNTS_SUCCESS,
        payload: response.data.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: GET_SELLER_COUNTS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch seller counts'
      });
      throw error;
    }
  };
};

export const getAffiliatePartnerCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_AFFILIATE_PARTNER_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'http://localhost:3001/api/v1/backend_master/affiliate_partners_basic_details/count',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: GET_AFFILIATE_PARTNER_COUNTS_SUCCESS,
        payload: response.data.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: GET_AFFILIATE_PARTNER_COUNTS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch affiliate partner counts'
      });
      throw error;
    }
  };
};

export const getLookupCodes = (
  type: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_LOOKUP_CODES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<LookupCodeResponse>(
        `http://localhost:3001/api/v1/backend_master/core/lookup_code/list/${type}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: GET_LOOKUP_CODES_SUCCESS,
        payload: response.data.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: GET_LOOKUP_CODES_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch lookup codes'
      });
      throw error;
    }
  };
};

interface UpdateUserDetailsPayload {
  name: string;
  mobile_number: string;
  email: string;
}

interface UpdateStoreDetailsPayload {
  name: string;
  store_contact_number: string;
  store_email: string;
  default_address: {
    address_line_1: string;
    state: string;
    city: string;
    pin_code: string;
  };
  website: string;
}

export const updateUserDetails = (
  userId: number,
  data: UpdateUserDetailsPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3001/api/v1/backend_master/auth/${userId}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: UPDATE_USER_DETAILS_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: UPDATE_USER_DETAILS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to update user details'
      });
      throw error;
    }
  };
};

export const updateStoreDetails = (
  storeId: number,
  data: UpdateStoreDetailsPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_STORE_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3001/api/v1/backend_master/auth/store_details/${storeId}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: UPDATE_STORE_DETAILS_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: UPDATE_STORE_DETAILS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to update store details'
      });
      throw error;
    }
  };
};

export const uploadFile = (
  payload: FileUploadPayload,
  callback?: (response: FileUploadResponse) => void
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: FILE_UPLOAD_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post<FileUploadResponse>(
        'http://localhost:3001/api/v1/backend_master/file_upload/upload',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: FILE_UPLOAD_SUCCESS,
        payload: response.data
      });

      if (callback) {
        callback(response.data);
      }

      return response.data;

    } catch (error) {
      dispatch({
        type: FILE_UPLOAD_FAILURE,
        payload: error instanceof Error ? error.message : 'File upload failed'
      });
      throw error;
    }
  };
};

export const updateBusinessSettings = (
  userId: number,
  data: {
    business_type_id: number;
    gstin: string;
    signature: string;
    section_key: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_BUSINESS_SETTINGS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.post(
        `http://localhost:3001/api/v1/backend_master/auth/business_settings/${userId}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Log response for debugging
      console.log('API Response:', response.data);

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_BUSINESS_SETTINGS_SUCCESS,
          payload: response.data
        });
        return {
          payload: response.data,
          type: UPDATE_BUSINESS_SETTINGS_SUCCESS
        };
      } else {
        const error = new Error(response.data?.meta?.message || 'Failed to update business settings');
        throw error;
      }

    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to update business settings';
                          
      dispatch({
        type: UPDATE_BUSINESS_SETTINGS_FAILURE,
        payload: errorMessage
      });

      // Return error result for proper error handling in component
      return {
        payload: {
          meta: {
            status: false,
            message: errorMessage
          }
        },
        type: UPDATE_BUSINESS_SETTINGS_FAILURE
      };
    }
  };
};

export const updateBankDetails = (
  userId: number,
  data: {
    account_holder_name: string;
    account_number: string;
    canceller_cheque: string;
    ifsc_code: string;
    bank_name: string;
    section_key: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_BANK_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Log request details for debugging
      console.log('Making bank details update request:', {
        url: `http://localhost:3001/api/v1/backend_master/auth/bank_details/${userId}/update`,
        data,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const response = await axios.post(
        `http://localhost:3001/api/v1/backend_master/auth/bank_details/${userId}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Bank Details Update Response:', response.data);

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_BANK_DETAILS_SUCCESS,
          payload: response.data
        });
        return {
          payload: response.data,
          type: UPDATE_BANK_DETAILS_SUCCESS
        };
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update bank details');
      }

    } catch (error: any) {
      console.error('Bank details update error:', error);
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to update bank details';
                          
      dispatch({
        type: UPDATE_BANK_DETAILS_FAILURE,
        payload: errorMessage
      });

      return {
        payload: {
          meta: {
            status: false,
            message: errorMessage
          }
        },
        type: UPDATE_BANK_DETAILS_FAILURE
      };
    }
  };
};

export const getSellerDashboardCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLER_DASHBOARD_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(
        'http://localhost:3001/api/v1/backend_master/dashboard/seller/count',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_SELLER_DASHBOARD_COUNTS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch dashboard counts');
      }

    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to fetch dashboard counts';
                          
      dispatch({
        type: GET_SELLER_DASHBOARD_COUNTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
}; 