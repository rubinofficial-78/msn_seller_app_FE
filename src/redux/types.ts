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
export const GET_COMPANIES_REQUEST = 'GET_COMPANIES_REQUEST';
export const GET_COMPANIES_SUCCESS = 'GET_COMPANIES_SUCCESS';
export const GET_COMPANIES_FAILURE = 'GET_COMPANIES_FAILURE';
export const UPDATE_COMPANY_REQUEST = 'UPDATE_COMPANY_REQUEST';
export const UPDATE_COMPANY_SUCCESS = 'UPDATE_COMPANY_SUCCESS';
export const UPDATE_COMPANY_FAILURE = 'UPDATE_COMPANY_FAILURE';
export const GET_STATUS_LOOKUP_REQUEST = 'GET_STATUS_LOOKUP_REQUEST';
export const GET_STATUS_LOOKUP_SUCCESS = 'GET_STATUS_LOOKUP_SUCCESS';
export const GET_STATUS_LOOKUP_FAILURE = 'GET_STATUS_LOOKUP_FAILURE';
export const GET_COMPANY_USERS_REQUEST = 'GET_COMPANY_USERS_REQUEST';
export const GET_COMPANY_USERS_SUCCESS = 'GET_COMPANY_USERS_SUCCESS';
export const GET_COMPANY_USERS_FAILURE = 'GET_COMPANY_USERS_FAILURE';
export const GET_BRANCHES_REQUEST = 'GET_BRANCHES_REQUEST';
export const GET_BRANCHES_SUCCESS = 'GET_BRANCHES_SUCCESS';
export const GET_BRANCHES_FAILURE = 'GET_BRANCHES_FAILURE';
export const GET_COMPANY_DROPDOWN_REQUEST = 'GET_COMPANY_DROPDOWN_REQUEST';
export const GET_COMPANY_DROPDOWN_SUCCESS = 'GET_COMPANY_DROPDOWN_SUCCESS';
export const GET_COMPANY_DROPDOWN_FAILURE = 'GET_COMPANY_DROPDOWN_FAILURE';
export const CREATE_BRANCH_REQUEST = 'CREATE_BRANCH_REQUEST';
export const CREATE_BRANCH_SUCCESS = 'CREATE_BRANCH_SUCCESS';
export const CREATE_BRANCH_FAILURE = 'CREATE_BRANCH_FAILURE';
export const GET_BRANCH_STATUS_LOOKUP_REQUEST = 'GET_BRANCH_STATUS_LOOKUP_REQUEST';
export const GET_BRANCH_STATUS_LOOKUP_SUCCESS = 'GET_BRANCH_STATUS_LOOKUP_SUCCESS';
export const GET_BRANCH_STATUS_LOOKUP_FAILURE = 'GET_BRANCH_STATUS_LOOKUP_FAILURE';

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
  companies: {
    loading: boolean;
    error: string | null;
    data: Company[];
    meta: any;
  };
  statusLookup: {
    loading: boolean;
    error: string | null;
    data: any[];
  };
  companyUsers: {
    loading: boolean;
    error: string | null;
    data: any[];
    meta: any;
  };
  branches: {
    loading: boolean;
    error: string | null;
    data: Branch[];
    meta: any;
  };
  companyDropdown: {
    loading: boolean;
    error: string | null;
    data: CompanyDropdownItem[];
  };
  branchStatusLookup: {
    loading: boolean;
    error: string | null;
    data: any[];
  };
  partners: {
    loading: boolean;
    error: string | null;
    data: any[];
    meta: any;
  };
  branchDropdown: {
    loading: boolean;
    error: string | null;
    data: any[];
  };
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

interface GetCompaniesRequestAction {
  type: typeof GET_COMPANIES_REQUEST;
}

interface GetCompaniesSuccessAction {
  type: typeof GET_COMPANIES_SUCCESS;
  payload: Company[];
}

interface GetCompaniesFailureAction {
  type: typeof GET_COMPANIES_FAILURE;
  payload: string;
}

interface UpdateCompanyRequestAction {
  type: typeof UPDATE_COMPANY_REQUEST;
}

interface UpdateCompanySuccessAction {
  type: typeof UPDATE_COMPANY_SUCCESS;
  payload: any;
}

interface UpdateCompanyFailureAction {
  type: typeof UPDATE_COMPANY_FAILURE;
  payload: string;
}

interface GetStatusLookupRequestAction {
  type: typeof GET_STATUS_LOOKUP_REQUEST;
}

interface GetStatusLookupSuccessAction {
  type: typeof GET_STATUS_LOOKUP_SUCCESS;
  payload: any[];
}

interface GetStatusLookupFailureAction {
  type: typeof GET_STATUS_LOOKUP_FAILURE;
  payload: string;
}

interface GetCompanyUsersRequestAction {
  type: typeof GET_COMPANY_USERS_REQUEST;
}

interface GetCompanyUsersSuccessAction {
  type: typeof GET_COMPANY_USERS_SUCCESS;
  payload: any[];
}

interface GetCompanyUsersFailureAction {
  type: typeof GET_COMPANY_USERS_FAILURE;
  payload: string;
}

interface GetBranchesRequestAction {
  type: typeof GET_BRANCHES_REQUEST;
}

interface GetBranchesSuccessAction {
  type: typeof GET_BRANCHES_SUCCESS;
  payload: {
    data: Branch[];
    meta: any;
  };
}

interface GetBranchesFailureAction {
  type: typeof GET_BRANCHES_FAILURE;
  payload: string;
}

interface GetCompanyDropdownRequestAction {
  type: typeof GET_COMPANY_DROPDOWN_REQUEST;
}

interface GetCompanyDropdownSuccessAction {
  type: typeof GET_COMPANY_DROPDOWN_SUCCESS;
  payload: CompanyDropdownItem[];
}

interface GetCompanyDropdownFailureAction {
  type: typeof GET_COMPANY_DROPDOWN_FAILURE;
  payload: string;
}

interface CreateBranchRequestAction {
  type: typeof CREATE_BRANCH_REQUEST;
}

interface CreateBranchSuccessAction {
  type: typeof CREATE_BRANCH_SUCCESS;
  payload: any;
}

interface CreateBranchFailureAction {
  type: typeof CREATE_BRANCH_FAILURE;
  payload: string;
}

interface GetBranchStatusLookupRequestAction {
  type: typeof GET_BRANCH_STATUS_LOOKUP_REQUEST;
}

interface GetBranchStatusLookupSuccessAction {
  type: typeof GET_BRANCH_STATUS_LOOKUP_SUCCESS;
  payload: any[];
}

interface GetBranchStatusLookupFailureAction {
  type: typeof GET_BRANCH_STATUS_LOOKUP_FAILURE;
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
  | GetSellerDashboardCountsFailureAction
  | GetCompaniesRequestAction
  | GetCompaniesSuccessAction
  | GetCompaniesFailureAction
  | UpdateCompanyRequestAction
  | UpdateCompanySuccessAction
  | UpdateCompanyFailureAction
  | GetStatusLookupRequestAction
  | GetStatusLookupSuccessAction
  | GetStatusLookupFailureAction
  | GetCompanyUsersRequestAction
  | GetCompanyUsersSuccessAction
  | GetCompanyUsersFailureAction
  | GetBranchesRequestAction
  | GetBranchesSuccessAction
  | GetBranchesFailureAction
  | GetCompanyDropdownRequestAction
  | GetCompanyDropdownSuccessAction
  | GetCompanyDropdownFailureAction
  | CreateBranchRequestAction
  | CreateBranchSuccessAction
  | CreateBranchFailureAction
  | GetBranchStatusLookupRequestAction
  | GetBranchStatusLookupSuccessAction
  | GetBranchStatusLookupFailureAction; 

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

interface Company {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  mobile_number: string;
  images: string[];
  is_active: boolean;
  createdAt: string;
  status: {
    lookup_code: string;
    display_name: string;
  };
  partner_company: Array<{
    id: number;
    url: string;
    website: string;
    address: string;
  }>;
  branches_counts: number;
  users_counts: number;
} 

interface Branch {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  default_address: {
    city: string;
    state: string;
    address: string;
    pincode: string;
  };
  is_active: boolean;
  createdAt: string;
  status: {
    id: number;
    lookup_code: string;
    display_name: string;
  };
  parent: {
    id: number;
    name: string;
  };
  partner_counts: number;
} 

interface CompanyDropdownItem {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  is_active: boolean;
  createdAt: string;
} 