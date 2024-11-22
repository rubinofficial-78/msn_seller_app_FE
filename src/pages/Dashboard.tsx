import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Users,
  UserCheck,
  ShoppingBag,
  DollarSign,
  ClipboardList,
} from 'lucide-react';
import Card from '../components/Card';

const data = [
  { name: 'Jan', completed: 400, inProgress: 240 },
  { name: 'Feb', completed: 300, inProgress: 139 },
  { name: 'Mar', completed: 200, inProgress: 980 },
  { name: 'Apr', completed: 278, inProgress: 390 },
  { name: 'May', completed: 189, inProgress: 480 },
  { name: 'Jun', completed: 239, inProgress: 380 },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <Card
          title="Partners"
          value="1,234"
          icon={<Users size={24} />}
          trend={{ value: 12, isPositive: true }}
        />
        <Card
          title="Sellers"
          value="5,678"
          icon={<UserCheck size={24} />}
          trend={{ value: 8, isPositive: true }}
        />
        <Card
          title="Products"
          value="23,456"
          icon={<ShoppingBag size={24} />}
          trend={{ value: 5, isPositive: true }}
        />
        <Card
          title="Revenue"
          value="₹1.2M"
          icon={<DollarSign size={24} />}
          trend={{ value: 15, isPositive: true }}
        />
        <Card
          title="Orders"
          value="3,456"
          icon={<ClipboardList size={24} />}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sellers vs Orders
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" name="Completed" fill="#4F46E5" />
              <Bar dataKey="inProgress" name="In Progress" fill="#818CF8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;