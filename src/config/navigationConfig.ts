import { UserRole } from '../types/auth';
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  GitBranch,
  Users,
  Store,
  ShoppingBag,
  ClipboardList,
  Wallet,
  HeadphonesIcon,
  Truck,
  BarChart3,
  Package,
  ShoppingCart,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: any;
  roles: UserRole[];
}

export const navigationConfig: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'AFFILIATE_PARTNER', 'COMPANY_PARTNER', 'COMPANY_BRANCHES', 'COMPANY_PARTNER_USERS'],
  },
  {
    path: '/dashboard/seller-dashboard',
    label: 'Seller Dashboard',
    icon: LayoutDashboard,
    roles: ['SELLER'],
  },
  {
    path: '/dashboard/master-catalog',
    label: 'Master Catalog',
    icon: BookOpen,
    roles: ['ADMIN'],
  },
  {
    path: '/dashboard/companies',
    label: 'Companies',
    icon: Building2,
    roles: ['ADMIN'],
  },
  {
    path: '/dashboard/branches',
    label: 'Branches',
    icon: GitBranch,
    roles: ['ADMIN', 'COMPANY_PARTNER'],
  },
  {
    path: '/dashboard/partners',
    label: 'Partners',
    icon: Users,
    roles: ['ADMIN', 'COMPANY_PARTNER', 'COMPANY_BRANCHES'],
  },
  {
    path: '/dashboard/sellers',
    label: 'Sellers',
    icon: Store,
    roles: ['ADMIN', 'COMPANY_PARTNER', 'COMPANY_BRANCHES', 'AFFILIATE_PARTNER'],
  },
  {
    path: '/dashboard/products',
    label: 'Products',
    icon: ShoppingBag,
    roles: ['ADMIN', 'COMPANY_PARTNER', 'COMPANY_BRANCHES', 'AFFILIATE_PARTNER'],
  },
  {
    path: '/dashboard/my-listings',
    label: 'My Listings',
    icon: Package,
    roles: ['SELLER'],
  },
  {
    path: '/dashboard/orders',
    label: 'Orders',
    icon: ClipboardList,
    roles: ['ADMIN', 'COMPANY_PARTNER', 'COMPANY_BRANCHES', 'AFFILIATE_PARTNER'],
  },
  {
    path: '/dashboard/my-orders',
    label: 'My Orders',
    icon: ShoppingCart,
    roles: ['SELLER'],
  },
  {
    path: '/dashboard/payouts',
    label: 'Payouts',
    icon: Wallet,
    roles: ['ADMIN'],
  },
  {
    path: '/dashboard/support',
    label: 'Support',
    icon: HeadphonesIcon,
    roles: ['ADMIN', 'COMPANY_PARTNER', 'COMPANY_BRANCHES', 'AFFILIATE_PARTNER', 'SELLER'],
  },
  {
    path: '/dashboard/logistics',
    label: 'Logistics',
    icon: Truck,
    roles: ['ADMIN', 'COMPANY_PARTNER', 'COMPANY_BRANCHES', 'AFFILIATE_PARTNER', 'SELLER'],
  },
  {
    path: '/dashboard/reports',
    label: 'Reports',
    icon: BarChart3,
    roles: ['ADMIN'],
  },
];

export const settingsConfig = {
  ADMIN: [
    { path: '/dashboard/settings/account-details', label: 'Account Details' },
    { path: '/dashboard/settings/banking-details', label: 'Bank & Business Details' },
    { path: '/dashboard/settings/access-management', label: 'Access Management' },
    { path: '/dashboard/settings/email-sms', label: 'Email & SMS Services' },
    { path: '/dashboard/settings/maps', label: 'Map Services' },
    { path: '/dashboard/settings/ui-config', label: 'UI Configuration' },
  ],
  SELLER: [
    { path: '/dashboard/settings/account-details', label: 'Account Details' },
    { path: '/dashboard/settings/banking-details', label: 'Bank & Business Details' },
    { path: '/dashboard/settings/location-services', label: 'Location & Servicability' },
  ],
}; 