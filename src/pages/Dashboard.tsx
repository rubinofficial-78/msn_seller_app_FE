import React from 'react';
import { Users, ShoppingCart, Store, Package, CheckCircle, Clock, XCircle, RotateCcw } from 'lucide-react';
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
  return (
    <div className="space-y-6">
      {/* Stats Grid - Made it 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Partners"
          value="30"
          icon={Users}
          subStats={[
            {
              icon: <Users className="text-blue-500" size={14} />,
              label: "Active Partners",
              value: "23"
            },
            {
              icon: <Users className="text-orange-500" size={14} />,
              label: "In-Active Partners",
              value: "2"
            }
          ]}
        />
        <StatCard
          title="Total Orders"
          value="2678"
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
          value="1096"
          icon={Store}
          subStats={[
            {
              icon: <Store className="text-blue-500" size={14} />,
              label: "Active Sellers",
              value: "3"
            },
            {
              icon: <Clock className="text-orange-500" size={14} />,
              label: "Pending Approval",
              value: "698"
            },
            {
              icon: <XCircle className="text-red-500" size={14} />,
              label: "Rejected Approval",
              value: "395"
            }
          ]}
        />
        <StatCard
          title="Total Products"
          value="2702"
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