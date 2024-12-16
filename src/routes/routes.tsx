import { Navigate, RouteObject } from "react-router-dom";
import GLOBAL_CONSTANTS from "../GlobalConstants";

// Main Layout and Auth Components
import DashboardLayout from "../components/layouts/DashboardLayout";
import Login from "../pages/auth/Login";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Onboarding from "../pages/auth/Onboarding";
import ProtectedRoute from "../components/ProtectedRoute";

// Dashboard and Main Pages
import Dashboard from "../pages/Dashboard";
import SellerDashboard from "../pages/seller/SellerDashboard";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import MasterCatalog from "../pages/MasterCatalog";
import Sellers from "../pages/Sellers";
import Partners from "../pages/Partners";
import Companies from "../pages/Companies";
import Branches from "../pages/Branches";
import Support from "../pages/Support";
import Reports from "../pages/Reports";
import Logistics from "../pages/Logistics";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import SellerSettings from "../pages/SellerSettings";
import MyListings from "../pages/seller/MyListing";
import MyOrders from "../pages/seller/MyOrders";
import AddproductMasterCatalogue from "../pages/AddproductMasterCatalogue";

// Product Related Pages
import AddProduct from "../pages/AddProduct";
import AddProductSeller from "../pages/AddProductSeller";
import ViewProduct from "../pages/products/ViewProduct";
// import EditProduct from "../pages/products/EditProduct";
import BulkUpload from "../pages/BulkUpload";
import CreateOffer from "../pages/products/CreateOffer";
import AddGroup from "../pages/AddGroup";
import AddAddOn from "../pages/AddAddOn";
import AddMenu from "../pages/AddMenu";

// Settings Related Pages
import AccountDetails from "../pages/settings/AccountDetails";
import SellerAccountDetails from "../pages/sellerSettings/SellerAccountDetails";
import LocationServices from "../pages/settings/LocationServices";
import BankingDetails from "../pages/sellerSettings/BankingDetails";
import BankingDetailsPage from "../pages/settings/BankingDetailsPage";
import AccessManagement from "../pages/settings/AccessManagement";
import CreateRole from "../pages/settings/CreateRole";
import CreateUser from "../pages/settings/CreateUser";
import NotificationSettings from "../pages/settings/NotificationSettings";
import MapSettings from "../pages/settings/MapSettings";
import UiConfig from "../pages/settings/UiConfig";

// Partner and Company Related Pages
import CreatePartner from "../components/CreatePartner";
import ViewPartner from "../pages/partners/ViewPartner";
import EditPartner from "../pages/partners/EditPartner";
import CreateCompany from "../components/CreateCompany";
import ViewCompany from "../pages/ViewCompany";
import EditCompany from "../pages/EditCompany";

// Branch Related Pages
import CreateBranch from "../components/CreateBranch";
import ViewBranch from "../pages/ViewBranch";
import EditBranch from "../pages/EditBranch";

// Seller Related Pages
import AddSeller from "../pages/AddSeller";
import ViewSeller from "../pages/ViewSeller";
import EditSeller from "../pages/EditSeller";

// Add import for Payouts
import Payouts from "../pages/Payouts";

// Add import for CreateTicket
import ViewTicket from "../pages/support/ViewTicket";
import CreateTicket from "../pages/support/CreateTicket";

import BulkUploadMasterCatalogue from "../pages/bulkUploadMasterCatalogue";
import ShippingDetailsPage from "../pages/sellerSettings/ShippingDetailsPage";
import OrderView from "../pages/orders/OrderView";
import CreateVariant from "../pages/products/CreateVariant";
import MasterCatalogTable from "../pages/products/MasterCatalogTable";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const isNewUser = localStorage.getItem("isNewUser") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return "/login";
  }

  if (isNewUser) {
    return "/onboarding";
  }

  if (userRole === "SELLER") {
    return "/dashboard/seller-dashboard";
  }

  return "/dashboard";
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={checkAuth()} replace />,
  },
  // Auth Routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOTP />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      // Main Dashboard
      {
        path: "",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "COMPANY_PARTNER",
              "COMPANY_BRANCHES",
              "AFFILIATE_PARTNER",
            ]}
          >
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "seller-dashboard",
        element: (
          <ProtectedRoute allowedRoles={["SELLER"]}>
            <SellerDashboard />
          </ProtectedRoute>
        ),
      },

      // Products Routes
      {
        path: "products",
        children: [
          {
            path: "",
            element: <Products />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "add-product-seller",
            element: <AddProductSeller />,
          },
          {
            path: "add-product-master-catalogue",
            element: <AddproductMasterCatalogue />,
          },
          {
            path: "view/:id",
            element: <ViewProduct />,
          },
          {
            path: "edit/:id",
            // element: <EditProduct />,
          },
          {
            path: "bulk-upload",
            element: <BulkUpload />,
          },
          {
            path: "create-offer",
            element: <CreateOffer />,
          },
          {
            path: "add-group",
            element: <AddGroup />,
          },
          {
            path: "add-addon",
            element: <AddAddOn />,
          },
          {
            path: "add-menu",
            element: <AddMenu />,
          },
          {
            path: ":id/create-variant",
            element: <CreateVariant />,
          },
          {
            path: "master-catalog",
            element: <MasterCatalogTable />,
          },
        ],
      },

      // Partners Routes
      {
        path: "partners",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute
                allowedRoles={["ADMIN", "COMPANY_PARTNER", "COMPANY_BRANCHES"]}
              >
                <Partners />
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute
                allowedRoles={["ADMIN", "COMPANY_PARTNER", "COMPANY_BRANCHES"]}
              >
                <CreatePartner />
              </ProtectedRoute>
            ),
          },
          {
            path: "view/:id",
            element: (
              <ProtectedRoute
                allowedRoles={["ADMIN", "COMPANY_PARTNER", "COMPANY_BRANCHES"]}
              >
                <ViewPartner />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute
                allowedRoles={["ADMIN", "COMPANY_PARTNER", "COMPANY_BRANCHES"]}
              >
                <EditPartner />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // Companies Routes
      {
        path: "companies",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Companies />
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <CreateCompany />
              </ProtectedRoute>
            ),
          },
          {
            path: "view/:id",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <ViewCompany />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <EditCompany />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // Branches Routes
      {
        path: "branches",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN", "COMPANY_PARTNER"]}>
                <Branches />
              </ProtectedRoute>
            ),
          },
          {
            path: "create",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN", "COMPANY_PARTNER"]}>
                <CreateBranch />
              </ProtectedRoute>
            ),
          },
          {
            path: "view/:id",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN", "COMPANY_PARTNER"]}>
                <ViewBranch />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN", "COMPANY_PARTNER"]}>
                <EditBranch />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // Sellers Routes
      {
        path: "sellers",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute
                allowedRoles={[
                  "ADMIN",
                  "COMPANY_PARTNER",
                  "COMPANY_BRANCHES",
                  "AFFILIATE_PARTNER",
                ]}
              >
                <Sellers />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute
                allowedRoles={[
                  "ADMIN",
                  "COMPANY_PARTNER",
                  "COMPANY_BRANCHES",
                  "AFFILIATE_PARTNER",
                ]}
              >
                <AddSeller />
              </ProtectedRoute>
            ),
          },
          {
            path: "view/:id",
            element: (
              <ProtectedRoute
                allowedRoles={[
                  "ADMIN",
                  "COMPANY_PARTNER",
                  "COMPANY_BRANCHES",
                  "AFFILIATE_PARTNER",
                ]}
              >
                <ViewSeller />
              </ProtectedRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <ProtectedRoute
                allowedRoles={[
                  "ADMIN",
                  "COMPANY_PARTNER",
                  "COMPANY_BRANCHES",
                  "AFFILIATE_PARTNER",
                ]}
              >
                <EditSeller />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // Other Main Routes
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "master-catalog",
        element: <MasterCatalog />,
      },
      {
        path: "support",
        children: [
          {
            path: "",
            element: <Support />,
          },
          {
            path: "create-ticket",
            element: <CreateTicket />,
          },
          {
            path: "view/:id",
            element: <ViewTicket />,
          },
        ],
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "logistics",
        element: <Logistics />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },

      // Admin Settings Routes
      {
        path: "settings",
        element: (
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Settings />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "account-details",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AccountDetails />
              </ProtectedRoute>
            ),
          },
          {
            path: "banking-details",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <BankingDetailsPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "access-management",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AccessManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "create-role",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <CreateRole />
              </ProtectedRoute>
            ),
          },
          {
            path: "create-user",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <CreateUser />
              </ProtectedRoute>
            ),
          },
          {
            path: "notification-settings",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <NotificationSettings />
              </ProtectedRoute>
            ),
          },
          {
            path: "map-settings",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <MapSettings />
              </ProtectedRoute>
            ),
          },
          {
            path: "ui-config",
            element: (
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <UiConfig />
              </ProtectedRoute>
            ),
          },
        ],
      },

      // Seller Settings Routes
      {
        path: "seller-settings",
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute allowedRoles={["SELLER"]}>
                <SellerSettings />
              </ProtectedRoute>
            ),
          },
          {
            path: "account-details",
            element: <SellerAccountDetails />,
          },
          {
            path: "banking-details",
            element: <BankingDetails />,
          },
          {
            path: "location-services",
            element: <LocationServices />,
          },
          {
            path: "location-services/create-store",
            element: <LocationServices />,
          },
          {
            path: "location-services/shipping-details/:id",
            element: <ShippingDetailsPage />,
          },
          {
            path: "location-services/edit-store/:id",
            element: <LocationServices />,
          },
        ],
      },

      // My Listings Routes
      {
        path: "my-listings",
        element: (
          <ProtectedRoute allowedRoles={["SELLER"]}>
            <MyListings />
          </ProtectedRoute>
        ),
      },

      // Add MyOrders route
      {
        path: "my-orders",
        element: (
          <ProtectedRoute allowedRoles={["SELLER"]}>
            <MyOrders />
          </ProtectedRoute>
        ),
      },

      // Payouts route
      {
        path: "payouts",
        element: (
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "SELLER",
              "COMPANY_PARTNER",
              "COMPANY_BRANCHES",
            ]}
          >
            <Payouts />
          </ProtectedRoute>
        ),
      },

      // Add this route for creating new offers
      {
        path: "/dashboard/products/create-offer",
        element: <CreateOffer />,
      },
      {
        path: "/dashboard/products/edit-offer/:id",
        element: <CreateOffer />,
      },

      // Add this route under the dashboard routes
      {
        path: "/dashboard/mastercatalogue/add-product",
        element: <AddproductMasterCatalogue />,
      },
      {
        path: "/dashboard/mastercatalogue/bulk-upload",
        element: <BulkUploadMasterCatalogue />,
      },
      {
        path: "/dashboard/orders/view/:id",
        element: <OrderView />,
      },
      {
        path: "/dashboard/products/master-catalog",
        element: <MasterCatalogTable />,
      },
    ],
  },
];

export default routes;
