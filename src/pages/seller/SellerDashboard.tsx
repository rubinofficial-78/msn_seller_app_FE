import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart3, DollarSign, Package, Users, ExternalLink, Settings } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
import { getSellerDashboardCounts,getCategorySalesMatrix, getProductSalesMatrix } from '../../redux/Action/action';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import CustomMonthPicker from '../../components/CustomMonthPicker';
import PieChartComp from '../../components/PieChartComp';
import SimpleBarChart from '../../components/SimpleBarChart';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

// Sample data for the category pie chart
const categoryData = [
  { name: 'Beauty & Personal Care', value: 80 },
  { name: 'Fashion', value: 20 },
  { name: 'Electronics', value: 0 },
  { name: 'F&B', value: 0 },
  { name: 'Pharma', value: 0 },
  { name: 'Home & Decor', value: 0 },
];

// Sample data for the orders bar chart
const orderData = [
  { name: 'Completed', value: 4 },
  { name: 'In Progress', value: 0 },
  { name: 'Accepted', value: 0 },
  { name: 'Cancelled', value: 0 },
  { name: 'Total', value: 4 },
];

const COLORS = ['#4F46E5', '#EC4899', '#8B5CF6', '#10B981', '#F59E0B', '#6366F1'];

const SellerDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const { 
    data: dashboardCounts,
    loading,
    error 
  } = useSelector((state: RootState) => state.data.sellerDashboard || {
    loading: false,
    error: null,
    data: {
      total_customers: 0,
      total_products: 0,
      total_orders: 0
    }
  });

  const { data: categorySalesMatrix, loading: categoryMatrixLoading } = useSelector(
    (state: RootState) => state.data.categorySalesMatrix
  );

  const { data: productSalesMatrix, loading: productMatrixLoading } = useSelector(
    (state: RootState) => state.data.productSalesMatrix
  );

  const handleDateChange = (date: Date) => {
    const startOfMonth = moment(date).startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment(date).endOf("month").format("YYYY-MM-DD");
    const dateParams = { 
      start_date: startOfMonth, 
      end_date: endOfMonth 
    };
    
    // Update both charts
    dispatch(getCategorySalesMatrix(dateParams));
    dispatch(getProductSalesMatrix(dateParams));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        await dispatch(getSellerDashboardCounts());
      } catch (error: any) {
        toast.error(error?.message || 'Failed to fetch dashboard data');
      }
    };

    fetchDashboardData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategorySalesMatrix()); // Initial load without date params
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductSalesMatrix()); // Initial load without date params
  }, [dispatch]);

  return (
    <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isAdmin ? "Seller Admin Dashboard" : "Seller Dashboard"}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {isAdmin 
                ? "Manage your sellers and monitor platform performance"
                : "Fill-up your important data and get started with ONDC"}
            </p>
          </div>
          <button onClick={() => navigate('/dashboard/seller-settings')} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base">
            <Settings size={18} />
            <span>SETTINGS</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center py-4">Loading dashboard data...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-4">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Total Revenue"
            value="₹0"
            icon={<DollarSign className="text-green-600" size={24} />}
            bgColor="bg-green-50"
          />
          <StatCard
            title="Total Orders"
            value={dashboardCounts?.total_orders?.toString() || "0"}
            icon={<Package className="text-blue-600" size={24} />}
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Active Products"
            value={dashboardCounts?.total_products?.toString() || "0"}
            icon={<BarChart3 className="text-orange-600" size={24} />}
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Total Customers"
            value={dashboardCounts?.total_customers?.toString() || "0"}
            icon={<Users className="text-purple-600" size={24} />}
            bgColor="bg-purple-50"
          />
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Category Sales Matrix */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold flex items-center">
              <NewReleasesOutlinedIcon
                sx={{ marginRight: "0.3em", color: "#8668FF" }}
              />
              <div>Category wise sales matrix</div>
            </span>
            <CustomMonthPicker onChange={handleDateChange} />
          </div>
          
          {categoryMatrixLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              Loading chart data...
            </div>
          ) : (
            <PieChartComp
              data={categorySalesMatrix?.categories}
              outerRadius={30}
              innerRadius={50}
            />
          )}
        </div>

        {/* Sales Orders Matrix */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold flex items-center">
              <SupportAgentOutlinedIcon
                sx={{ marginRight: "0.3em", color: "#8668FF" }}
              />
              <div>Sales Orders matrix</div>
            </span>
            <CustomMonthPicker onChange={handleDateChange} />
          </div>
          
          {productMatrixLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              Loading chart data...
            </div>
          ) : (
            <SimpleBarChart
              dataObject={productSalesMatrix}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 sm:gap-4">
      <div className={`p-2 sm:p-3 rounded-lg ${bgColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm text-gray-600">{title}</p>
        <p className="text-lg sm:text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

export default SellerDashboard; 