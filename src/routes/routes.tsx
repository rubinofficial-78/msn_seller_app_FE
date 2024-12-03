import { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Partners from "../pages/Partners";
import Payouts from "../pages/Payouts";
import Products from "../pages/Products";
import Reports from "../pages/Reports";
import Sellers from "../pages/Sellers";
import Support from "../pages/Support";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Settings from "../pages/Settings";
import MasterCatalog from "../pages/MasterCatalog";
import Companies from "../pages/Companies";
import Branches from "../pages/Branches";
import Logistics from "../pages/Logistics";
import Notifications from "../pages/Notifications";
import ProtectedRoute from "../components/ProtectedRoute";
import MyListings from "../pages/seller/MyListing";
import MyOrders from "../pages/seller/MyOrders";
import SellerDashboard from "../pages/seller/SellerDashboard";
import AccountDetails from "../pages/settings/AccountDetails";
import LocationServices from "../pages/settings/LocationServices";
import BankingDetails from "../pages/settings/BankingDetails";
import SellerAccountDetails from "../pages/sellerSettings/AccountDetails";
import SellerLocationServices from "../pages/sellerSettings/LocationServices";
import SellerBankingDetails from "../pages/sellerSettings/BankingDetails";
import SellerSettings from "../pages/SellerSettings";
import Onboarding from "../pages/auth/Onboarding";
import CreateCompany from "../components/CreateCompany";
import CreateBranch from "../components/CreateBranch";
import ViewBranch from "../pages/ViewBranch";
import EditBranch from "../pages/EditBranch";
import ViewCompany from "../pages/ViewCompany";
import EditCompany from "../pages/EditCompany";
import CreatePartner from "../components/CreatePartner";
import AddSeller from "../pages/AddSeller";
import SellerOnboarding from "../components/SellerOnboarding";
import AddProduct from "../pages/AddProduct";
import BulkUpload from "../pages/BulkUpload";
import UiConfig from "../pages/settings/UiConfig";
import LogisticsDetails from "../pages/LogisticsDetails";
import AddGroup from "../pages/AddGroup";
import AddAddOn from "../pages/AddAddOn";
import AddMenu from "../pages/AddMenu";
import ShippingDetailsPage from "../pages/sellerSettings/ShippingDetailsPage";
import CreateOffer from "../pages/products/CreateOffer";
import AccessManagement from "../pages/settings/AccessManagement";
import CreateRole from "../pages/settings/CreateRole";
import CreateUser from "../pages/settings/CreateUser";
import CreateTicket from "../pages/support/CreateTicket";
import NotificationSettings from "../pages/settings/NotificationSettings";
import MapSettings from "../pages/settings/MapSettings";
import ViewPartner from "../pages/partners/ViewPartner";
import EditPartner from "../pages/partners/EditPartner";
import ViewSeller from "../pages/ViewSeller";
import EditSeller from "../pages/EditSeller";
import CreatePricingRule from "../pages/products/CreatePricingRule";
import ViewProduct from "../pages/products/ViewProduct";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
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
  {
    path: "/sellers/onboarding",
    element: <SellerOnboarding />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "master-catalog",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute allowedRoles={["SELLER_ADMIN"]}>
                <MasterCatalog />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-product",
            element: (
              <ProtectedRoute allowedRoles={["SELLER_ADMIN"]}>
                <AddProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "bulk-upload",
            element: (
              <ProtectedRoute allowedRoles={["SELLER_ADMIN"]}>
                <BulkUpload />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "companies",
        children: [
          {
            index: true,
            element: <Companies />,
          },
          {
            path: "create",
            element: <CreateCompany />,
          },
          {
            path: "view/:id",
            element: <ViewCompany />,
          },
          {
            path: "edit/:id",
            element: <EditCompany />,
          },
        ],
      },
      {
        path: "branches",
        children: [
          {
            index: true,
            element: <Branches />,
          },
          {
            path: "create",
            element: <CreateBranch />,
          },
          {
            path: "view/:id",
            element: <ViewBranch />,
          },
          {
            path: "edit/:id",
            element: <EditBranch />,
          },
        ],
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "partners",
        children: [
          {
            index: true,
            element: <Partners />,
          },
          {
            path: "create",
            element: <CreatePartner />,
          },
          {
            path: "view/:id",
            element: <ViewPartner />,
          },
          {
            path: "edit/:id",
            element: <EditPartner />,
          },
        ],
      },
      {
        path: "payouts",
        element: <Payouts />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "bulk-upload",
            element: <BulkUpload />,
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
            path: "create-offer",
            element: <CreateOffer />,
          },
          {
            path: "create-pricing-rule",
            element: <CreatePricingRule />,
          },
          {
            path: "view/:id",
            element: <ViewProduct />
          }
        ],
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "sellers",
        children: [
          {
            index: true,
            element: <Sellers />,
          },
          {
            path: "add",
            element: <AddSeller />,
          },
          {
            path: "onboarding",
            element: <SellerOnboarding />,
          },
          {
            path: "view/:id",
            element: <ViewSeller />,
          },
          {
            path: "edit/:id",
            element: <EditSeller />,
          },
        ],
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "logistics",
        element: <Logistics />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "seller-dashboard",
        element: <SellerDashboard />,
      },
      {
        path: "settings/account-details",
        element: <AccountDetails />,
      },
      {
        path: "/dashboard/settings/location-services",
        children: [
          {
            index: true,
            element: <LocationServices />,
          },
          {
            path: "shipping/:id",
            element: <ShippingDetailsPage />,
          },
        ],
      },
      {
        path: "settings/banking-details",
        element: <BankingDetails />,
      },
      {
        path: "seller-settings/account-details",
        element: <SellerAccountDetails />,
      },
      {
        path: "seller-settings/location-services",
        element: <SellerLocationServices />,
      },
      {
        path: "seller-settings/banking-details",
        element: <SellerBankingDetails />,
      },
      {
        path: "seller-settings",
        element: <SellerSettings />,
      },
      {
        path: "onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/settings/ui-config",
        element: <UiConfig />,
      },
      {
        path: "/dashboard/logistics/:orderId",
        element: <LogisticsDetails />,
      },
      {
        path: "/dashboard/products/create-offer",
        element: <CreateOffer />,
      },
      {
        path: "/dashboard/settings/access-management",
        element: <AccessManagement />,
      },
      {
        path: "/dashboard/settings/access-management/create-role",
        element: <CreateRole />,
      },
      {
        path: "/dashboard/settings/access-management/edit-role/:roleName",
        element: <CreateRole />,
      },
      {
        path: "/dashboard/settings/access-management/create-user",
        element: <CreateUser />,
      },
      {
        path: "/dashboard/settings/access-management/edit-user/:userName",
        element: <CreateUser />,
      },
      {
        path: "/dashboard/support/create",
        element: <CreateTicket />,
      },
      {
        path: "/dashboard/settings/email-sms",
        element: <NotificationSettings />,
      },
      {
        path: "/dashboard/seller-settings/email-sms",
        element: <NotificationSettings />,
      },
      {
        path: "/dashboard/settings/maps",
        element: <MapSettings />,
      },
      {
        path: "/dashboard/seller-settings/maps",
        element: <MapSettings />,
      },
    ],
  },
];
