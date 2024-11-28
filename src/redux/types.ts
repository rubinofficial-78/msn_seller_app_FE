// Action Types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const GET_SELLER_COUNTS_REQUEST = 'GET_SELLER_COUNTS_REQUEST';
export const GET_SELLER_COUNTS_SUCCESS = 'GET_SELLER_COUNTS_SUCCESS';
export const GET_SELLER_COUNTS_FAILURE = 'GET_SELLER_COUNTS_FAILURE';
export const GET_AFFILIATE_PARTNER_COUNTS_REQUEST = 'GET_AFFILIATE_PARTNER_COUNTS_REQUEST';
export const GET_AFFILIATE_PARTNER_COUNTS_SUCCESS = 'GET_AFFILIATE_PARTNER_COUNTS_SUCCESS';
export const GET_AFFILIATE_PARTNER_COUNTS_FAILURE = 'GET_AFFILIATE_PARTNER_COUNTS_FAILURE';
export const GET_LOOKUP_CODES_REQUEST = 'GET_LOOKUP_CODES_REQUEST';
export const GET_LOOKUP_CODES_SUCCESS = 'GET_LOOKUP_CODES_SUCCESS';
export const GET_LOOKUP_CODES_FAILURE = 'GET_LOOKUP_CODES_FAILURE';
export const UPDATE_USER_DETAILS_REQUEST = 'UPDATE_USER_DETAILS_REQUEST';
export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS';
export const UPDATE_USER_DETAILS_FAILURE = 'UPDATE_USER_DETAILS_FAILURE';
export const UPDATE_STORE_DETAILS_REQUEST = 'UPDATE_STORE_DETAILS_REQUEST';
export const UPDATE_STORE_DETAILS_SUCCESS = 'UPDATE_STORE_DETAILS_SUCCESS';
export const UPDATE_STORE_DETAILS_FAILURE = 'UPDATE_STORE_DETAILS_FAILURE';
export const FILE_UPLOAD_REQUEST = 'FILE_UPLOAD_REQUEST';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_FAILURE = 'FILE_UPLOAD_FAILURE';
export const GET_SELLER_DASHBOARD_COUNTS_REQUEST = 'GET_SELLER_DASHBOARD_COUNTS_REQUEST';
export const GET_SELLER_DASHBOARD_COUNTS_SUCCESS = 'GET_SELLER_DASHBOARD_COUNTS_SUCCESS';
export const GET_SELLER_DASHBOARD_COUNTS_FAILURE = 'GET_SELLER_DASHBOARD_COUNTS_FAILURE';

// State Types
export interface AuthState {
  loading: boolean;
  error: string | null;
  user: any | null;
  userDetails: {
    loading: boolean;
    error: string | null;
    data: any | null;
  };
  otpVerification: {
    loading: boolean;
    error: string | null;
    verified: boolean;
  };
  dashboardCounts: {
    loading: boolean;
    error: string | null;
    data: DashboardCounts | null;
  };
  sellerCounts: {
    loading: boolean;
    error: string | null;
    data: SellerCounts | null;
  };
  affiliatePartnerCounts: {
    loading: boolean;
    error: string | null;
    data: AffiliatePartnerCounts | null;
  };
  lookupCodes: {
    loading: boolean;
    error: string | null;
    data: LookupCode[] | null;
  };
  fileUpload: {
    loading: boolean;
    error: string | null;
    data: FileUploadResponse | null;
  };
  sellerDashboard: SellerDashboardState;
}

export interface RootState {
  data: AuthState;
}

// Action Types
interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface VerifyOTPRequestAction {
  type: typeof VERIFY_OTP_REQUEST;
}

interface VerifyOTPSuccessAction {
  type: typeof VERIFY_OTP_SUCCESS;
  payload: any;
}

interface VerifyOTPFailureAction {
  type: typeof VERIFY_OTP_FAILURE;
  payload: string;
}

interface GetUserRequestAction {
  type: typeof GET_USER_REQUEST;
}

interface GetUserSuccessAction {
  type: typeof GET_USER_SUCCESS;
  payload: any;
}

interface GetUserFailureAction {
  type: typeof GET_USER_FAILURE;
  payload: string;
}

interface GetDashboardCountsRequestAction {
  type: typeof GET_SELLER_COUNTS_REQUEST;
}

interface GetDashboardCountsSuccessAction {
  type: typeof GET_SELLER_COUNTS_SUCCESS;
  payload: SellerCounts;
}

interface GetDashboardCountsFailureAction {
  type: typeof GET_SELLER_COUNTS_FAILURE;
  payload: string;
}

interface GetSellerCountsRequestAction {
  type: typeof GET_SELLER_COUNTS_REQUEST;
}

interface GetSellerCountsSuccessAction {
  type: typeof GET_SELLER_COUNTS_SUCCESS;
  payload: SellerCounts;
}

interface GetSellerCountsFailureAction {
  type: typeof GET_SELLER_COUNTS_FAILURE;
  payload: string;
}

interface GetAffiliatePartnerCountsRequestAction {
  type: typeof GET_AFFILIATE_PARTNER_COUNTS_REQUEST;
}

interface GetAffiliatePartnerCountsSuccessAction {
  type: typeof GET_AFFILIATE_PARTNER_COUNTS_SUCCESS;
  payload: AffiliatePartnerCounts;
}

interface GetAffiliatePartnerCountsFailureAction {
  type: typeof GET_AFFILIATE_PARTNER_COUNTS_FAILURE;
  payload: string;
}

interface GetLookupCodesRequestAction {
  type: typeof GET_LOOKUP_CODES_REQUEST;
}

interface GetLookupCodesSuccessAction {
  type: typeof GET_LOOKUP_CODES_SUCCESS;
  payload: LookupCode[];
}

interface GetLookupCodesFailureAction {
  type: typeof GET_LOOKUP_CODES_FAILURE;
  payload: string;
}

interface UpdateUserDetailsRequestAction {
  type: typeof UPDATE_USER_DETAILS_REQUEST;
}

interface UpdateUserDetailsSuccessAction {
  type: typeof UPDATE_USER_DETAILS_SUCCESS;
  payload: any;
}

interface UpdateUserDetailsFailureAction {
  type: typeof UPDATE_USER_DETAILS_FAILURE;
  payload: string;
}

interface UpdateStoreDetailsRequestAction {
  type: typeof UPDATE_STORE_DETAILS_REQUEST;
}

interface UpdateStoreDetailsSuccessAction {
  type: typeof UPDATE_STORE_DETAILS_SUCCESS;
  payload: any;
}

interface UpdateStoreDetailsFailureAction {
  type: typeof UPDATE_STORE_DETAILS_FAILURE;
  payload: string;
}

interface FileUploadRequestAction {
  type: typeof FILE_UPLOAD_REQUEST;
}

interface FileUploadSuccessAction {
  type: typeof FILE_UPLOAD_SUCCESS;
  payload: FileUploadResponse;
}

interface FileUploadFailureAction {
  type: typeof FILE_UPLOAD_FAILURE;
  payload: string;
}

interface GetSellerDashboardCountsRequestAction {
  type: typeof GET_SELLER_DASHBOARD_COUNTS_REQUEST;
}

interface GetSellerDashboardCountsSuccessAction {
  type: typeof GET_SELLER_DASHBOARD_COUNTS_SUCCESS;
  payload: {
    total_customers: number;
    total_products: number;
    total_orders: number;
  };
}

interface GetSellerDashboardCountsFailureAction {
  type: typeof GET_SELLER_DASHBOARD_COUNTS_FAILURE;
  payload: string;
}

export type AuthActionTypes = 
  | LoginRequestAction 
  | LoginSuccessAction 
  | LoginFailureAction
  | VerifyOTPRequestAction
  | VerifyOTPSuccessAction
  | VerifyOTPFailureAction
  | GetUserRequestAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | GetDashboardCountsRequestAction
  | GetDashboardCountsSuccessAction
  | GetDashboardCountsFailureAction
  | GetSellerCountsRequestAction
  | GetSellerCountsSuccessAction
  | GetSellerCountsFailureAction
  | GetAffiliatePartnerCountsRequestAction
  | GetAffiliatePartnerCountsSuccessAction
  | GetAffiliatePartnerCountsFailureAction
  | GetLookupCodesRequestAction
  | GetLookupCodesSuccessAction
  | GetLookupCodesFailureAction
  | UpdateUserDetailsRequestAction
  | UpdateUserDetailsSuccessAction
  | UpdateUserDetailsFailureAction
  | UpdateStoreDetailsRequestAction
  | UpdateStoreDetailsSuccessAction
  | UpdateStoreDetailsFailureAction
  | FileUploadRequestAction
  | FileUploadSuccessAction
  | FileUploadFailureAction
  | GetSellerDashboardCountsRequestAction
  | GetSellerDashboardCountsSuccessAction
  | GetSellerDashboardCountsFailureAction; 

export interface FileUploadPayload {
  data: string;      // base64 string without prefix
  filetype: string;  // e.g., "image/png", "image/svg+xml"
  extension: string; // e.g., ".png", ".svg"
  module: string;    // e.g., "onboarding"
} 

interface SellerDashboardState {
  loading: boolean;
  error: string | null;
  data: {
    total_customers: number;
    total_products: number;
    total_orders: number;
  } | null;
} 

interface StoreDetails {
  id: number;
  name: string;
  code: string;
  // ... other store details properties
}

interface UserDetailsResponse {
  data: {
    id: number;
    name: string;
    store_details: StoreDetails[];
    // ... other user details properties
  };
  meta: {
    status: boolean;
    message: string;
  };
}

interface UserDetailsState {
  loading: boolean;
  error: string | null;
  data: UserDetailsResponse | null;
} 