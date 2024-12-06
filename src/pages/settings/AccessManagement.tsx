import React, { useState } from 'react';
import { Search, Plus, Edit, Users, UserCheck } from 'lucide-react';
import CustomTable from '../../components/CustomTable';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface User {
  userName: string;
  contactInfo: {
    mobile: string;
    email: string;
  };
  roles: string;
  modules: string[];
  status: 'Active' | 'Inactive';
}

interface Role {
  roleName: string;
  roleDescription: string;
  rolePermissions: {
    [key: string]: string[];
  };
  modulesAllowed: number;
  usersUsing: number;
}

const AccessManagement = () => {
  const [activeTab, setActiveTab] = useState('All users');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([
    {
      userName: 'Sample',
      contactInfo: {
        mobile: '7569316676',
        email: 'sampleseller@gmail.com'
      },
      roles: 'SELLER',
      modules: [
        'Logistics', 'Support', 'Product', 'Sellers', 'Role', 'Users', 'Partners',
        'Company', 'Reports', 'CommonSettings', 'Branches', 'Order', 'Payments',
        'Subscription'
      ],
      status: 'Active'
    },
    {
      userName: 'test',
      contactInfo: {
        mobile: '9876543234',
        email: 'shiva@adya.ai'
      },
      roles: 'SELLER',
      modules: [
        'Logistics', 'Support', 'Product', 'Sellers', 'Role', 'Users', 'Partners',
        'Company', 'Reports', 'CommonSettings', 'Branches', 'Order', 'Payments',
        'Subscription'
      ],
      status: 'Active'
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      roleName: "COMPANY_PARTNER_USERS",
      roleDescription: "Responsible for managing branches, roles, partners, sellers, products, orders, support, and logistics. They oversee branch operations and ensure smooth coordination with partners.",
      rolePermissions: {
        "Product": ["View"],
        "Order": ["View"],
        "Support": ["View"],
        "Sellers": ["View"],
        "Partners": ["View"],
        "Logistics": ["View"],
        "Branches": ["View", "Delete"],
        "Payments": ["View"]
      },
      modulesAllowed: 8,
      usersUsing: 6
    },
    {
      roleName: "AFFILIATE_PARTNER",
      roleDescription: "Manages sellers, products, orders, support, and logistics for their partnerships. Ensures smooth operations between sellers and end customers.",
      rolePermissions: {
        "Sellers": ["View", "Create & Edit"],
        "Logistics": ["View"],
        "Order": ["View"],
        "Support": ["View"],
        "Role": ["View"],
        "Users": ["View"],
        "Reports": ["View"]
      },
      modulesAllowed: 9,
      usersUsing: 30
    }
  ]);

  const navigate = useNavigate();

  const tableColumns = [
    {
      id: 'userName',
      key: 'userName',
      label: 'User Name',
      minWidth: 150
    },
    {
      id: 'contactInfo',
      key: ['contactInfo.mobile', 'contactInfo.email'],
      label: 'Contact Info',
      minWidth: 200,
      join: true,
      join_type: 'multiline'
    },
    {
      id: 'roles',
      key: 'roles',
      label: 'Roles',
      minWidth: 120
    },
    {
      id: 'modules',
      key: 'modules',
      label: 'Modules',
      minWidth: 400,
      renderCell: (row: User) => (
        <div className="flex flex-wrap gap-1">
          {row.modules.map((module, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded"
            >
              {module}
            </span>
          ))}
        </div>
      )
    },
    {
      id: 'status',
      key: 'status',
      label: 'Status',
      minWidth: 120,
      type: 'status_toggle'
    },
    {
      id: 'action',
      key: 'action',
      label: 'Action',
      minWidth: 100,
      type: 'custom',
      renderCell: (row: User) => (
        <button 
          id="edit-user-button"
          onClick={(e) => {
            e.stopPropagation();
            handleEditUser(row);
          }}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Edit size={18} />
        </button>
      )
    }
  ];

  const roleTableColumns = [
    {
      id: 'roleName',
      key: 'roleName',
      label: 'Role Name',
      minWidth: 200
    },
    {
      id: 'roleDescription',
      key: 'roleDescription',
      label: 'Role Description',
      minWidth: 300
    },
    {
      id: 'rolePermissions',
      key: 'rolePermissions',
      label: 'Role Permissions',
      minWidth: 300,
      type: 'custom',
      renderCell: (row: Role) => (
        <div className="flex flex-wrap gap-2">
          {Object.entries(row.rolePermissions).map(([module, permissions], index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-600">{module}</span>
              <span className="text-gray-400 mx-1">-</span>
              <span className="text-blue-600">{permissions.join(', ')}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'modulesAllowed',
      key: 'modulesAllowed',
      label: 'Modules Allowed',
      minWidth: 150,
      type: 'number'
    },
    {
      id: 'usersUsing',
      key: 'usersUsing',
      label: 'Users Using',
      minWidth: 150,
      type: 'number'
    },
    {
      id: 'action',
      key: 'action',
      label: 'Action',
      minWidth: 100,
      type: 'custom',
      renderCell: (row: Role) => (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleEditRole(row);
          }}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Edit size={18} />
        </button>
      )
    }
  ];

  const handleStatusToggle = (row: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.userName === row.userName
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  const handleEditRole = (role: Role) => {
    navigate(`/dashboard/settings/access-management/edit-role/${role.roleName}`, {
      state: { role }
    });
  };

  const handleEditUser = (user: User) => {
    navigate(`/dashboard/settings/access-management/edit-user/${user.userName}`, {
      state: { user }
    });
  };

  return (
    <div className="space-y-4">
      
      {/* Enhanced Stats Display */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600 font-medium">Total Users</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              ALL
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900">1242</span>
            <span className="text-xs text-gray-500 ml-1">users</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-green-600 font-medium">Active Users</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600 border border-green-200">
              ACTIVE
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-green-600">1232</span>
            <span className="text-xs text-gray-500 ml-1">users</span>
          </div>
        </div>
      </div>
      

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
        <button
            id="back-button"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          {['All users', 'Roles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'Roles' ? (
        <>
          {/* Search and Actions for Roles */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="search-role-input"
                type="text"
                placeholder="Search by Role Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            
          </div>

          {/* Roles Table */}
          <div className="bg-white rounded-lg shadow">
            <CustomTable
              headCells={roleTableColumns as Column[]}
              data={roles}
              pagination={true}
              meta_data={{
                total: roles.length,
                per_page: 10,
                current_page: 1,
                last_page: 1,
                from: 1,
                to: roles.length
              }}
            />
          </div>
        </>
      ) : (
        <>
          {/* Search and Actions */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="search-user-input"
                type="text"
                placeholder="Search by User Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            <CustomTable
              headCells={tableColumns}
              data={users}
              pagination={true}
              meta_data={{
                total: users.length,
                per_page: 10,
                current_page: 1,
                last_page: 1,
                from: 1,
                to: users.length
              }}
              onStatusToggle={handleStatusToggle}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AccessManagement; 