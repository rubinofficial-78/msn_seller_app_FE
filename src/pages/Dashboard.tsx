import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  ShoppingCart,
  Store,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  IndianRupee,
  TrendingUp,
} from "lucide-react";
import {
  getDashboardCounts,
  getSellerCounts,
  getAffiliatePartnerCounts,
  getSalesOrdersCount,
} from "../redux/Action/action";
import { RootState } from "../redux/types";
import { AppDispatch } from "../redux/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import GLOBAL_CONSTANTS, { useGlobalConstants } from "../GlobalConstants";
// Sample data for the charts
const chartData = [
  {
    name: 'Week 1',
    Completed: 350,
    'In Progress': 50,
    Cancelled: 100,
  },
  {
    name: 'Week 2',
    Completed: 250,
    'In Progress': 30,
    Cancelled: 80,
  },
  {
    name: 'Week 3',
    Completed: 400,
    'In Progress': 45,
    Cancelled: 120,
  },
  {
    name: 'Week 4',
    Completed: 380,
    'In Progress': 40,
    Cancelled: 90,
  }
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
  gradient = "from-blue-50 to-blue-100",
}: StatCardProps) => (
  <div
    className={`p-4 sm:p-6 rounded-xl shadow-sm bg-gradient-to-br ${gradient} border border-white/50 backdrop-blur-sm ${className}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-600 font-medium text-sm sm:text-base">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold mt-2">{value}</h3>
      </div>
      {Icon && (
        <div className="p-2 sm:p-3 rounded-lg bg-white/80 shadow-sm">
          <Icon className="text-gray-700" size={20} />
        </div>
      )}
    </div>
    {subStats.length > 0 && (
      <div className="mt-4 space-y-2">
        {subStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-white/60"
          >
            <div className="flex items-center space-x-2">
              {stat.icon}
              <span className="text-xs sm:text-sm text-gray-600">
                {stat.label}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-semibold">
                {stat.value}
              </span>
              {stat.trend && (
                <span
                  className={`text-xs ${
                    stat.trend > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend > 0 ? "↑" : "↓"} {Math.abs(stat.trend)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

console.log("Global Constants:", GLOBAL_CONSTANTS.userType);

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dashboardData, loading: dashboardLoading } = useSelector(
    (state: RootState) => state.data.dashboardCounts
  );
  const { data: sellerCounts, loading: sellerLoading } = useSelector(
    (state: RootState) => state.data.sellerCounts
  );
  const { data: affiliatePartnerCounts, loading: affiliateLoading } =
    useSelector((state: RootState) => state.data.affiliatePartnerCounts);
  const { data: salesOrdersCount, loading: salesOrdersLoading } = useSelector(
    (state: RootState) => state.data.salesOrdersCount
  );

  useEffect(() => {
    dispatch(getDashboardCounts());
    dispatch(getSellerCounts());
    dispatch(getAffiliatePartnerCounts());
    dispatch(getSalesOrdersCount());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
            Dashboard Overview
          </h1>
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
            <span className="font-medium">Last Updated:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`₹${
              dashboardData?.total_revenue?._sum?.order_amount?.toLocaleString(
                "en-IN"
              ) || 0
            }`}
            icon={IndianRupee}
            gradient="from-emerald-50 to-teal-100"
          />

          <StatCard
            title="Total Partners"
            value={affiliatePartnerCounts?.Total.toString()}
            icon={Users}
            gradient="from-blue-50 to-indigo-100"
            subStats={[
              {
                icon: <Users className="text-blue-600" size={16} />,
                label: "Active Partners",
                value: affiliatePartnerCounts?.Approved.toString(),
                trend: 12,
              },
              {
                icon: <Clock className="text-orange-600" size={16} />,
                label: "Pending Partners",
                value: affiliatePartnerCounts?.Pending.toString(),
                trend: -5,
              },
            ]}
          />

          <StatCard
            title="Total Orders"
            value={salesOrdersCount?.total_orders.toString()}
            icon={ShoppingCart}
            gradient="from-violet-50 to-purple-100"
            subStats={[
              {
                icon: <CheckCircle className="text-green-600" size={16} />,
                label: "Completed Orders",
                value: salesOrdersCount?.completed.toString(),
                trend: 8,
              },
              {
                icon: <XCircle className="text-red-600" size={16} />,
                label: "Cancelled Orders",
                value: salesOrdersCount?.cancelled.toString(),
                trend: -3,
              },
            ]}
          />

          <StatCard
            title="Total Sellers"
            value={dashboardData?.total_sellers.toString()}
            icon={Store}
            gradient="from-rose-50 to-pink-100"
            subStats={[
              {
                icon: <Store className="text-blue-600" size={16} />,
                label: "Active Sellers",
                value: sellerCounts?.Approved.toString(),
                trend: 15,
              },
              {
                icon: <Clock className="text-orange-600" size={16} />,
                label: "Pending Approval",
                value: sellerCounts?.Pending.toString(),
                trend: -2,
              },
            ]}
          />
        </div>

        {/* Make the chart section full width */}
        <div className="w-full">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order Statistics</h3>
                <p className="text-sm text-gray-500 mt-1">Weekly order distribution</p>
              </div>
              <select className="mt-2 sm:mt-0 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>This Week</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
              </select>
            </div>
            
            {/* Increase chart height and add better styling */}
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                  barGap={8}
                  barSize={32}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis 
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      padding: '12px',
                    }}
                    labelStyle={{ color: '#111827', fontWeight: 600, marginBottom: '4px' }}
                    itemStyle={{ color: '#6B7280', fontSize: '12px', padding: '4px 0' }}
                  />
                  <Legend 
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{
                      paddingBottom: '20px',
                    }}
                  />
                  <Bar 
                    dataKey="Completed" 
                    fill="#10B981" // Green
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="In Progress" 
                    fill="#6366F1" // Indigo
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="Cancelled" 
                    fill="#F43F5E" // Rose
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Summary section below chart */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Completed Orders</p>
                <p className="text-2xl font-semibold text-emerald-600 mt-1">
                  {chartData.reduce((sum, item) => sum + item.Completed, 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold text-indigo-600 mt-1">
                  {chartData.reduce((sum, item) => sum + item['In Progress'], 0)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500">Cancelled</p>
                <p className="text-2xl font-semibold text-rose-600 mt-1">
                  {chartData.reduce((sum, item) => sum + item.Cancelled, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
