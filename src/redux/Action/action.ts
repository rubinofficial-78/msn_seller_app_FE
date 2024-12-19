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
  GET_SELLER_DASHBOARD_COUNTS_FAILURE,
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILURE,
  CREATE_COMPANY_REQUEST,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_FAILURE,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAILURE,
  GET_STATUS_LOOKUP_REQUEST,
  GET_STATUS_LOOKUP_SUCCESS,
  GET_STATUS_LOOKUP_FAILURE,
  GET_COMPANY_USERS_REQUEST,
  GET_COMPANY_USERS_SUCCESS,
  GET_COMPANY_USERS_FAILURE,
  GET_BRANCHES_REQUEST,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES_FAILURE,
  GET_COMPANY_DROPDOWN_REQUEST,
  GET_COMPANY_DROPDOWN_SUCCESS,
  GET_COMPANY_DROPDOWN_FAILURE,
  CREATE_BRANCH_REQUEST,
  CREATE_BRANCH_SUCCESS,
  CREATE_BRANCH_FAILURE,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  UPDATE_BRANCH_FAILURE,
  GET_BRANCH_BY_ID_REQUEST,
  GET_BRANCH_BY_ID_SUCCESS,
  GET_BRANCH_BY_ID_FAILURE,
  GET_BRANCH_STATUS_LOOKUP_REQUEST,
  GET_BRANCH_STATUS_LOOKUP_SUCCESS,
  GET_BRANCH_STATUS_LOOKUP_FAILURE,
  GET_PARTNERS_REQUEST,
  GET_PARTNERS_SUCCESS,
  GET_PARTNERS_FAILURE,
  GET_BRANCH_DROPDOWN_REQUEST,
  GET_BRANCH_DROPDOWN_SUCCESS,
  GET_BRANCH_DROPDOWN_FAILURE,
  GET_PARTNER_STATUS_LOOKUP_REQUEST,
  GET_PARTNER_STATUS_LOOKUP_SUCCESS,
  GET_PARTNER_STATUS_LOOKUP_FAILURE,
  GET_PARTNER_COUNTS_REQUEST,
  GET_PARTNER_COUNTS_SUCCESS,
  GET_PARTNER_COUNTS_FAILURE,
  GET_SELLERS_REQUEST,
  GET_SELLERS_SUCCESS,
  GET_SELLERS_FAILURE,
  GET_SELLER_STATUS_LOOKUP_REQUEST,
  GET_SELLER_STATUS_LOOKUP_SUCCESS,
  GET_SELLER_STATUS_LOOKUP_FAILURE,
  SELLER_REGISTER_REQUEST,
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAILURE,
  UPDATE_SELLER_DETAILS_REQUEST,
  UPDATE_SELLER_DETAILS_SUCCESS,
  UPDATE_SELLER_DETAILS_FAILURE,
  GET_SELLER_BY_ID_REQUEST,
  GET_SELLER_BY_ID_SUCCESS,
  GET_SELLER_BY_ID_FAILURE,
  GET_PARTNER_DROPDOWN_REQUEST,
  GET_PARTNER_DROPDOWN_SUCCESS,
  GET_PARTNER_DROPDOWN_FAILURE,
  UPDATE_SELLER_STATUS_REQUEST,
  UPDATE_SELLER_STATUS_SUCCESS,
  UPDATE_SELLER_STATUS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCT_COUNTS_REQUEST,
  GET_PRODUCT_COUNTS_SUCCESS,
  GET_PRODUCT_COUNTS_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_FAILURE,
  GET_HSN_CODES_REQUEST,
  GET_HSN_CODES_SUCCESS,
  GET_HSN_CODES_FAILURE,
  SAVE_BASIC_DETAILS_REQUEST,
  SAVE_BASIC_DETAILS_SUCCESS,
  SAVE_BASIC_DETAILS_FAILURE,
  ACTIVATE_SELLER_REQUEST,
  ACTIVATE_SELLER_SUCCESS,
  ACTIVATE_SELLER_FAILURE,
  UPDATE_SELLER_COMPANY_STATUS_REQUEST,
  UPDATE_SELLER_COMPANY_STATUS_SUCCESS,
  UPDATE_SELLER_COMPANY_STATUS_FAILURE,
  GET_SALES_ORDERS_COUNT_REQUEST,
  GET_SALES_ORDERS_COUNT_SUCCESS,
  GET_SALES_ORDERS_COUNT_FAILURE,
  GET_UOM_LOOKUP_REQUEST,
  GET_UOM_LOOKUP_SUCCESS,
  GET_UOM_LOOKUP_FAILURE,
  GET_PAYMENT_MODE_LOOKUP_REQUEST,
  GET_PAYMENT_MODE_LOOKUP_SUCCESS,
  GET_PAYMENT_MODE_LOOKUP_FAILURE,
  GET_ONDC_DETAILS_REQUEST,
  GET_ONDC_DETAILS_SUCCESS,
  GET_ONDC_DETAILS_FAILURE,
  BULK_UPDATE_ONDC_DETAILS_REQUEST,
  BULK_UPDATE_ONDC_DETAILS_SUCCESS,
  BULK_UPDATE_ONDC_DETAILS_FAILURE,
  DOWNLOAD_TEMPLATE_REQUEST,
  DOWNLOAD_TEMPLATE_SUCCESS,
  DOWNLOAD_TEMPLATE_FAILURE,
  UPLOAD_TEMPLATE_REQUEST,
  UPLOAD_TEMPLATE_SUCCESS,
  UPLOAD_TEMPLATE_FAILURE,
  GET_OFFERS_REQUEST,
  GET_OFFERS_SUCCESS,
  GET_OFFERS_FAILURE,
  GET_OFFER_TYPES_REQUEST,
  GET_OFFER_TYPES_SUCCESS,
  GET_OFFER_TYPES_FAILURE,
  SAVE_OFFER_BASICS_REQUEST,
  SAVE_OFFER_BASICS_SUCCESS,
  SAVE_OFFER_BASICS_FAILURE,
  GET_LOCATIONS_REQUEST,
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDER_STATUS_LOOKUP_SUCCESS,
  GET_ORDER_STATUS_LOOKUP_REQUEST,
  GET_ORDER_STATUS_LOOKUP_FAILURE,
  GET_RETURNS_REQUEST,
  GET_RETURNS_SUCCESS,
  GET_RETURNS_FAILURE,
  GET_INVENTORY_STATUS_LOOKUP_REQUEST,
  GET_INVENTORY_STATUS_LOOKUP_SUCCESS,
  GET_INVENTORY_STATUS_LOOKUP_FAILURE,
  GET_INVENTORY_REQUEST,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAILURE,
  UPSERT_INVENTORY_REQUEST,
  UPSERT_INVENTORY_SUCCESS,
  UPSERT_INVENTORY_FAILURE,
  GET_PRICING_REQUEST,
  GET_PRICING_SUCCESS,
  GET_PRICING_FAILURE,
  GET_PRODUCT_STATUS_LIST_REQUEST,
  GET_PRODUCT_STATUS_LIST_SUCCESS,
  GET_PRODUCT_STATUS_LIST_FAILURE,
  GET_COMPANY_BY_ID_REQUEST,
  GET_COMPANY_BY_ID_SUCCESS,
  GET_COMPANY_BY_ID_FAILURE,
  GET_PAYOUTS_REQUEST,
  GET_PAYOUTS_SUCCESS,
  GET_PAYOUTS_FAILURE,
  GET_MY_LISTING_REQUEST,
  GET_MY_LISTING_SUCCESS,
  GET_MY_LISTING_FAILURE,
  GET_STORE_LOCATIONS_REQUEST,
  GET_STORE_LOCATIONS_SUCCESS,
  GET_STORE_LOCATIONS_FAILURE,
  CREATE_STORE_LOCATION_REQUEST,
  CREATE_STORE_LOCATION_SUCCESS,
  CREATE_STORE_LOCATION_FAILURE,
  GET_SHIPPING_TYPE_LOOKUP_REQUEST,
  GET_SHIPPING_TYPE_LOOKUP_SUCCESS,
  GET_SHIPPING_TYPE_LOOKUP_FAILURE,
  UPDATE_SHIPPING_SERVICES_REQUEST,
  UPDATE_SHIPPING_SERVICES_SUCCESS,
  UPDATE_SHIPPING_SERVICES_FAILURE,
  GET_ACCOUNT_DETAILS_REQUEST,
  GET_ACCOUNT_DETAILS_SUCCESS,
  GET_ACCOUNT_DETAILS_FAILURE,
  UPDATE_ACCOUNT_DETAILS_REQUEST,
  UPDATE_ACCOUNT_DETAILS_SUCCESS,
  UPDATE_ACCOUNT_DETAILS_FAILURE,
  GET_BANKING_DETAILS_REQUEST,
  GET_BANKING_DETAILS_SUCCESS,
  GET_BANKING_DETAILS_FAILURE,
  UPDATE_BANKING_DETAILS_REQUEST,
  UPDATE_BANKING_DETAILS_SUCCESS,
  UPDATE_BANKING_DETAILS_FAILURE,
  UPDATE_STORE_LOCATION_SUCCESS,
  UPDATE_STORE_LOCATION_REQUEST,
  UPDATE_STORE_LOCATION_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USER_COUNTS_REQUEST,
  GET_USER_COUNTS_SUCCESS,
  GET_USER_COUNTS_FAILURE,
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE,
  GET_ISSUE_CATEGORIES_REQUEST,
  GET_ISSUE_CATEGORIES_SUCCESS,
  GET_ISSUE_CATEGORIES_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_FULFILLMENT_STATUS_REQUEST,
  GET_ORDER_FULFILLMENT_STATUS_SUCCESS,
  GET_ORDER_FULFILLMENT_STATUS_FAILURE,
  GET_CANCELLATION_REASONS_REQUEST,
  GET_CANCELLATION_REASONS_SUCCESS,
  GET_CANCELLATION_REASONS_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
  UPDATE_ORDER_FULFILLMENT_REQUEST,
  UPDATE_ORDER_FULFILLMENT_SUCCESS,
  UPDATE_ORDER_FULFILLMENT_FAILURE,
  GET_ISSUE_STATUS_LOOKUP_REQUEST,
  GET_ISSUE_STATUS_LOOKUP_SUCCESS,
  GET_ISSUE_STATUS_LOOKUP_FAILURE,
  GET_ISSUE_SUB_CATEGORIES_REQUEST,
  GET_ISSUE_SUB_CATEGORIES_SUCCESS,
  GET_ISSUE_SUB_CATEGORIES_FAILURE,
  GET_ORDER_LIST_REQUEST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_FAILURE,
  RAISE_ISSUE_REQUEST,
  RAISE_ISSUE_SUCCESS,
  RAISE_ISSUE_FAILURE,
  GET_SELLER_MATRIX_REQUEST,
  GET_SELLER_MATRIX_SUCCESS,
  GET_SELLER_MATRIX_FAILURE,
  GET_CATEGORY_SALES_MATRIX_REQUEST,
  GET_CATEGORY_SALES_MATRIX_SUCCESS,
  GET_CATEGORY_SALES_MATRIX_FAILURE,
  GET_PRODUCT_SALES_MATRIX_REQUEST,
  GET_PRODUCT_SALES_MATRIX_SUCCESS,
  GET_PRODUCT_SALES_MATRIX_FAILURE,
  GET_PRODUCT_ATTRIBUTES_REQUEST,
  GET_PRODUCT_ATTRIBUTES_SUCCESS,
  GET_PRODUCT_ATTRIBUTES_FAILURE,
  GET_PRODUCT_CATEGORY_ATTRIBUTES_REQUEST,
  GET_PRODUCT_CATEGORY_ATTRIBUTES_SUCCESS,
  GET_PRODUCT_CATEGORY_ATTRIBUTES_FAILURE,
  GENERATE_VARIANTS_REQUEST,
  GENERATE_VARIANTS_SUCCESS,
  GENERATE_VARIANTS_FAILURE,
  CREATE_VARIANTS_REQUEST,
  CREATE_VARIANTS_SUCCESS,
  CREATE_VARIANTS_FAILURE,
  CREATE_INVENTORY_PRODUCT_REQUEST,
  CREATE_INVENTORY_PRODUCT_SUCCESS,
  CREATE_INVENTORY_PRODUCT_FAILURE,
  GET_NOTIFICATION_COUNT_REQUEST,
  GET_NOTIFICATION_COUNT_SUCCESS,
  GET_NOTIFICATION_COUNT_FAILURE,
  GET_REPORTS_REQUEST,
  GET_REPORTS_SUCCESS,
  GET_REPORTS_FAILURE,
  GET_SELLER_DROPDOWN_REQUEST,
  GET_SELLER_DROPDOWN_SUCCESS,
  GET_SELLER_DROPDOWN_FAILURE,
  GET_STORE_DETAILS_REQUEST,
  GET_STORE_DETAILS_SUCCESS,
  GET_STORE_DETAILS_FAILURE,
  GET_USER_STORE_DETAILS_REQUEST,
  GET_USER_STORE_DETAILS_SUCCESS,
  GET_USER_STORE_DETAILS_FAILURE,
  GET_FULFILLMENT_TYPES_REQUEST,
  GET_FULFILLMENT_TYPES_SUCCESS,
  GET_FULFILLMENT_TYPES_FAILURE,
  GET_EMAIL_SETTINGS_REQUEST,
  GET_EMAIL_SETTINGS_SUCCESS,
  GET_EMAIL_SETTINGS_FAILURE,
  ACTIVATE_EMAIL_PROVIDER_REQUEST,
  ACTIVATE_EMAIL_PROVIDER_SUCCESS,
  ACTIVATE_EMAIL_PROVIDER_FAILURE,
  UPDATE_EMAIL_PROVIDER_REQUEST,
  UPDATE_EMAIL_PROVIDER_SUCCESS,
  UPDATE_EMAIL_PROVIDER_FAILURE,
  GET_MESSAGE_TYPES_REQUEST,
  GET_MESSAGE_TYPES_SUCCESS,
  GET_MESSAGE_TYPES_FAILURE,
  GET_TEMPLATES_REQUEST,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_FAILURE,
  GET_UI_CONFIG,
  GET_UI_CONFIG_SUCCESS,
  GET_UI_CONFIG_FAILURE,
  GET_SWAGGER_KEY_REQUEST,
  GET_SWAGGER_KEY_SUCCESS,
  GET_SWAGGER_KEY_FAILURE,
  GET_COMPANY_DETAILS_REQUEST,
  GET_COMPANY_DETAILS_SUCCESS,
  GET_COMPANY_DETAILS_FAILURE,
  CREATE_COMPANY_USER_REQUEST,
  CREATE_COMPANY_USER_SUCCESS,
  CREATE_COMPANY_USER_FAILURE,
  GET_ALL_PRODUCT_CATEGORIES_REQUEST,
  GET_ALL_PRODUCT_CATEGORIES_SUCCESS,
  GET_ALL_PRODUCT_CATEGORIES_FAILURE,
  GET_PRODUCT_ATTRIBUTES_BY_CATEGORY_REQUEST,
  GET_PRODUCT_ATTRIBUTES_BY_CATEGORY_SUCCESS,
  GET_PRODUCT_ATTRIBUTES_BY_CATEGORY_FAILURE
} from './action.types';
import { RootState, AuthActionTypes, FileUploadPayload, FileUploadResponse } from '../types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import GLOBAL_CONSTANTS from "../../GlobalConstants";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = (
  email: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const response = await axios.post(`${API_BASE_URL}/backend_master/auth/login`, {
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
        `${API_BASE_URL}/backend_master/auth/verify_otp`,
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
        `${API_BASE_URL}/backend_master/auth/get/${userId}`,
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
        `${API_BASE_URL}/backend_master/dashboard/count`,
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
        `${API_BASE_URL}/backend_master/seller/count`,
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
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/count`,
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
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/${type}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_LOOKUP_CODES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch lookup codes');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to fetch lookup codes';
      
      dispatch({
        type: GET_LOOKUP_CODES_FAILURE,
        payload: errorMessage
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
  userId: string, 
  payload: any
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/auth/${userId}/update`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_USER_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }

      throw new Error(response.data?.meta?.message || 'Failed to update user details');

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
        `${API_BASE_URL}/backend_master/auth/store_details/${storeId}/update`,
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
        `${API_BASE_URL}/backend_master/file_upload/upload`,
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

interface BusinessSettingsPayload {
  business_type_id: number;
  gstin: string;
  signature: string;
  section_key: string;
}

interface BusinessSettingsResponse {
  meta: {
    status: boolean;
    message: string;
  };
  data: any;
}

export const updateBusinessSettings = (
  id: number,
  data: BusinessSettingsPayload
): ThunkAction<Promise<BusinessSettingsResponse>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_BUSINESS_SETTINGS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/auth/business_settings/${id}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_BUSINESS_SETTINGS_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update business settings');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to update business settings';
      
      dispatch({
        type: UPDATE_BUSINESS_SETTINGS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const updateBankDetails = (
  bankId: number,
  payload: any
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_BANK_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/auth/bank_details/${bankId}/update`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_BANK_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }

      throw new Error(response.data?.meta?.message || 'Failed to update bank details');

    } catch (error) {
      dispatch({
        type: UPDATE_BANK_DETAILS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to update bank details'
      });
      throw error;
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
        `${API_BASE_URL}/backend_master/dashboard/seller/count`,
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

export const getCompanies = (
  params: { 
    page_no: number; 
    per_page: number;
    status_id?: number;
    search?: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_COMPANIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/company_partners`,
        {
          params: {
            per_page: params.per_page,
            page_no: params.page_no,
            status_id: params.status_id,
            search: params.search // Add search parameter to API call
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_COMPANIES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch companies');
      }

      return response.data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch companies';
      dispatch({
        type: GET_COMPANIES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const createCompany = (
  data: any
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: CREATE_COMPANY_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/company_partners/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: CREATE_COMPANY_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: CREATE_COMPANY_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to create company'
      });
      throw error;
    }
  };
};

export const updateCompany = (
  id: number,
  data: any
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_COMPANY_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/company_partners/${id}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_COMPANY_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update company');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update company';
      dispatch({
        type: UPDATE_COMPANY_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/PARTNER_COMPANY_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch status lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch status lookup';
      dispatch({
        type: GET_STATUS_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getCompanyUsers = (
  params: { page_no: number; per_page: number }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_COMPANY_USERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/company_partners_users`,
        {
          params: {
            per_page: params.per_page,
            page_no: params.page_no
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_COMPANY_USERS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch company users');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch company users';
      dispatch({
        type: GET_COMPANY_USERS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getBranches = (
  params: { 
    page_no: number; 
    per_page: number;
    status_id?: number;
    company_id?: number;
    search?: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_BRANCHES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        per_page: params.per_page.toString(),
        page_no: params.page_no.toString(),
        ...(params.status_id ? { status_id: params.status_id.toString() } : {}),
        ...(params.company_id ? { company_id: params.company_id.toString() } : {}),
        ...(params.search ? { search: params.search } : {})
      });

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/company_branches?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_BRANCHES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch branches');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch branches';
      dispatch({
        type: GET_BRANCHES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getCompanyDropdown = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_COMPANY_DROPDOWN_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/company_partners/get_dropdown_list`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        const formattedData = response.data.data.map((company: any) => ({
          id: company.id,
          name: company.name,
          // Add any other needed fields
        }));

        dispatch({
          type: GET_COMPANY_DROPDOWN_SUCCESS,
          payload: formattedData
        });

        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch company list');
      }
    } catch (error) {
      dispatch({
        type: GET_COMPANY_DROPDOWN_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch company list'
      });
      throw error;
    }
  };
};

export const createBranchApi = (
  data: {
    name: string;
    email: string;
    mobile_number: string;
    created_by_id: number;
    default_address: {
      address: string;
      state: string;
      city: string;
      pincode: string;
    };
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: CREATE_BRANCH_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/company_branches/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: CREATE_BRANCH_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create branch');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create branch';
      dispatch({
        type: CREATE_BRANCH_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const updateBranch = (id: number, payload: any) => async (dispatch: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_BASE_URL}/backend_master/company_branches/${id}/update`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data?.meta?.status) {
      // Dispatch an action to update the branch in the store
      dispatch({
        type: 'UPDATE_BRANCH_STATUS',
        payload: {
          id,
          status_id: payload.status_id
        }
      });
    return response.data;
    } else {
      throw new Error(response.data?.meta?.message || 'Failed to update branch status');
    }
  } catch (error: any) {
    console.error('Error updating branch:', error);
    throw error?.response?.data?.meta?.message || error.message || 'Failed to update branch status';
  }
};

export const getBranchById = (
  id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_BRANCH_BY_ID_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/company_branches/get/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_BRANCH_BY_ID_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch branch details');
      }

    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to fetch seller details';
                          
      dispatch({
        type: GET_BRANCH_BY_ID_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getBranchStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_BRANCH_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/COMPANY_BRANCHES_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_BRANCH_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch status lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch status lookup';
      dispatch({
        type: GET_BRANCH_STATUS_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getPartners = (
  params: { 
    page_no: number; 
    per_page: number;
    company_id?: number;
    branch_id?: number;
    status_id?: number;
    search?: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PARTNERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      // Create base query parameters
      const queryParams: Record<string, string> = {
        per_page: params.per_page.toString(),
        page_no: params.page_no.toString()
      };

      // Only add search if it exists
      if (params.search) {
        queryParams.search = params.search;
      }

      // Add other optional parameters only if they are defined
      if (params.company_id) queryParams.company_id = params.company_id.toString();
      if (params.branch_id) queryParams.branch_id = params.branch_id.toString();
      if (params.status_id) queryParams.status_id = params.status_id.toString();

      const searchParams = new URLSearchParams(queryParams);

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details?${searchParams.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PARTNERS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch partners');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch partners';
      dispatch({
        type: GET_PARTNERS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getBranchDropdown = (companyId?: number): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_BRANCH_DROPDOWN_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const url = `${API_BASE_URL}/backend_master/company_branches/get_dropdown_list${companyId ? `?company_id=${companyId}` : ''}`;
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_BRANCH_DROPDOWN_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch branch list');
      }

    } catch (error) {
      dispatch({
        type: GET_BRANCH_DROPDOWN_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch branch list'
      });
      throw error;
    }
  };
};

export const createPartnerBasic = (data: any): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create partner basics');
      }
    } catch (error) {
      throw error;
    }
  };
};

export const createPartnerBanking = (data: any): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/affiliate_partners_banking_details/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create partner banking details');
      }
    } catch (error) {
      throw error;
    }
  };
};

export const createPartnerAffiliate = (data: any[]): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/affiliate_partners_affiliate_setting/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create affiliate settings');
      }
    } catch (error) {
      throw error;
    }
  };
};

export const getAffiliateUrl = (userId: number): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/get_affiliate_url/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Full affiliate URL response:', response.data);
      
      if (response.data?.meta?.status) {
        return response.data;  // Return the full response
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch affiliate URL');
      }
    } catch (error) {
      console.error('Error in getAffiliateUrl:', error);
      throw error;
    }
  };
};

export const getPartnerById = (id: number): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/get/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch partner details');
      }
    } catch (error) {
      throw error;
    }
  };
};

export const updatePartner = (data: any): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update partner');
      }
    } catch (error) {
      throw error;
    }
  };
};

export const getPartnerStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PARTNER_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/AFFILIATE_PARTNER_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PARTNER_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch partner status lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch partner status lookup';
      dispatch({
        type: GET_PARTNER_STATUS_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getPartnerCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PARTNER_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/count`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PARTNER_COUNTS_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch partner counts');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch partner counts';
      dispatch({
        type: GET_PARTNER_COUNTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getSellers = (params: {
  page_no: number;
  per_page: number;
  parent_company_id?: number | null;
  company_branch_id?: number | null;
  partner_id?: number | null;
  status_id?: number | null;
  search?: string;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const queryParams = {
        ...params,
        parent_company_id: params.parent_company_id || undefined,
        company_branch_id: params.company_branch_id || undefined,
        partner_id: params.partner_id || undefined,
        status_id: params.status_id || undefined,
        search: params.search || undefined
      };

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/seller`,
        {
          params: queryParams,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_SELLERS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch sellers');
      }

    } catch (error) {
      dispatch({
        type: GET_SELLERS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch sellers'
      });
      throw error;
    }
  };
};

export const getSellerStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLER_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/SELLER_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_SELLER_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch seller status lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch seller status lookup';
      dispatch({
        type: GET_SELLER_STATUS_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const sellerRegister = (data: {
  name: string;
  email: string;
  mobile_number: string;
  core_user_id: number;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: SELLER_REGISTER_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/auth/seller_registration`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: SELLER_REGISTER_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to register seller');
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to register seller';
      
      dispatch({
        type: SELLER_REGISTER_FAILURE,
        payload: errorMessage
      });
      
      // Return the error response for proper error handling in the component
      return error?.response?.data || { 
        meta: { 
          status: false, 
          message: errorMessage 
        } 
      };
    }
  };
};

export const updateSellerDetails = (
  id: number,
  data: {
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
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_SELLER_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/auth/store_details/${id}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_SELLER_DETAILS_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update seller details');
      }
    } catch (error: any) {
      dispatch({
        type: UPDATE_SELLER_DETAILS_FAILURE,
        payload: error?.response?.data?.meta?.message || error?.message || 'Failed to update seller details'
      });
      throw error;
    }
  };
};

export const getSellerById = (
  id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLER_BY_ID_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/seller/get/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_SELLER_BY_ID_SUCCESS,
          payload: response.data.data
        });
        // Return an object with type and payload to match Redux action structure
        return {
          type: GET_SELLER_BY_ID_SUCCESS,
          payload: response.data.data
        };
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch seller details');
      }

    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || 
                          error?.message || 
                          'Failed to fetch seller details';
                          
      dispatch({
        type: GET_SELLER_BY_ID_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getPartnerDropdown = (branchId?: number): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PARTNER_DROPDOWN_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const url = `${API_BASE_URL}/backend_master/affiliate_partners_basic_details/get_partner_list${branchId ? `?branch_id=${branchId}` : ''}`;
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PARTNER_DROPDOWN_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch partner list');
      }
    } catch (error) {
      dispatch({
        type: GET_PARTNER_DROPDOWN_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch partner list'
      });
      throw error;
    }
  };
};

export const updateSellerStatus = (
  sellerId: number,
  statusId: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_SELLER_STATUS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/seller/${sellerId}/update_status`,
        { status_id: statusId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: UPDATE_SELLER_STATUS_SUCCESS,
        payload: response.data
      });

      return response.data;

    } catch (error) {
      dispatch({
        type: UPDATE_SELLER_STATUS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to update seller status'
      });
      throw error;
    }
  };
};

export const activateSeller = (
  id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: ACTIVATE_SELLER_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/seller/${id}/update_company_status`,
        { company_payment_status: "Active" },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: ACTIVATE_SELLER_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to activate seller');
      }
    } catch (error: any) {
      dispatch({
        type: ACTIVATE_SELLER_FAILURE,
        payload: error?.response?.data?.meta?.message || error?.message || 'Failed to activate seller'
      });
      throw error;
    }
  };
};

export const getProducts = (
  params: { 
    status?: string;
    page_no: number;
    per_page: number;
    master_catalog: boolean;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products`,
        {
          params: { ...params, master_catalog: false },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch products');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getmylisting = (params: any): ThunkAction<Promise<any>, RootState, unknown, any> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: GET_MY_LISTING_REQUEST });

    try {
      const response = await axios.get(`${API_BASE_URL}/catalog/products`, {
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('API Response:', response.data); // Add this for debugging

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_MY_LISTING_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error in getmylisting:', error);
      dispatch({
        type: GET_MY_LISTING_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch products'
      });
      throw error;
    }
  };
};

export const getProductCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products/count?master_catalog=false`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_COUNTS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch product counts');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product counts';
      dispatch({
        type: GET_PRODUCT_COUNTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getmylistingCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products/count`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_COUNTS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch product counts');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product counts';
      dispatch({
        type: GET_PRODUCT_COUNTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getMasterCatalogueProductCounts = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products/count?master_catalog=true`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_COUNTS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch product counts');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product counts';
      dispatch({
        type: GET_PRODUCT_COUNTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getProductById = (
  id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products/get/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_BY_ID_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch product details');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product details';
      dispatch({
        type: GET_PRODUCT_BY_ID_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getProductCategories = (
  parentCategoryId: number | null = null
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/product_category/`,
        {
          params: {
            parent_category_id: parentCategoryId
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_CATEGORIES_SUCCESS,
          payload: {
            data: response.data.data,
            isSubCategory: !!parentCategoryId
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch categories');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      dispatch({
        type: GET_PRODUCT_CATEGORIES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getHsnCodes = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    console.log('Fetching HSN codes...');
    dispatch({ type: GET_HSN_CODES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/hsn_code`,
        {
          params: {
            per_page: -1
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('HSN API Response:', response.data);

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_HSN_CODES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch HSN codes');
      }

    } catch (error) {
      console.error('HSN fetch error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch HSN codes';
      dispatch({
        type: GET_HSN_CODES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

interface BasicDetailsPayload {
  section_key: string;
  name?: string;
  sku_id: string;
  level1_category_id?: number;
  level2_category_id?: number;
  short_desc?: string;
  long_desc?: string;
  hsn_reference_number?: string;
  image_arr?: string[];
}

export const saveBasicDetails = (
  data: BasicDetailsPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: SAVE_BASIC_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/catalog/products/upsert`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: SAVE_BASIC_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to save basic details');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save basic details';
      dispatch({
        type: SAVE_BASIC_DETAILS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getSalesOrdersCount = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SALES_ORDERS_COUNT_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/sales_orders/count`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_SALES_ORDERS_COUNT_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch sales orders count');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sales orders count';
      dispatch({
        type: GET_SALES_ORDERS_COUNT_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOrderStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ORDER_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/SALES_ORDER_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ORDER_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch order status lookup');
      }

    } catch (error) {
      dispatch({
        type: GET_ORDER_STATUS_LOOKUP_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch order status lookup'
      });
      throw error;
    }
  };
};

export const getOrders = (params: { 
  per_page: number; 
  page_no: number;
  search?: string;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ORDERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/sales_orders`,
        {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch orders');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch orders';
      dispatch({
        type: GET_ORDERS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getReturns = (params: { 
  per_page: number; 
  page_no: number;
  search?: string;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_RETURNS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/sales_returns`,
        {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_RETURNS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch RETURNS');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch RETURNS';
      dispatch({
        type: GET_RETURNS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getUomLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_UOM_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/UOM`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_UOM_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch UOM lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch UOM lookup';
      dispatch({
        type: GET_UOM_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getPaymentModeLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PAYMENT_MODE_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/PAYMENT_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PAYMENT_MODE_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch payment modes');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payment modes';
      dispatch({
        type: GET_PAYMENT_MODE_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOndcDetails = (
  skuId: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ONDC_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/product_category_attribute_value`,
        {
          params: {
            product_sku_id: skuId
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ONDC_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch ONDC details');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch ONDC details';
      dispatch({
        type: GET_ONDC_DETAILS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const bulkUpdateOndcDetails = (
  data: Array<{ id: number; value: any }>
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: BULK_UPDATE_ONDC_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/catalog/product_category_attribute_value/bulk_update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: BULK_UPDATE_ONDC_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update ONDC details');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update ONDC details';
      dispatch({
        type: BULK_UPDATE_ONDC_DETAILS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getCategories = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/product_category/?parent_category_id=null`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_CATEGORIES_SUCCESS,
          payload: {
            data: response.data.data,
            isSubCategory: false
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      dispatch({
        type: GET_PRODUCT_CATEGORIES_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch categories'
      });
      throw error;
    }
  };
};

export const getSubCategories = (
  parentCategoryId: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/product_category/`,
        {
          params: {
            parent_category_id: parentCategoryId // Pass the selected domain ID as parent_category_id
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch subcategories');
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };
};

export const downloadTemplate = (
  level1_category_id: number,
  level2_category_id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: DOWNLOAD_TEMPLATE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/catalog/products/xlsx/download`,
        {
          level1_category_id,
          level2_category_id
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      // Create blob from arraybuffer
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'product_template.xlsx');
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      window.URL.revokeObjectURL(url);

      dispatch({
        type: DOWNLOAD_TEMPLATE_SUCCESS
      });

      return response.data;
    } catch (error) {
      console.error('Error downloading template:', error);
      dispatch({
        type: DOWNLOAD_TEMPLATE_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to download template'
      });
      throw error;
    }
  };
};

export const uploadTemplate = (
  data: {
    level1_category_id: number;
    level2_category_id: number;
    link: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPLOAD_TEMPLATE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/catalog/products/xlsx/upload`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPLOAD_TEMPLATE_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to upload template');
      }

    } catch (error) {
      console.error('Error uploading template:', error);
      dispatch({
        type: UPLOAD_TEMPLATE_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to upload template'
      });
      throw error;
    }
  };
};

export const getOffers = (
  params: { page_no: number; per_page: number }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_OFFERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('Making API request to:', `${API_BASE_URL}/backend_master/catalog/offer`);
      console.log('With params:', params);
      console.log('Token:', token);

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/offer`,
        {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Raw API Response:', response.data);

      if (response.data?.meta?.status) {
        const payload = {
          data: response.data.data,
          meta: response.data.meta.pagination
        };
        console.log('Dispatching success with payload:', payload);
        
        dispatch({
          type: GET_OFFERS_SUCCESS,
          payload
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error in getOffers:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch offers';
      dispatch({
        type: GET_OFFERS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOfferTypes = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_OFFER_TYPES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/OFFER_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_OFFER_TYPES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch offer types');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch offer types';
      dispatch({
        type: GET_OFFER_TYPES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const saveOfferBasics = (
  data: {
    section_key: string;
    name: string;
    description: string;
    code: string;
    max_count: number;
    offer_type_id: number;
    start_date: string;
    end_date: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: SAVE_OFFER_BASICS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('Making API request with payload:', data);

      const response = await axios.post(
        `${API_BASE_URL}/backend_master/catalog/offer/upsert`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('API Response:', response.data);

      if (response.data?.meta?.status) {
        dispatch({
          type: SAVE_OFFER_BASICS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to save offer basics');
      }
    } catch (error) {
      console.error('Error in saveOfferBasics:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save offer basics';
      dispatch({
        type: SAVE_OFFER_BASICS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getLocations = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_LOCATIONS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/mdm/location/dropdown`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_LOCATIONS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch locations');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch locations';
      dispatch({
        type: GET_LOCATIONS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getMasterCatalogProducts = (params: { 
  page_no: number; 
  per_page: number;
  status?: string;
  master_catalog?: boolean;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products`,
        {
          params: {
            page_no: params.page_no,
            per_page: params.per_page,
            status: params.status,
            master_catalog: params.master_catalog ?? true // Default to true if not provided
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Master catalog products API Response:', response.data);

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCTS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
      dispatch({
        type: GET_PRODUCTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getInventoryStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_INVENTORY_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/INVENTORY_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_INVENTORY_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch inventory status lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory status lookup';
      dispatch({
        type: GET_INVENTORY_STATUS_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getInventory = (params: { 
  page_no: number; 
  per_page: number;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_INVENTORY_REQUEST });

    try {
      const token = localStorage.getItem('token');
      console.log('Making inventory API request with params:', params);
      
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/mdm/inventory`,
        {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Raw API Response:', response.data);

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_INVENTORY_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch inventory');
      }
    } catch (error) {
      console.error('Inventory API Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch inventory';
      dispatch({
        type: GET_INVENTORY_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const upsertInventory = (
  data: Array<{
    section_key: string;
    product_sku_id: string;
    location_id: number;
    on_hand_quantity: number;
    alert_quantity: number;
  }>
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPSERT_INVENTORY_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/inventory/upsert`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPSERT_INVENTORY_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to upsert inventory');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upsert inventory';
      dispatch({
        type: UPSERT_INVENTORY_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOfferById = (
  id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/offer/get/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch offer details');
      }
    } catch (error) {
      console.error('Failed to fetch offer details:', error);
      throw error;
    }
  };
};

export const getPricing = (
  params: { 
    page_no: number; 
    per_page: number;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRICING_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/products`,
        {
          params: {
            ...params,
            pricing: true
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      dispatch({
        type: GET_PRICING_SUCCESS,
        payload: {
          data: response.data.data,
          meta: response.data.meta.pagination
        }
      });

      return response.data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch pricing data';
      dispatch({
        type: GET_PRICING_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getProductStatusList = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_STATUS_LIST_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/product_status`,
        {
          params: {
            per_page: -1
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_STATUS_LIST_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch product status list');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product status list';
      dispatch({
        type: GET_PRODUCT_STATUS_LIST_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getCompanyById = (
  id: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_COMPANY_BY_ID_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/company_partners/get/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_COMPANY_BY_ID_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch company details');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch company details';
      dispatch({
        type: GET_COMPANY_BY_ID_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getPayouts = (params: {
  page_no: number;
  per_page: number;
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PAYOUTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/sales_orders`,
        {
          params: {
            ...params,
            is_payouts: true
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PAYOUTS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch payouts');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch payouts';
      dispatch({
        type: GET_PAYOUTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getStoreLocations = (params: { 
  page_no: number; 
  per_page: number;
  filters?: {
    id?: number;
    // Add other possible filter parameters here
  };
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_STORE_LOCATIONS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/mdm/location`,
        {
          params: {
            ...params,
            ...(params.filters && { filters: JSON.stringify(params.filters) })
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_STORE_LOCATIONS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch store locations');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch store locations';
      dispatch({
        type: GET_STORE_LOCATIONS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add this action creator
export const updateStoreLocationStatus = (
  id: number,
  is_active: boolean
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/location/${id}/update`,
        { is_active },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        // Refresh the store locations after successful update
        dispatch(getStoreLocations({ page_no: 1, per_page: 10 }));
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update store status');
      }
    } catch (error) {
      console.error('Error updating store status:', error);
      throw error;
    }
  };
};

export const getLocationTypeLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/LOCATION_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch location types');
      }
    } catch (error) {
      console.error('Error fetching location types:', error);
      throw error;
    }
  };
};

interface CreateStoreLocationPayload {
  name: string;
  address: {
    name: string;
    building: string;
    locality: string;
    city: string;
    state: string;
    country: string;
    area_code: string;
  };
  location_type_id: number;
  email: string;
  gst_number: string;
  mobile_number: string;
  latitude: string;
  longitude: string;
  opening_time: string;
  closing_time: string;
  contact_name: string;
}

export const createStoreLocation = (
  data: CreateStoreLocationPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: CREATE_STORE_LOCATION_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/location/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: CREATE_STORE_LOCATION_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create store location');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create store location';
      dispatch({
        type: CREATE_STORE_LOCATION_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getWorkingDaysLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/WORKING_DAYS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch working days');
      }
    } catch (error) {
      console.error('Error fetching working days:', error);
      throw error;
    }
  };
};

interface UpdateWorkingHoursPayload {
  is_same_timings: boolean;
  all_timings: {
    day_from_id: number;
    day_from: {
      id: number;
      lookup_code: string;
      display_name: string;
    };
    day_to_id: number;
    day_to: {
      id: number;
      lookup_code: string;
      display_name: string;
    };
    timings_arr: Array<{
      opening_time: string;
      closing_time: string;
    }>;
  };
}

export const updateWorkingHours = (
  locationId: number,
  data: UpdateWorkingHoursPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/location/${locationId}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update working hours');
      }
    } catch (error) {
      console.error('Error updating working hours:', error);
      throw error;
    }
  };
};

interface CreateServiceabilityPayload {
  location_id: number;
  shipping_radius: number | null;
  category: string;
  sub_categories: string[];
  pan_india?: boolean;
  zone?: boolean;
}

export const createServiceability = (
  data: CreateServiceabilityPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/serviceability_v1_2/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create serviceability');
      }
    } catch (error) {
      console.error('Error creating serviceability:', error);
      throw error;
    }
  };
};

export const getServiceability = (
  locationId: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/mdm/serviceability_v1_2`,
        {
          params: {
            location_id: locationId
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch serviceability');
      }
    } catch (error) {
      console.error('Error fetching serviceability:', error);
      throw error;
    }
  };
};

interface UpdateServiceabilityPayload {
  shipping_radius: number | null;
  category: string;
  sub_categories: string[];
  pan_india?: boolean;
  zone?: boolean;
}

export const updateServiceability = (
  serviceabilityId: number,
  data: UpdateServiceabilityPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/serviceability_v1_2/${serviceabilityId}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update serviceability');
      }
    } catch (error) {
      console.error('Error updating serviceability:', error);
      throw error;
    }
  };
};

interface GetShippingServicesParams {
  serviceability_id: number;
  per_page?: number;
  page_no?: number;
}

export const getShippingServices = (
  params: GetShippingServicesParams
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/mdm/shipping_services`,
        {
          params: {
            serviceability_id: params.serviceability_id,
            per_page: params.per_page || -1,
            page_no: params.page_no || 1
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch shipping services');
      }
    } catch (error) {
      console.error('Error fetching shipping services:', error);
      throw error;
    }
  };
};

export const getShippingTypeLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/SHIPPING_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch shipping types');
      }
    } catch (error) {
      console.error('Error fetching shipping types:', error);
      throw error;
    }
  };
};

export const getDeliveryTypeLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/ONDC_LOGISTICS_DELIVERY_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch delivery types');
      }
    } catch (error) {
      console.error('Error fetching delivery types:', error);
      throw error;
    }
  };
};

export const getPreferencesLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/DELIVERY_TYPE_PREFERENCES`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch preferences');
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      throw error;
    }
  };
};

export const updateShippingServices = (
  id: number,
  data: {
    shipping_charge: number;
    categories: string[];
    transmit_time: number;
    shipping_type: {
      id: number;
      display_name: string;
      lookup_code: string;
      is_active: boolean;
      createdAt: string;
      updatedAt: string | null;
      label: string;
    } | null;
    states: Array<{
      name: string;
      selected: boolean;
    }>;
    delivery_type: any;
    shipping_preferences: any;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_SHIPPING_SERVICES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/shipping_services/${id}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_SHIPPING_SERVICES_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update shipping services');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update shipping services';
      dispatch({
        type: UPDATE_SHIPPING_SERVICES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add this action creator
export const getAllServiceability = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/mdm/serviceability_v1_2`,
        {
          params: {
            per_page: -1
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch serviceability data');
      }
    } catch (error) {
      console.error('Error fetching serviceability:', error);
      throw error;
    }
  };
};

export const getAccountDetails = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ACCOUNT_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/settings/user_server_settings/get/NP_ACCOUNT_DETAILS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.meta.status) {
        dispatch({
          type: GET_ACCOUNT_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data.meta.message);
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.meta?.message || error?.message || 'Failed to fetch account details';
      dispatch({
        type: GET_ACCOUNT_DETAILS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const updateAccountDetails = (id: number, formData: any): ThunkAction<Promise<any>, RootState, unknown, any> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_ACCOUNT_DETAILS_REQUEST });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/settings/user_server_settings/${id}/update`,
        {
          sections: transformFormDataToApiFormat(formData)
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.meta.status) {
        dispatch({
          type: UPDATE_ACCOUNT_DETAILS_SUCCESS,
          payload: response.data
        });
        return response.data;
      } else {
        throw new Error(response.data.meta.message);
      }
    } catch (error: any) {
      dispatch({
        type: UPDATE_ACCOUNT_DETAILS_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

// Get Banking Details
export const getBankingDetails = (): ThunkAction<Promise<any>, RootState, unknown, any> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: GET_BANKING_DETAILS_REQUEST });

    try {
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/settings/user_server_settings/get/GST_AND_PAN`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.meta.status) {
        dispatch({
          type: GET_BANKING_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      }
    } catch (error: any) {
      dispatch({
        type: GET_BANKING_DETAILS_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

// Update Banking Details
export const updateBankingDetails = (id: number, data: any): ThunkAction<Promise<any>, RootState, unknown, any> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_BANKING_DETAILS_REQUEST });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/settings/user_server_settings/${id}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.meta.status) {
        dispatch({
          type: UPDATE_BANKING_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }
    } catch (error: any) {
      dispatch({
        type: UPDATE_BANKING_DETAILS_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

// Helper function to transform form data to API format
const transformFormDataToApiFormat = (accountData: any) => {
  return accountData.sections.map((section: any) => ({
    section_key: section.section_key,
    section_name: section.section_name,
    section_sequence: section.section_sequence,
    section_description: section.section_description || "",
    fields: section.fields.map((field: any) => ({
      value: field.value,
      env_key: field.env_key,
      field_key: field.field_key,
      attributes: field.attributes || {},
      field_name: field.field_name,
      field_type: field.field_type,
      is_editable: field.is_editable,
      placeholder: field.placeholder,
      is_mandatory: field.is_mandatory,
      allowed_values: field.allowed_values || [],
      field_sequence: field.field_sequence
    }))
  }));
};

export const updateStoreLocation = (
  id: number,
  data: any
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_STORE_LOCATION_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/mdm/location/${id}/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_STORE_LOCATION_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update store location');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update store location';
      dispatch({
        type: UPDATE_STORE_LOCATION_FAILURE,
        payload: errorMessage
      });
      console.error('Error updating store location:', error);
      throw error;
    }
  };
};

// Add the getUsers action creator
export const getUsers = (
  params: { 
    page_no: number; 
    per_page: number;
    search?: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_USERS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page_no: params.page_no.toString(),
        per_page: params.per_page.toString(),
      });

      // Add search parameter if it exists
      if (params.search) {
        queryParams.append('search', params.search);
      }

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/users?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_USERS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch users');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';
      dispatch({
        type: GET_USERS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add the getUserCounts action creator
export const getUserCounts = (
  type?: 'Active'
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_USER_COUNTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();
      if (type) {
        queryParams.append('type', type);
      }

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/users/count${type ? '?' + queryParams.toString() : ''}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_USER_COUNTS_SUCCESS,
          payload: {
            type: type || 'total',
            count: response.data.data.counts
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch user counts');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user counts';
      dispatch({
        type: GET_USER_COUNTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add the getRoles action creator
export const getRoles = (
  params: { page_no: number; per_page: number }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ROLES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page_no: params.page_no.toString(),
        per_page: params.per_page.toString(),
      });

      const response = await axios.get(
        `${API_BASE_URL}/backend_master/roles?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ROLES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch roles');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch roles';
      dispatch({
        type: GET_ROLES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getIssues = (
  params: { 
    page_no: number; 
    per_page: number;
    search?: string;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ISSUES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/ondc/bpp/get_issue_list`,
        {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ISSUES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch issues');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch issues';
      dispatch({
        type: GET_ISSUES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getIssueCategories = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ISSUE_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/ondc/bpp/categories`,
        {
          params: { per_page: -1 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ISSUE_CATEGORIES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch issue categories');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch issue categories';
      dispatch({
        type: GET_ISSUE_CATEGORIES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOrderDetails = (
  orderId: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/sales_orders/get/${orderId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch order details');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order details';
      dispatch({
        type: GET_ORDER_DETAILS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOrderFulfillmentStatus = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ORDER_FULFILLMENT_STATUS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/core/lookup_code/list/SALES_ORDER_FULFILLMENT_STATUS`,
        {
          params: { per_page: -1, page_no: 1 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ORDER_FULFILLMENT_STATUS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch fulfillment status');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch fulfillment status';
      dispatch({
        type: GET_ORDER_FULFILLMENT_STATUS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getCancellationReasons = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_CANCELLATION_REASONS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/core/lookup_code/list/CANCELLATION_REASON`,
        {
          params: { per_page: -1, page_no: 1 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_CANCELLATION_REASONS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch cancellation reasons');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cancellation reasons';
      dispatch({
        type: GET_CANCELLATION_REASONS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

interface CancelOrderPayload {
  id: number;
  ids: Array<{
    id: number;
    item_quantity: number;
  }>;
  cancellation_reason_id: number;
  item_status_id: number;
}

export const cancelOrder = (
  payload: CancelOrderPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/sales_orders/line_update`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: CANCEL_ORDER_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to cancel order');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to cancel order';
      dispatch({
        type: CANCEL_ORDER_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

interface UpdateOrderFulfillmentPayload {
  fulfillment_status_id: number;
}

export const updateOrderFulfillment = (
  orderId: number,
  payload: UpdateOrderFulfillmentPayload
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_ORDER_FULFILLMENT_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/sales_orders/${orderId}/fulfillment_update`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_ORDER_FULFILLMENT_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update order fulfillment');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update order fulfillment';
      dispatch({
        type: UPDATE_ORDER_FULFILLMENT_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add this action creator
export const getIssueStatusLookup = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ISSUE_STATUS_LOOKUP_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/ondc/bpp/igm_lookup_code?lookup_type=ISSUE_STATUS`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ISSUE_STATUS_LOOKUP_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch issue status lookup');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch issue status lookup';
      dispatch({
        type: GET_ISSUE_STATUS_LOOKUP_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Update this action creator to use category key directly
export const getIssueSubCategories = (categoryKey: string): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ISSUE_SUB_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      // Now using categoryKey directly in the URL (e.g. FULFILLMENT)
      const response = await axios.get(
        `${API_BASE_URL}/ondc/bpp/sub_categories/${categoryKey}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ISSUE_SUB_CATEGORIES_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch issue sub-categories');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch issue sub-categories';
      dispatch({
        type: GET_ISSUE_SUB_CATEGORIES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getOrderIdList = (email: string, mobileNumber: string): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ORDER_LIST_REQUEST });

    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get(
        `${API_BASE_URL}/ondc/bpp/adya_bpp/for_igm/orders_list`, {
          params: {
            email,
            mobile_number: mobileNumber
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ORDER_LIST_SUCCESS,
          payload: response.data.data
        });
        return response.data.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch order list');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch order list';
      dispatch({
        type: GET_ORDER_LIST_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

interface RaiseIssuePayload {
  order_id: string;
  category: string;
  sub_category: string;
  description: {
    long_desc: string;
    short_desc: string;
    additional_desc: {
      url: string;
    };
    images: string[];
  };
}

export const raiseIssue = (payload: RaiseIssuePayload): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: RAISE_ISSUE_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/ondc/bpp/raise_issue`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: RAISE_ISSUE_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to raise issue');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to raise issue';
      dispatch({
        type: RAISE_ISSUE_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getSellerMatrix = (dates: { start_date: string; end_date: string }): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLER_MATRIX_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/seller_records`,
        {
          params: dates,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        const formattedData = response.data.data.map((item: any) => ({
          name: item.Seller.name,
          "Fulfilled Orders": item.Accepted_Counter,
          "In progress Orders": item.In_Process_Counter,
          "Canceled Items": item.Cancelled_Counter
        }));

        dispatch({
          type: GET_SELLER_MATRIX_SUCCESS,
          payload: formattedData
        });
        return response.data;
      }

    } catch (error) {
      dispatch({
        type: GET_SELLER_MATRIX_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch seller matrix'
      });
      throw error;
    }
  };
};

export const getCategorySalesMatrix = (dates?: { start_date: string; end_date: string }): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_CATEGORY_SALES_MATRIX_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/category_wise_sales_matrix`,
        {
          params: dates,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_CATEGORY_SALES_MATRIX_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }

    } catch (error) {
      dispatch({
        type: GET_CATEGORY_SALES_MATRIX_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch category sales matrix'
      });
      throw error;
    }
  };
};

export const getProductSalesMatrix = (dates?: { start_date: string; end_date: string }): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_SALES_MATRIX_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/product_wise_sales_matrix`,
        {
          params: dates,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_SALES_MATRIX_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }

    } catch (error) {
      dispatch({
        type: GET_PRODUCT_SALES_MATRIX_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch product sales matrix'
      });
      throw error;
    }
  };
};

// Add these new actions
export const getProductAttributes = (
  productSkuId: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_ATTRIBUTES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/catalog/product_category_attribute_value`,
        {
          params: { product_sku_id: productSkuId },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_ATTRIBUTES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch product attributes');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product attributes';
      dispatch({
        type: GET_PRODUCT_ATTRIBUTES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getProductCategoryAttributes = (
  category: string,
  subCategory: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_CATEGORY_ATTRIBUTES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/catalog/product_attribute`,
        {
          params: { 
            attribute: true,
            category: category,
            sub_category: subCategory
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_CATEGORY_ATTRIBUTES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch category attributes');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch category attributes';
      dispatch({
        type: GET_PRODUCT_CATEGORY_ATTRIBUTES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add this new action
export const generateVariants = (
  sku_id: string,
  attributes: Record<string, any>,
  variant_group_name: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GENERATE_VARIANTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/catalog/products/variant_generation`,
        {
          sku_id,
          attributes,
          variant_group_name
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GENERATE_VARIANTS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to generate variants');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate variants';
      dispatch({
        type: GENERATE_VARIANTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const createVariants = (
  variants: any[]
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: CREATE_VARIANTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/catalog/products/variant_create`,
        variants,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: CREATE_VARIANTS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create variants');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create variants';
      dispatch({
        type: CREATE_VARIANTS_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add the new action creator
export const createInventoryProduct = (
  productIds: number[],
  locationId: number
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: CREATE_INVENTORY_PRODUCT_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/isn/product_create`,
        {
          product_ids: productIds,
          location_id: locationId,
          available_quantity: 10, // Constant value
          minimum_quantity: 10    // Constant value
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: CREATE_INVENTORY_PRODUCT_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to create inventory product');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create inventory product';
      dispatch({
        type: CREATE_INVENTORY_PRODUCT_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

// Add this action creator
export const updateAffiliateSettings = (data: any[]): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/affiliate_partners_affiliate_setting/update`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update affiliate settings');
      }
    } catch (error) {
      console.error('Error updating affiliate settings:', error);
      throw error;
    }
  };
};

export const getNotificationCount = () => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/notification_history/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_NOTIFICATION_COUNT_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching notification count:', error);
      dispatch({
        type: GET_NOTIFICATION_COUNT_FAILURE,
        payload: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };
};

export const getReports = (params: {
  page_no: number;
  per_page: number;
  search?: string;
  seller_id?: string;
  status?: string;
  start_date?: string;  // Changed from from_date
  end_date?: string;    // Changed from to_date
}): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_REPORTS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/sales_orders/reports/list`,
        {
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_REPORTS_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch reports');
      }

    } catch (error) {
      dispatch({
        type: GET_REPORTS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch reports'
      });
      throw error;
    }
  };
};

export const getSellerDropdown = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_SELLER_DROPDOWN_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/seller/dropdown`,
        {
          params: { per_page: -1 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_SELLER_DROPDOWN_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch seller dropdown');
      }

    } catch (error) {
      dispatch({
        type: GET_SELLER_DROPDOWN_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch seller dropdown'
      });
      throw error;
    }
  };
};

export const getStoreDetails = (storeId: number): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_STORE_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/auth/store_details/get/${storeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_STORE_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch store details');
      }

    } catch (error) {
      dispatch({
        type: GET_STORE_DETAILS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch store details'
      });
      throw error;
    }
  };
};

export const getUserStoreDetails = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    console.log('getUserStoreDetails action started');
    dispatch({ type: GET_STORE_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      

      const storeId = GLOBAL_CONSTANTS.storeId;
      console.log('Extracted storeId:', storeId);
      
      if (!storeId) {
        throw new Error('Store ID not found in user details');
      }

      console.log('Making store_details/get API call...');
      // Updated API endpoint
      const storeResponse = await axios.get(
        `${API_BASE_URL}/backend_master/auth/store_details/get/${storeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Store response:', storeResponse.data);

      if (storeResponse.data?.meta?.status) {
        console.log('Dispatching success with store details');
        dispatch({
          type: GET_STORE_DETAILS_SUCCESS,
          payload: storeResponse.data.data
        });
        return storeResponse.data;
      }

      throw new Error(storeResponse.data?.meta?.message || 'Failed to fetch store details');

    } catch (error) {
      console.error('Error in getUserStoreDetails:', error);
      dispatch({
        type: GET_STORE_DETAILS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch store details'
      });
      throw error;
    }
  };
};

export const getFulfillmentTypes = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_FULFILLMENT_TYPES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/PRODUCT_FULFILLMENT_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_FULFILLMENT_TYPES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }

      throw new Error(response.data?.meta?.message || 'Failed to fetch fulfillment types');

    } catch (error) {
      dispatch({
        type: GET_FULFILLMENT_TYPES_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to fetch fulfillment types'
      });
      throw error;
    }
  };
};

export const updateLoginDetails = (userId: string, payload: { mobile_number?: string, email?: string }): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/auth/${userId}/update`,
        {
          ...payload,
          section_key: "LOGIN_DETAILS"
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_USER_DETAILS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      }

      throw new Error(response.data?.meta?.message || 'Failed to update login details');

    } catch (error) {
      dispatch({
        type: UPDATE_USER_DETAILS_FAILURE,
        payload: error instanceof Error ? error.message : 'Failed to update login details'
      });
      throw error;
    }
  };
};

export const getEmailSettings = (settingType: 'EMAIL' | 'SMS'): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_EMAIL_SETTINGS_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/settings/user_server_settings?setting_type=${settingType}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_EMAIL_SETTINGS_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch settings');
      }
    } catch (error: any) {
      dispatch({
        type: GET_EMAIL_SETTINGS_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

export const activateEmailProvider = (providerId: number, settingTypeId: number): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: ACTIVATE_EMAIL_PROVIDER_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/settings/user_server_setting/${providerId}/activation`,
        {
          setting_type_id: settingTypeId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: ACTIVATE_EMAIL_PROVIDER_SUCCESS,
          payload: response.data.data
        });
        // Refresh email settings after activation
        dispatch(getEmailSettings(settingType));
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to activate email provider');
      }
    } catch (error: any) {
      dispatch({
        type: ACTIVATE_EMAIL_PROVIDER_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

export const updateEmailProvider = (providerId: number, sections: any[]): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: UPDATE_EMAIL_PROVIDER_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/backend_master/settings/user_server_settings/${providerId}/update`,
        { sections },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: UPDATE_EMAIL_PROVIDER_SUCCESS,
          payload: response.data.data
        });
        // Refresh email settings after update
        dispatch(getEmailSettings(settingType));
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to update email provider');
      }
    } catch (error: any) {
      dispatch({
        type: UPDATE_EMAIL_PROVIDER_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

export const getMessageTypes = (): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_MESSAGE_TYPES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/core/lookup_code/list/MESSAGE_TYPE`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_MESSAGE_TYPES_SUCCESS,
          payload: response.data.data
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch message types');
      }
    } catch (error: any) {
      dispatch({
        type: GET_MESSAGE_TYPES_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

export const getTemplates = (page: number = 1, perPage: number = 10): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_TEMPLATES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/backend_master/templates?per_page=${perPage}&page_no=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_TEMPLATES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch templates');
      }
    } catch (error: any) {
      dispatch({
        type: GET_TEMPLATES_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };
};

export const getUiConfig = () => async (dispatch: any) => {
  dispatch({ type: GET_UI_CONFIG });

  try {
    const response = await fetch(
      'http://20.197.4.12:7001/api/v1/backend_master/settings/user_server_settings/get/NP_UI_COMPONENTS',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const data = await response.json();

    if (data.meta.status) {
      dispatch({
        type: GET_UI_CONFIG_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: GET_UI_CONFIG_FAILURE,
        payload: data.meta.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_UI_CONFIG_FAILURE,
      payload: 'Failed to fetch UI configuration',
    });
  }
};

// Add this with your other actions
export const getSwaggerKey = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: GET_SWAGGER_KEY_REQUEST });

    const response = await fetch(
      `${API_BASE_URL}/company_partners/getkey`,
      {
        method: "GET",
        headers: {
          Authorization: GLOBAL_CONSTANTS.token,
        },
      }
    );

    const data = await response.json();

    if (data.meta.status) {
      dispatch({
        type: GET_SWAGGER_KEY_SUCCESS,
        payload: data.data,
      });
    } else {
      throw new Error(data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: GET_SWAGGER_KEY_FAILURE,
      payload: error.message,
    });
  }
};

export const createCompanyUser = (userData: {
  name: string;
  email: string;
  mobile_number: string;
  user_company_id: number;
}) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CREATE_COMPANY_USER_REQUEST });

    const response = await fetch(
      `${API_BASE_URL}/backend_master/company_partners_users/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: GLOBAL_CONSTANTS.token,
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (data.meta.status) {
      dispatch({
        type: CREATE_COMPANY_USER_SUCCESS,
        payload: data.data,
      });
      return data;
    } else {
      throw new Error(data.meta.message);
    }
  } catch (error) {
    dispatch({
      type: CREATE_COMPANY_USER_FAILURE,
      payload: error.message,
    });
    throw error;
  }
};

// Add this action creator
export const getProductCategoriesWithSubCategories = (
  params: { 
    page_no: number; 
    per_page: number; 
    is_active_check: boolean;
    parent_category_id: number | null;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        ...params,
        parent_category_id: params.parent_category_id === null ? 'null' : params.parent_category_id.toString()
      }).toString();

      const response = await axios.get(
        `${API_BASE_URL}/catalog/product_category/?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_CATEGORIES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch categories');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      dispatch({
        type: GET_PRODUCT_CATEGORIES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getAllProductCategories = (
  params: { 
    page_no: number; 
    per_page: number;
  }
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_ALL_PRODUCT_CATEGORIES_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/catalog/product_category/all_categories`,
        {
          params: {
            page_no: params.page_no,
            per_page: params.per_page
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_ALL_PRODUCT_CATEGORIES_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch categories');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch categories';
      dispatch({
        type: GET_ALL_PRODUCT_CATEGORIES_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};

export const getProductAttributesByCategory = (
  category: string,
  subCategory: string
): ThunkAction<Promise<any>, RootState, unknown, AuthActionTypes> => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: GET_PRODUCT_ATTRIBUTES_BY_CATEGORY_REQUEST });

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/catalog/product_attribute`,
        {
          params: {
            attribute: true,
            category: category,
            sub_category: subCategory
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data?.meta?.status) {
        dispatch({
          type: GET_PRODUCT_ATTRIBUTES_BY_CATEGORY_SUCCESS,
          payload: {
            data: response.data.data,
            meta: response.data.meta.pagination,
            category,
            subCategory
          }
        });
        return response.data;
      } else {
        throw new Error(response.data?.meta?.message || 'Failed to fetch attributes');
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch attributes';
      dispatch({
        type: GET_PRODUCT_ATTRIBUTES_BY_CATEGORY_FAILURE,
        payload: errorMessage
      });
      throw error;
    }
  };
};