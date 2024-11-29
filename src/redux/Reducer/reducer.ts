import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  VERIFY_OTP_REQUEST, 
  VERIFY_OTP_SUCCESS, 
  VERIFY_OTP_FAILURE, 
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
  FILE_UPLOAD_REQUEST, 
  FILE_UPLOAD_SUCCESS, 
  FILE_UPLOAD_FAILURE, 
  GET_SELLER_DASHBOARD_COUNTS_REQUEST, 
  GET_SELLER_DASHBOARD_COUNTS_SUCCESS, 
  GET_SELLER_DASHBOARD_COUNTS_FAILURE, 
  GET_USER_SUCCESS, 
  GET_COMPANIES_REQUEST, 
  GET_COMPANIES_SUCCESS, 
  GET_COMPANIES_FAILURE, 
  UPDATE_COMPANY_REQUEST, 
  UPDATE_COMPANY_SUCCESS, 
  UPDATE_COMPANY_FAILURE 
} from '../Action/action.types';
import { AuthState, AuthActionTypes } from '../types';

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  userDetails: {
    loading: false,
    error: null,
    data: null
  },
  otpVerification: {
    loading: false,
    error: null,
    verified: false
  },
  dashboardCounts: {
    loading: false,
    error: null,
    data: null
  },
  sellerCounts: {
    loading: false,
    error: null,
    data: null
  },
  affiliatePartnerCounts: {
    loading: false,
    error: null,
    data: null
  },
  lookupCodes: {
    loading: false,
    error: null,
    data: null
  },
  fileUpload: {
    loading: false,
    error: null,
    data: null
  },
  sellerDashboard: {
    loading: false,
    error: null,
    data: {
      total_customers: 0,
      total_products: 0,
      total_orders: 0
    }
  },
  companies: {
    loading: false,
    error: null,
    data: [],
    meta: null
  }
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        otpVerification: {
          ...state.otpVerification,
          loading: true,
          error: null
        }
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        otpVerification: {
          loading: false,
          error: null,
          verified: true
        }
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        otpVerification: {
          ...state.otpVerification,
          loading: false,
          error: action.payload
        }
      };
    case GET_DASHBOARD_COUNTS_REQUEST:
      return {
        ...state,
        dashboardCounts: {
          ...state.dashboardCounts,
          loading: true,
          error: null
        }
      };
    case GET_DASHBOARD_COUNTS_SUCCESS:
      return {
        ...state,
        dashboardCounts: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_DASHBOARD_COUNTS_FAILURE:
      return {
        ...state,
        dashboardCounts: {
          ...state.dashboardCounts,
          loading: false,
          error: action.payload
        }
      };
    case GET_SELLER_COUNTS_REQUEST:
      return {
        ...state,
        sellerCounts: {
          ...state.sellerCounts,
          loading: true,
          error: null
        }
      };
    case GET_SELLER_COUNTS_SUCCESS:
      return {
        ...state,
        sellerCounts: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_SELLER_COUNTS_FAILURE:
      return {
        ...state,
        sellerCounts: {
          ...state.sellerCounts,
          loading: false,
          error: action.payload
        }
      };
    case GET_AFFILIATE_PARTNER_COUNTS_REQUEST:
      return {
        ...state,
        affiliatePartnerCounts: {
          ...state.affiliatePartnerCounts,
          loading: true,
          error: null
        }
      };
    case GET_AFFILIATE_PARTNER_COUNTS_SUCCESS:
      return {
        ...state,
        affiliatePartnerCounts: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_AFFILIATE_PARTNER_COUNTS_FAILURE:
      return {
        ...state,
        affiliatePartnerCounts: {
          ...state.affiliatePartnerCounts,
          loading: false,
          error: action.payload
        }
      };
    case GET_LOOKUP_CODES_REQUEST:
      return {
        ...state,
        lookupCodes: {
          ...state.lookupCodes,
          loading: true,
          error: null
        }
      };
    case GET_LOOKUP_CODES_SUCCESS:
      return {
        ...state,
        lookupCodes: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_LOOKUP_CODES_FAILURE:
      return {
        ...state,
        lookupCodes: {
          ...state.lookupCodes,
          loading: false,
          error: action.payload
        }
      };
    case FILE_UPLOAD_REQUEST:
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          loading: true,
          error: null
        }
      };
    case FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        fileUpload: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case FILE_UPLOAD_FAILURE:
      return {
        ...state,
        fileUpload: {
          ...state.fileUpload,
          loading: false,
          error: action.payload
        }
      };
    case GET_SELLER_DASHBOARD_COUNTS_REQUEST:
      return {
        ...state,
        sellerDashboard: {
          ...state.sellerDashboard,
          loading: true,
          error: null
        }
      };
    case GET_SELLER_DASHBOARD_COUNTS_SUCCESS:
      return {
        ...state,
        sellerDashboard: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_SELLER_DASHBOARD_COUNTS_FAILURE:
      return {
        ...state,
        sellerDashboard: {
          ...state.sellerDashboard,
          loading: false,
          error: action.payload
        }
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userDetails: {
          loading: false,
          error: null,
          data: action.payload.data
        }
      };
    case GET_COMPANIES_REQUEST:
      return {
        ...state,
        companies: {
          ...state.companies,
          loading: true,
          error: null
        }
      };
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_COMPANIES_FAILURE:
      return {
        ...state,
        companies: {
          ...state.companies,
          loading: false,
          error: action.payload
        }
      };
    case UPDATE_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case UPDATE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer; 