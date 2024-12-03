import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users, ShoppingCart, Store, Package, CheckCircle, Clock, XCircle, RotateCcw, IndianRupee, TrendingUp } from 'lucide-react';
import { getDashboardCounts, getSellerCounts, getAffiliatePartnerCounts, getSalesOrdersCount } from '../redux/Action/action';
import { RootState } from '../redux/types';
import { AppDispatch } from '../redux/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data for the charts
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

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

interface SubStat {
  icon: JSX.Element;
  label: string;
  value: string;
  trend?: number;
}

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ElementType;
  subStats?: SubStat[];
  className?: string;
  gradient?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  subStats = [], 
  className = "", 
  gradient = "from-blue-50 to-blue-100"
}: StatCardProps) => (
  <div className={`p-6 rounded-xl shadow-sm bg-gradient-to-br ${gradient} border border-white/50 backdrop-blur-sm ${className}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
      </div>
      {Icon && (
        <div className="p-3 rounded-lg bg-white/80 shadow-sm">
          <Icon className="text-gray-700" size={24} />
        </div>
      )}
    </div>
    {subStats.length > 0 && (
      <div className="mt-4 space-y-2">
        {subStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/60">
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">{stat.value}</span>
              {stat.trend && (
                <span className={`text-xs ${stat.trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
                </span>
              )}
            </div>
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
  const { data: salesOrdersCount, loading: salesOrdersLoading } = useSelector((state: RootState) => state.data.salesOrdersCount);

  useEffect(() => {
    dispatch(getDashboardCounts());
    dispatch(getSellerCounts());
    dispatch(getAffiliatePartnerCounts());
    dispatch(getSalesOrdersCount());
  }, [dispatch]);

  return (
    <div className="space-y-6 p-6 bg-gray-50/30">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-medium">Last Updated:</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${dashboardData?.total_revenue?._sum?.order_amount?.toLocaleString('en-IN') || 0}`}
          icon={IndianRupee}
          gradient="from-emerald-50 to-teal-100"
        />
        
        <StatCard
          title="Total Partners"
          value={affiliatePartnerCounts?.Total.toString() || "0"}
          icon={Users}
          gradient="from-blue-50 to-indigo-100"
          subStats={[
            {
              icon: <Users className="text-blue-600" size={16} />,
              label: "Active Partners",
              value: affiliatePartnerCounts?.Approved.toString() || "0",
              trend: 12
            },
            {
              icon: <Clock className="text-orange-600" size={16} />,
              label: "Pending Partners",
              value: affiliatePartnerCounts?.Pending.toString() || "0",
              trend: -5
            }
          ]}
        />
        
        <StatCard
          title="Total Orders"
          value={salesOrdersCount?.total_orders.toString() || "0"}
          icon={ShoppingCart}
          gradient="from-violet-50 to-purple-100"
          subStats={[
            {
              icon: <CheckCircle className="text-green-600" size={16} />,
              label: "Completed Orders",
              value: salesOrdersCount?.completed.toString() || "0",
              trend: 8
            },
            {
              icon: <XCircle className="text-red-600" size={16} />,
              label: "Cancelled Orders",
              value: salesOrdersCount?.cancelled.toString() || "0",
              trend: -3
            }
          ]}
        />
        
        <StatCard
          title="Total Sellers"
          value={dashboardData?.total_sellers.toString() || "0"}
          icon={Store}
          gradient="from-rose-50 to-pink-100"
          subStats={[
            {
              icon: <Store className="text-blue-600" size={16} />,
              label: "Active Sellers",
              value: sellerCounts?.Approved.toString() || "0",
              trend: 15
            },
            {
              icon: <Clock className="text-orange-600" size={16} />,
              label: "Pending Approval",
              value: sellerCounts?.Pending.toString() || "0",
              trend: -2
            }
          ]}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Order Statistics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Order Statistics</h3>
              <p className="text-sm text-gray-600">Weekly order distribution</p>
            </div>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="Fulfilled Orders" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="In Progress Orders" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Canceled Orders" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Revenue Trend</h3>
              <p className="text-sm text-gray-600">Daily revenue analysis</p>
            </div>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4F46E5" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;