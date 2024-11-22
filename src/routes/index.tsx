import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../pages/auth/Login';
import VerifyOTP from '../pages/auth/VerifyOTP';
import Dashboard from '../pages/Dashboard';
import MasterCatalog from '../pages/MasterCatalog';
import Companies from '../pages/Companies';
import Branches from '../pages/Branches';
import Partners from '../pages/Partners';
import Sellers from '../pages/Sellers';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Payouts from '../pages/Payouts';
import Support from '../pages/Support';
import Logistics from '../pages/Logistics';
import Reports from '../pages/Reports';
import ProtectedRoute from '../components/ProtectedRoute';

export const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/verify-otp',
    element: <VerifyOTP />
  },
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'master-catalog',
        element: <MasterCatalog />
      },
      {
        path: 'companies',
        element: <Companies />
      },
      {
        path: 'branches',
        element: <Branches />
      },
      {
        path: 'partners',
        element: <Partners />
      },
      {
        path: 'sellers',
        element: <Sellers />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'payouts',
        element: <Payouts />
      },
      {
        path: 'support',
        element: <Support />
      },
      {
        path: 'logistics',
        element: <Logistics />
      },
      {
        path: 'reports',
        element: <Reports />
      }
    ]
  }
]; 