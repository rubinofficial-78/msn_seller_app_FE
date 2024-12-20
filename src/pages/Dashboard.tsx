import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  getSellerMatrix,
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
import moment from "moment";
import CustomMonthPicker from "../components/CustomMonthPicker";
import StackedBarChart from "../components/StackedBarChart";
// Sample data for the charts
const chartData = [
  {
    name: "Week 1",
    Completed: 350,
    "In Progress": 50,
    Cancelled: 100,
  },
  {
    name: "Week 2",
    Completed: 250,
    "In Progress": 30,
    Cancelled: 80,
  },
  {
    name: "Week 3",
    Completed: 400,
    "In Progress": 45,
    Cancelled: 120,
  },
  {
    name: "Week 4",
    Completed: 380,
    "In Progress": 40,
    Cancelled: 90,
  },
];

interface SubStat {
  icon: JSX.Element;
  label: string;
  value: string;
  trend?: number;
  onClick?: () => void;
}

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ElementType;
  iconId?: string;
  subStats?: SubStat[];
  className?: string;
  gradient?: string;
  onClick?: () => void;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  iconId,
  subStats = [],
  className = "",
  gradient = "from-blue-50 to-blue-100",
  onClick,
}: StatCardProps) => (
  <div
    className={`p-4 sm:p-6 rounded-xl shadow-sm bg-gradient-to-br ${gradient} border border-white/50 backdrop-blur-sm ${className} ${
      onClick
        ? "cursor-pointer hover:shadow-md transition-all duration-200"
        : ""
    }`}
    onClick={onClick}
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
          <Icon uid={iconId} className="text-gray-700" size={20} />
        </div>
      )}
    </div>
    {subStats.length > 0 && (
      <div className="mt-4 space-y-2">
        {subStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-white/60 cursor-pointer hover:bg-white/80"
            onClick={(e) => {
              e.stopPropagation();
              stat.onClick && stat.onClick();
            }}
          >
            <div className="flex items-center space-x-2">
              {React.cloneElement(stat.icon as React.ReactElement, {
                uid: `${iconId}-substat-${index}`,
              })}
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
  const { data: sellerMatrix, loading: sellerMatrixLoading } = useSelector(
    (state: RootState) => state.data.sellerMatrix
  );
  const navigate = useNavigate();

  const handleDateChange = (date: Date) => {
    const startOfMonth = moment(date).startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment(date).endOf("month").format("YYYY-MM-DD");
    dispatch(
      getSellerMatrix({
        start_date: startOfMonth,
        end_date: endOfMonth,
      })
    );
  };

  // Initial load of seller matrix data
  useEffect(() => {
    const today = new Date();
    const startOfMonth = moment(today).startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment(today).endOf("month").format("YYYY-MM-DD");
    dispatch(
      getSellerMatrix({
        start_date: startOfMonth,
        end_date: endOfMonth,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDashboardCounts());
    dispatch(getSellerCounts());
    dispatch(getAffiliatePartnerCounts());
    dispatch(getSalesOrdersCount());
  }, [dispatch]);

  // Update the Orders card click handlers
  const handleOrdersClick = () => {
    navigate("/dashboard/orders");
  };

  const handleCompletedOrdersClick = () => {
    navigate("/dashboard/orders?status=COMPLETED");
  };

  const handleCancelledOrdersClick = () => {
    navigate("/dashboard/orders?status=CANCELLED");
  };

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
            iconId="dashboard-revenue-icon"
            gradient="from-emerald-50 to-teal-100"
            onClick={() => navigate("/dashboard/payouts")}
          />

          <StatCard
            title="Total Partners"
            value={affiliatePartnerCounts?.Total.toString()}
            icon={Users}
            iconId="dashboard-partners-icon"
            gradient="from-blue-50 to-indigo-100"
            onClick={() => navigate("/dashboard/partners")}
            subStats={[
              {
                icon: <Users className="text-blue-600" size={16} />,
                label: "Active Partners",
                value: affiliatePartnerCounts?.Approved.toString(),
                trend: 12,
                onClick: () => {
                  const searchParams = new URLSearchParams();
                  searchParams.set("status", "APPROVED");
                  navigate(`/dashboard/partners?${searchParams.toString()}`);
                },
              },
              {
                icon: <Clock className="text-orange-600" size={16} />,
                label: "Pending Partners",
                value: affiliatePartnerCounts?.Pending.toString(),
                trend: -5,
                onClick: () => {
                  const searchParams = new URLSearchParams();
                  searchParams.set("status", "PENDING");
                  navigate(`/dashboard/partners?${searchParams.toString()}`);
                },
              },
            ]}
          />

          <StatCard
            title="Total Orders"
            value={salesOrdersCount?.total_orders.toString()}
            icon={ShoppingCart}
            iconId="dashboard-orders-icon"
            gradient="from-violet-50 to-purple-100"
            onClick={handleOrdersClick}
            subStats={[
              {
                icon: <CheckCircle className="text-green-600" size={16} />,
                label: "Completed Orders",
                value: salesOrdersCount?.completed.toString(),
                trend: 8,
                onClick: handleCompletedOrdersClick,
              },
              {
                icon: <XCircle className="text-red-600" size={16} />,
                label: "Cancelled Orders",
                value: salesOrdersCount?.cancelled.toString(),
                trend: -3,
                onClick: handleCancelledOrdersClick,
              },
            ]}
          />

          <StatCard
            title="Total Sellers"
            value={dashboardData?.total_sellers.toString()}
            icon={Store}
            iconId="dashboard-sellers-icon"
            gradient="from-rose-50 to-pink-100"
            onClick={() => navigate("/dashboard/sellers")}
            subStats={[
              {
                icon: <Store className="text-blue-600" size={16} />,
                label: "Active Sellers",
                value: sellerCounts?.Approved.toString(),
                trend: 15,
                onClick: () => {
                  const searchParams = new URLSearchParams();
                  searchParams.set("status", "APPROVED");
                  navigate(`/dashboard/sellers?${searchParams.toString()}`);
                },
              },
              {
                icon: <Clock className="text-orange-600" size={16} />,
                label: "Pending Approval",
                value: sellerCounts?.Pending.toString(),
                trend: -2,
                onClick: () => {
                  const searchParams = new URLSearchParams();
                  searchParams.set("status", "PENDING");
                  navigate(`/dashboard/sellers?${searchParams.toString()}`);
                },
              },
            ]}
          />
        </div>

        {/* Replace the existing chart section with this */}
        <div className="w-full mt-6">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Order Sales vs Seller Matrix
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Monthly order distribution by seller
                </p>
              </div>
              <CustomMonthPicker onChange={handleDateChange} />
            </div>

            <div className="h-[400px]">
              {sellerMatrixLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading chart data...</p>
                </div>
              ) : sellerMatrix && sellerMatrix.length > 0 ? (
                <StackedBarChart memoizedData={sellerMatrix} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>No data available for the selected period</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
