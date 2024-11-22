import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import VerifyOTP from './pages/auth/VerifyOTP';
import Dashboard from './pages/Dashboard';
import MasterCatalog from './pages/MasterCatalog';
import Companies from './pages/Companies';
import Branches from './pages/Branches';
import Partners from './pages/Partners';
import Sellers from './pages/Sellers';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Payouts from './pages/Payouts';
import Support from './pages/Support';
import Logistics from './pages/Logistics';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="master-catalog" element={<MasterCatalog />} />
            <Route path="companies" element={<Companies />} />
            <Route path="branches" element={<Branches />} />
            <Route path="partners" element={<Partners />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payouts" element={<Payouts />} />
            <Route path="support" element={<Support />} />
            <Route path="logistics" element={<Logistics />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;