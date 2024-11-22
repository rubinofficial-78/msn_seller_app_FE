import { RouteObject } from 'react-router-dom';
import Login from '../pages/auth/Login';
import VerifyOTP from '../pages/auth/VerifyOTP';
import Orders from '../pages/Orders';
import Partners from '../pages/Partners';
import Payouts from '../pages/Payouts';
import Products from '../pages/Products';
import Reports from '../pages/Reports';
import Sellers from '../pages/Sellers';
import Support from '../pages/Support';
import DashboardLayout from '../components/layouts/DashboardLayout';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOTP />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Orders />,
      },
      {
        path: 'partners',
        element: <Partners />,
      },
      {
        path: 'payouts',
        element: <Payouts />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'reports',
        element: <Reports />,
      },
      {
        path: 'sellers',
        element: <Sellers />,
      },
      {
        path: 'support',
        element: <Support />,
      }
    ]
  }
]; 