import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, ShoppingCart, Store, Package, CheckCircle, Clock, XCircle, RotateCcw, DollarSign } from 'lucide-react';
import { getDashboardCounts, getSellerCounts, getAffiliatePartnerCounts } from '../redux/Action/action';
import { RootState } from '../redux/types';
import { AppDispatch } from '../redux/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const chartData = [
  {
    name: 'Week 1',
    'Fulfilled Orders': 350,
    'In Progress Orders': 50,
    'Canceled Orders': 100,
  },
  {
    name: 'Week 2',
    'Fulfilled Orders': 250,
    'In Progress Orders': 30,
    'Canceled Orders': 80,
  },
  {
    name: 'Week 3',
    'Fulfilled Orders': 400,
    'In Progress Orders': 45,
    'Canceled Orders': 120,
  },
];

interface SubStat {
  icon: JSX.Element;
  label: string;
  value: string;
}

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ElementType;
  subStats?: SubStat[];
  className?: string;
}

const StatCard = ({ title, value, icon: Icon, subStats = [], className = "bg-white" }: StatCardProps) => (
  <div className={`p-4 rounded-lg shadow-sm ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 text-xs">{title}</p>
        <h3 className="text-2xl font-semibold mt-1">{value}</h3>
      </div>
      {Icon && <Icon className="text-gray-400" size={20} />}
    </div>
    {subStats.length > 0 && (
      <div className="mt-3 space-y-1.5">
        {subStats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-2">
            {stat.icon}
            <span className="text-xs text-gray-600">{stat.label}</span>
            <span className="text-xs font-semibold">{stat.value}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dashboardData, loading: dashboardLoading } = useSelector((state: RootState) => state.data.dashboardCounts);
  const { data: sellerCounts, loading: sellerLoading } = useSelector((state: RootState) => state.data.sellerCounts);
  const { data: affiliatePartnerCounts, loading: affiliateLoading } = useSelector((state: RootState) => state.data.affiliatePartnerCounts);

  useEffect(() => {
    dispatch(getDashboardCounts());
    dispatch(getSellerCounts());
    dispatch(getAffiliatePartnerCounts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Stats Grid - Made it 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Revenue Card */}
        <StatCard
          title="Total Revenue"
          value={`$${dashboardData?.total_revenue._sum.order_amount || 0}`}
          icon={DollarSign}
        />
        
        <StatCard
          title="Total Partners"
          value={affiliatePartnerCounts?.Total.toString() || "0"}
          icon={Users}
          subStats={[
            {
              icon: <Users className="text-blue-500" size={14} />,
              label: "Active Partners",
              value: affiliatePartnerCounts?.Approved.toString() || "0"
            },
            {
              icon: <Clock className="text-orange-500" size={14} />,
              label: "Pending Partners",
              value: affiliatePartnerCounts?.Pending.toString() || "0"
            },
            {
              icon: <XCircle className="text-red-500" size={14} />,
              label: "Rejected Partners",
              value: affiliatePartnerCounts?.Rejected.toString() || "0"
            }
          ]}
        />
        
        <StatCard
          title="Total Orders"
          value={dashboardData?.total_sales_orders.toString() || "0"}
          icon={ShoppingCart}
          subStats={[
            {
              icon: <CheckCircle className="text-green-500" size={14} />,
              label: "Accepted Orders",
              value: "1295"
            },
            {
              icon: <Clock className="text-orange-500" size={14} />,
              label: "In-Progress Orders",
              value: "133"
            },
            {
              icon: <CheckCircle className="text-blue-500" size={14} />,
              label: "Fulfilled Orders",
              value: "775"
            },
            {
              icon: <XCircle className="text-red-500" size={14} />,
              label: "Cancelled Orders",
              value: "466"
            },
            {
              icon: <RotateCcw className="text-purple-500" size={14} />,
              label: "Returned Orders",
              value: "73"
            }
          ]}
        />
        
        <StatCard
          title="Total Sellers"
          value={dashboardData?.total_sellers.toString() || "0"}
          icon={Store}
          subStats={[
            {
              icon: <Store className="text-blue-500" size={14} />,
              label: "Approved Sellers",
              value: sellerCounts?.Approved.toString() || "0"
            },
            {
              icon: <Clock className="text-orange-500" size={14} />,
              label: "Pending Approval",
              value: sellerCounts?.Pending.toString() || "0"
            },
            {
              icon: <XCircle className="text-red-500" size={14} />,
              label: "Rejected Approval",
              value: sellerCounts?.Rejected.toString() || "0"
            }
          ]}
        />
        
        <StatCard
          title="Total Products"
          value={dashboardData?.total_products.toString() || "0"}
          icon={Package}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Order Sales vs seller matrix</h3>
          <div className="text-sm text-gray-600">
            Month: November
          </div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Fulfilled Orders" fill="#93C5FD" />
              <Bar dataKey="In Progress Orders" fill="#FCD34D" />
              <Bar dataKey="Canceled Orders" fill="#FCA5A5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;