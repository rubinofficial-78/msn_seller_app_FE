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
        element: <Companies />,
      },
      {
        path: "branches",
        element: <Branches />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "partners",
        element: <Partners />,
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
        element: <Sellers />,
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
        element: <SellerDashboard/>,
      },
    ],
  },
];
