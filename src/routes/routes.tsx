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
import CreateCompany from '../components/CreateCompany';
import CreateBranch from '../components/CreateBranch';
import ViewBranch from '../pages/ViewBranch';
import EditBranch from '../pages/EditBranch';
import ViewCompany from '../pages/ViewCompany';
import EditCompany from '../pages/EditCompany';
import CreatePartner from '../components/CreatePartner';
import AddSeller from '../components/AddSeller';
import SellerOnboarding from '../components/SellerOnboarding';
// import ViewPartner from '../components/ViewPartner';
// import EditPartner from '../components/EditPartner';

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
    path: "/sellers/onboarding",
    element: <SellerOnboarding />
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
        element: (
          <ProtectedRoute allowedRoles={["SELLER_ADMIN"]}>
            <MasterCatalog />
          </ProtectedRoute>
        ),
      },
      {
        path: "companies",
        children: [
          {
            index: true,
            element: <Companies />
          },
          {
            path: "create",
            element: <CreateCompany />
          },
          {
            path: "view/:id",
            element: <ViewCompany />
          },
          {
            path: "edit/:id",
            element: <EditCompany />
          }
        ]
      },
      {
        path: "branches",
        children: [
          {
            index: true,
            element: <Branches />
          },
          {
            path: "create",
            element: <CreateBranch />
          },
          {
            path: "view/:id",
            element: <ViewBranch />
          },
          {
            path: "edit/:id",
            element: <EditBranch />
          }
        ]
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
            element: <Partners />
          },
          {
            path: "create",
            element: <CreatePartner />
          },
          // {
          //   path: "view/:id",
          //   element: <ViewPartner />
          // },
          // {
          //   path: "edit/:id",
          //   element: <EditPartner />
          // }
        ]
      },
      {
        path: "payouts",
        element: <Payouts />,
      },
      {
        path: "products",
        element: <Products />,
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
            element: <Sellers />
          },
          {
            path: "add",
            element: <AddSeller />
          },
          {
            path: "onboarding",
            element: <SellerOnboarding />
          }
        ]
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
        path: "settings/location-services",
        element: <LocationServices />,
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
    ],
  },
];
