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
  UPDATE_COMPANY_FAILURE, 
  GET_COMPANY_USERS_REQUEST, 
  GET_COMPANY_USERS_SUCCESS, 
  GET_COMPANY_USERS_FAILURE, 
  GET_BRANCHES_REQUEST, 
  GET_BRANCHES_SUCCESS, 
  GET_BRANCHES_FAILURE, 
  GET_COMPANY_DROPDOWN_REQUEST, 
  GET_COMPANY_DROPDOWN_SUCCESS, 
  GET_COMPANY_DROPDOWN_FAILURE, 
  UPDATE_BRANCH_REQUEST, 
  UPDATE_BRANCH_SUCCESS, 
  UPDATE_BRANCH_FAILURE, 
  GET_BRANCH_STATUS_LOOKUP_REQUEST, 
  GET_BRANCH_STATUS_LOOKUP_SUCCESS, 
  GET_BRANCH_STATUS_LOOKUP_FAILURE, 
  GET_PARTNERS_REQUEST, 
  GET_PARTNERS_SUCCESS, 
  GET_PARTNERS_FAILURE, 
  GET_BRANCH_DROPDOWN_REQUEST, 
  GET_BRANCH_DROPDOWN_SUCCESS, 
  GET_BRANCH_DROPDOWN_FAILURE 
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
  },
  companyUsers: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  branches: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  companyDropdown: {
    loading: false,
    error: null,
    data: []
  },
  branchStatusLookup: {
    loading: false,
    error: null,
    data: []
  },
  partners: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  branchDropdown: {
    loading: false,
    error: null,
    data: []
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
    case GET_COMPANY_USERS_REQUEST:
      return {
        ...state,
        companyUsers: {
          ...state.companyUsers,
          loading: true,
          error: null
        }
      };
    case GET_COMPANY_USERS_SUCCESS:
      return {
        ...state,
        companyUsers: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_COMPANY_USERS_FAILURE:
      return {
        ...state,
        companyUsers: {
          ...state.companyUsers,
          loading: false,
          error: action.payload
        }
      };
    case GET_BRANCHES_REQUEST:
      return {
        ...state,
        branches: {
          ...state.branches,
          loading: true,
          error: null
        }
      };
    case GET_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_BRANCHES_FAILURE:
      return {
        ...state,
        branches: {
          ...state.branches,
          loading: false,
          error: action.payload
        }
      };
    case GET_COMPANY_DROPDOWN_REQUEST:
      return {
        ...state,
        companyDropdown: {
          ...state.companyDropdown,
          loading: true,
          error: null
        }
      };
    case GET_COMPANY_DROPDOWN_SUCCESS:
      return {
        ...state,
        companyDropdown: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_COMPANY_DROPDOWN_FAILURE:
      return {
        ...state,
        companyDropdown: {
          ...state.companyDropdown,
          loading: false,
          error: action.payload
        }
      };
    case UPDATE_BRANCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case UPDATE_BRANCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_BRANCH_STATUS_LOOKUP_REQUEST:
      return {
        ...state,
        branchStatusLookup: {
          ...state.branchStatusLookup,
          loading: true,
          error: null
        }
      };
    case GET_BRANCH_STATUS_LOOKUP_SUCCESS:
      return {
        ...state,
        branchStatusLookup: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_BRANCH_STATUS_LOOKUP_FAILURE:
      return {
        ...state,
        branchStatusLookup: {
          ...state.branchStatusLookup,
          loading: false,
          error: action.payload
        }
      };
    case GET_PARTNERS_REQUEST:
      return {
        ...state,
        partners: {
          ...state.partners,
          loading: true,
          error: null
        }
      };
    case GET_PARTNERS_SUCCESS:
      return {
        ...state,
        partners: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_PARTNERS_FAILURE:
      return {
        ...state,
        partners: {
          ...state.partners,
          loading: false,
          error: action.payload
        }
      };
    case GET_BRANCH_DROPDOWN_REQUEST:
      return {
        ...state,
        branchDropdown: {
          ...state.branchDropdown,
          loading: true,
          error: null
        }
      };
    case GET_BRANCH_DROPDOWN_SUCCESS:
      return {
        ...state,
        branchDropdown: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_BRANCH_DROPDOWN_FAILURE:
      return {
        ...state,
        branchDropdown: {
          ...state.branchDropdown,
          loading: false,
          error: action.payload
        }
      };
    default:
      return state;
  }
};

export default authReducer; 