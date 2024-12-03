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
  GET_SELLER_BY_ID_REQUEST, 
  GET_SELLER_BY_ID_SUCCESS, 
  GET_SELLER_BY_ID_FAILURE, 
  SELLER_REGISTER_REQUEST, 
  SELLER_REGISTER_SUCCESS, 
  SELLER_REGISTER_FAILURE, 
  UPDATE_SELLER_DETAILS_REQUEST, 
  UPDATE_SELLER_DETAILS_SUCCESS, 
  UPDATE_SELLER_DETAILS_FAILURE, 
  GET_PARTNER_DROPDOWN_REQUEST, 
  GET_PARTNER_DROPDOWN_SUCCESS, 
  GET_PARTNER_DROPDOWN_FAILURE, 
  ACTIVATE_SELLER_REQUEST, 
  ACTIVATE_SELLER_SUCCESS, 
  ACTIVATE_SELLER_FAILURE, 
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
  GET_SALES_ORDERS_COUNT_REQUEST, 
  GET_SALES_ORDERS_COUNT_SUCCESS, 
  GET_SALES_ORDERS_COUNT_FAILURE ,
  GET_ORDERS_REQUEST, 
  GET_ORDERS_SUCCESS, 
  GET_ORDERS_FAILURE,
  GET_ORDER_STATUS_LOOKUP_REQUEST,
  GET_ORDER_STATUS_LOOKUP_SUCCESS,
  GET_ORDER_STATUS_LOOKUP_FAILURE,
  GET_RETURNS_REQUEST,
  GET_RETURNS_SUCCESS,
  GET_RETURNS_FAILURE,
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
  GET_INVENTORY_STATUS_LOOKUP_REQUEST,
  GET_INVENTORY_STATUS_LOOKUP_SUCCESS,
  GET_INVENTORY_STATUS_LOOKUP_FAILURE
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
  },
  partnerStatusLookup: {
    loading: false,
    error: null,
    data: []
  },
  partnerCounts: {
    loading: false,
    error: null,
    data: null
  },
  sellers: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  sellerDetails: {
    loading: false,
    error: null,
    data: null
  },
  partnerDropdown: {
    loading: false,
    error: null,
    data: null
  },
  products: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  salesOrdersCount: {
    loading: false,
    error: null,
    data: {
      total_orders: 0,
      accepted: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      created: 0
    }
  },
  productCounts: {
    loading: false,
    error: null,
    data: null
  },
  selectedProduct: {
    loading: false,
    error: null,
    data: null
  },
  productCategories: {
    loading: false,
    error: null,
    data: null,
    subCategories: null
  },
  hsnCodes: {
    loading: false,
    error: null,
    data: null
  },
  savedProduct: null,
  uomLookup: {
    loading: false,
    error: null,
    data: null
  },
  paymentModeLookup: {
    loading: false,
    error: null,
    data: null
  },
  ondcDetails: {
    loading: false,
    error: null,
    data: null
  },
  ondcBulkUpdate: {
    loading: false,
    error: null,
    data: null
  },
  templateDownload: {
    loading: false,
    error: null
  },
  templateUpload: {
    loading: false,
    error: null,
    data: null
  },
  offers: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  offerTypes: {
    loading: false,
    error: null,
    data: null
  },
  savedOffer: null,
  locations: {
    loading: false,
    error: null,
    data: null
  },
  orders: {
    data: [],
    loading: false,
    error: null,
    meta: {
      pagination: {
        per_page: 10,
        page_no: 1,
        total_rows: 0,
        total_pages: 0
      }
    }
  },
  orderStatusLookup: {
    data: [],
    loading: false,
    error: null
  },
  returns: {
    loading: false,
    error: null,
    data: [],
    meta: null
  },
  inventoryStatusLookup: {
    loading: false,
    error: null,
    data: null
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
    case GET_PARTNER_STATUS_LOOKUP_REQUEST:
      return {
        ...state,
        partnerStatusLookup: {
          ...state.partnerStatusLookup,
          loading: true,
          error: null
        }
      };
    case GET_PARTNER_STATUS_LOOKUP_SUCCESS:
      return {
        ...state,
        partnerStatusLookup: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_PARTNER_STATUS_LOOKUP_FAILURE:
      return {
        ...state,
        partnerStatusLookup: {
          ...state.partnerStatusLookup,
          loading: false,
          error: action.payload
        }
      };
    case GET_PARTNER_COUNTS_REQUEST:
      return {
        ...state,
        partnerCounts: {
          ...state.partnerCounts,
          loading: true,
          error: null
        }
      };
    case GET_PARTNER_COUNTS_SUCCESS:
      return {
        ...state,
        partnerCounts: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_PARTNER_COUNTS_FAILURE:
      return {
        ...state,
        partnerCounts: {
          ...state.partnerCounts,
          loading: false,
          error: action.payload
        }
      };
    case GET_SELLERS_REQUEST:
      return {
        ...state,
        sellers: {
          ...state.sellers,
          loading: true,
          error: null
        }
      };
    case GET_SELLERS_SUCCESS:
      return {
        ...state,
        sellers: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_SELLERS_FAILURE:
      return {
        ...state,
        sellers: {
          ...state.sellers,
          loading: false,
          error: action.payload
        }
      };
    case GET_SELLER_BY_ID_REQUEST:
      return {
        ...state,
        sellerDetails: {
          ...state.sellerDetails,
          loading: true,
          error: null
        }
      };
    case GET_SELLER_BY_ID_SUCCESS:
      return {
        ...state,
        sellerDetails: {
          loading: false,
          error: null,
          data: action.payload.data
        }
      };
    case GET_SELLER_BY_ID_FAILURE:
      return {
        ...state,
        sellerDetails: {
          ...state.sellerDetails,
          loading: false,
          error: action.payload
        }
      };
    case SELLER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SELLER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case SELLER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_SELLER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_SELLER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case UPDATE_SELLER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_PARTNER_DROPDOWN_REQUEST:
      return {
        ...state,
        partnerDropdown: {
          ...state.partnerDropdown,
          loading: true,
          error: null
        }
      };
    case GET_PARTNER_DROPDOWN_SUCCESS:
      return {
        ...state,
        partnerDropdown: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_PARTNER_DROPDOWN_FAILURE:
      return {
        ...state,
        partnerDropdown: {
          ...state.partnerDropdown,
          loading: false,
          error: action.payload
        }
      };
    case ACTIVATE_SELLER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ACTIVATE_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case ACTIVATE_SELLER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_PRODUCTS_REQUEST:
      return {
        ...state,
        products: {
          ...state.products,
          loading: true,
          error: null
        }
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_PRODUCTS_FAILURE:
      return {
        ...state,
        products: {
          ...state.products,
          loading: false,
          error: action.payload
        }
      };
    case GET_PRODUCT_COUNTS_REQUEST:
      return {
        ...state,
        productCounts: {
          ...state.productCounts,
          loading: true,
          error: null
        }
      };
    case GET_PRODUCT_COUNTS_SUCCESS:
      return {
        ...state,
        productCounts: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_PRODUCT_COUNTS_FAILURE:
      return {
        ...state,
        productCounts: {
          ...state.productCounts,
          loading: false,
          error: action.payload
        }
      };
    case GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          loading: true,
          error: null
        }
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedProduct: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        selectedProduct: {
          ...state.selectedProduct,
          loading: false,
          error: action.payload
        }
      };
    case GET_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state,
        productCategories: {
          ...state.productCategories,
          loading: true,
          error: null
        }
      };
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        productCategories: {
          loading: false,
          error: null,
          data: action.payload.isSubCategory ? state.productCategories.data : action.payload.data,
          subCategories: action.payload.isSubCategory ? action.payload.data : null
        }
      };
    case GET_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state,
        productCategories: {
          ...state.productCategories,
          loading: false,
          error: action.payload
        }
      };
    case GET_HSN_CODES_REQUEST:
      return {
        ...state,
        hsnCodes: {
          ...state.hsnCodes,
          loading: true,
          error: null
        }
      };
    case GET_HSN_CODES_SUCCESS:
      return {
        ...state,
        hsnCodes: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_HSN_CODES_FAILURE:
      return {
        ...state,
        hsnCodes: {
          ...state.hsnCodes,
          loading: false,
          error: action.payload
        }
      };
    case SAVE_BASIC_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_BASIC_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        savedProduct: action.payload
      };
    case SAVE_BASIC_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_SALES_ORDERS_COUNT_REQUEST:
      return {
        ...state,
        salesOrdersCount: {
          ...state.salesOrdersCount,
          loading: true,
          error: null
        }
      };
    case GET_SALES_ORDERS_COUNT_SUCCESS:
      return {
        ...state,
        salesOrdersCount: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_SALES_ORDERS_COUNT_FAILURE:
      return {
        ...state,
        salesOrdersCount: {
          ...state.salesOrdersCount,
          loading: false,
          error: action.payload
        }
      };
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: true,
          error: null
        }
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          data: action.payload.data,
          loading: false,
          error: null,
          meta: action.payload.meta
        }
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        orders: {
          ...state.orders,
          loading: false,
          error: action.payload
        }
      };

      case GET_ORDER_STATUS_LOOKUP_REQUEST:
        return {
          ...state,
          orderStatusLookup: {
            ...state.orderStatusLookup,
            loading: true,
            error: null
          }
        };
      case GET_ORDER_STATUS_LOOKUP_SUCCESS:
        return {
          ...state,
          orderStatusLookup: {
            data: action.payload,
            loading: false,
            error: null
          }
        };
      case GET_ORDER_STATUS_LOOKUP_FAILURE:
        return {
          ...state,
          orderStatusLookup: {
            ...state.orderStatusLookup,
            loading: false,
            error: action.payload
          }
        };
      case GET_RETURNS_REQUEST:
        return {
          ...state,
          returns: {
            ...state.returns,
            loading: true,
            error: null
          }
        };
      case GET_RETURNS_SUCCESS:
        return {
          ...state,
          returns: {
            loading: false,
            data: action.payload.data,
            meta: action.payload.meta,
            error: null
          }
        };
      case GET_RETURNS_FAILURE:
        return {
          ...state,
          returns: {
            ...state.returns,
            loading: false,
            error: action.payload
          }
        };
    case GET_UOM_LOOKUP_REQUEST:
      return {
        ...state,
        uomLookup: {
          ...state.uomLookup,
          loading: true,
          error: null
        }
      };
    case GET_UOM_LOOKUP_SUCCESS:
      return {
        ...state,
        uomLookup: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_UOM_LOOKUP_FAILURE:
      return {
        ...state,
        uomLookup: {
          ...state.uomLookup,
          loading: false,
          error: action.payload
        }
      };
    case GET_PAYMENT_MODE_LOOKUP_REQUEST:
      return {
        ...state,
        paymentModeLookup: {
          ...state.paymentModeLookup,
          loading: true,
          error: null
        }
      };
    case GET_PAYMENT_MODE_LOOKUP_SUCCESS:
      return {
        ...state,
        paymentModeLookup: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_PAYMENT_MODE_LOOKUP_FAILURE:
      return {
        ...state,
        paymentModeLookup: {
          ...state.paymentModeLookup,
          loading: false,
          error: action.payload
        }
      };
    case GET_ONDC_DETAILS_REQUEST:
      return {
        ...state,
        ondcDetails: {
          ...state.ondcDetails,
          loading: true,
          error: null
        }
      };
    case GET_ONDC_DETAILS_SUCCESS:
      return {
        ...state,
        ondcDetails: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_ONDC_DETAILS_FAILURE:
      return {
        ...state,
        ondcDetails: {
          ...state.ondcDetails,
          loading: false,
          error: action.payload
        }
      };
    case BULK_UPDATE_ONDC_DETAILS_REQUEST:
      return {
        ...state,
        ondcBulkUpdate: {
          ...state.ondcBulkUpdate,
          loading: true,
          error: null
        }
      };
    case BULK_UPDATE_ONDC_DETAILS_SUCCESS:
      return {
        ...state,
        ondcBulkUpdate: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case BULK_UPDATE_ONDC_DETAILS_FAILURE:
      return {
        ...state,
        ondcBulkUpdate: {
          ...state.ondcBulkUpdate,
          loading: false,
          error: action.payload
        }
      };
    case DOWNLOAD_TEMPLATE_REQUEST:
      return {
        ...state,
        templateDownload: {
          loading: true,
          error: null
        }
      };
    case DOWNLOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        templateDownload: {
          loading: false,
          error: null
        }
      };
    case DOWNLOAD_TEMPLATE_FAILURE:
      return {
        ...state,
        templateDownload: {
          loading: false,
          error: action.payload
        }
      };
    case UPLOAD_TEMPLATE_REQUEST:
      return {
        ...state,
        templateUpload: {
          ...state.templateUpload,
          loading: true,
          error: null
        }
      };
    case UPLOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        templateUpload: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case UPLOAD_TEMPLATE_FAILURE:
      return {
        ...state,
        templateUpload: {
          ...state.templateUpload,
          loading: false,
          error: action.payload
        }
      };
    case GET_OFFERS_REQUEST:
      return {
        ...state,
        offers: {
          ...state.offers,
          loading: true,
          error: null
        }
      };
    case GET_OFFERS_SUCCESS:
      console.log('Reducer handling GET_OFFERS_SUCCESS with payload:', action.payload);
      return {
        ...state,
        offers: {
          loading: false,
          error: null,
          data: action.payload.data,
          meta: action.payload.meta
        }
      };
    case GET_OFFERS_FAILURE:
      return {
        ...state,
        offers: {
          ...state.offers,
          loading: false,
          error: action.payload
        }
      };
    case GET_OFFER_TYPES_REQUEST:
      return {
        ...state,
        offerTypes: {
          ...state.offerTypes,
          loading: true,
          error: null
        }
      };
    case GET_OFFER_TYPES_SUCCESS:
      return {
        ...state,
        offerTypes: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_OFFER_TYPES_FAILURE:
      return {
        ...state,
        offerTypes: {
          ...state.offerTypes,
          loading: false,
          error: action.payload
        }
      };
    case SAVE_OFFER_BASICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_OFFER_BASICS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        savedOffer: action.payload
      };
    case SAVE_OFFER_BASICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_LOCATIONS_REQUEST:
      return {
        ...state,
        locations: {
          ...state.locations,
          loading: true,
          error: null
        }
      };
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_LOCATIONS_FAILURE:
      return {
        ...state,
        locations: {
          ...state.locations,
          loading: false,
          error: action.payload
        }
      };
    case GET_INVENTORY_STATUS_LOOKUP_REQUEST:
      return {
        ...state,
        inventoryStatusLookup: {
          ...state.inventoryStatusLookup,
          loading: true,
          error: null
        }
      };
    case GET_INVENTORY_STATUS_LOOKUP_SUCCESS:
      return {
        ...state,
        inventoryStatusLookup: {
          loading: false,
          error: null,
          data: action.payload
        }
      };
    case GET_INVENTORY_STATUS_LOOKUP_FAILURE:
      return {
        ...state,
        inventoryStatusLookup: {
          ...state.inventoryStatusLookup,
          loading: false,
          error: action.payload
        }
      };
      
    default:
      return state;
  }
};

export default authReducer; 