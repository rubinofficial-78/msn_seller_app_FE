import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Edit, Users, UserCheck } from "lucide-react";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getUsers, getUserCounts, getRoles } from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import { AppDispatch } from "../../redux/store";

const AccessManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All users");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [roleCurrentPage, setRoleCurrentPage] = useState(1);
  const [rolePerPage] = useState(10);

  const {
    data: users,
    loading,
    meta,
  } = useSelector((state: RootState) => state.data.users);
  
  // Add default values for userCounts
  const { userCounts = { loading: false, error: null, total: 0, active: 0 } } = useSelector((state: RootState) => state.data);

  const { data: roles, loading: rolesLoading, meta: rolesMeta } = useSelector(
    (state: RootState) => state.data.roles
  );

  // Initial data fetch
  useEffect(() => {
    fetchUsers(currentPage);
  }, [dispatch, currentPage]);

  // Function to fetch users with pagination
  const fetchUsers = (page: number) => {
    dispatch(
      getUsers({
        page_no: page,
        per_page: perPage,
      })
    );
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      dispatch(
        getUsers({
          page_no: 1,
          per_page: perPage,
          search: searchQuery,
        })
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, dispatch, perPage]);

  // Fetch counts when component mounts
  useEffect(() => {
    // Fetch total users count
    dispatch(getUserCounts());
    // Fetch active users count
    dispatch(getUserCounts("Active"));
  }, [dispatch]);

  // Add useEffect for fetching roles
  useEffect(() => {
    if (activeTab === 'Roles') {
      dispatch(getRoles({ page_no: roleCurrentPage, per_page: rolePerPage }));
    }
  }, [dispatch, activeTab, roleCurrentPage, rolePerPage]);

  const tableColumns = [
    {
      id: "name",
      key: "name",
      label: "User Name",
      minWidth: 150,
      renderCell: (row: any) => <span>{row.name || row.email}</span>,
    },
    {
      id: "contactInfo",
      key: ["mobile_number", "email"],
      label: "Contact Info",
      minWidth: 200,
      join: true,
      join_type: "multiline",
    },
    {
      id: "roles",
      key: "core_user_user_in_role",
      label: "Roles",
      minWidth: 120,
      type: "custom",
      renderCell: (row: any) => {
        const roles = row.core_user_user_in_role
          ?.map((role: any) => role.role_user_in_role?.name)
          .filter(Boolean);
        return <span>{roles?.join(", ") || "-"}</span>;
      },
    },
    {
      id: "modules",
      key: "core_user_user_in_role",
      label: "Modules",
      minWidth: 400,
      type: "custom",
      renderCell: (row: any) => {
        const modules =
          row.core_user_user_in_role?.[0]?.role_user_in_role?.role_role_assign_module
            ?.map((module: any) => module.module_master?.name)
            .filter(Boolean);

        return (
          <div className="flex flex-wrap gap-1">
            {modules?.map((module: string, index: number) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded"
              >
                {module}
              </span>
            )) || "-"}
          </div>
        );
      },
    },
    {
      id: "status",
      key: "is_active",
      label: "Status",
      minWidth: 120,
      type: "custom",
      renderCell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      id: "action",
      key: "action",
      label: "Action",
      minWidth: 100,
      type: "custom",
      renderCell: (row: any) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEditUser(row);
          }}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <Edit size={18} />
        </button>
      ),
    },
  ];

  const roleTableColumns = [
    {
      id: "name",
      key: "name",
      label: "Role Name",
      minWidth: 150,
    },
    {
      id: "description",
      key: "description",
      label: "Description",
      minWidth: 300,
    },
    {
      id: "modules",
      key: "role_role_assign_module",
      label: "Modules",
      minWidth: 400,
      type: "custom",
      renderCell: (row: any) => {
        const modules = row.role_role_assign_module?.map(
          (module: any) => module.module_master?.name
        ).filter(Boolean);

        return (
          <div className="flex flex-wrap gap-1">
            {modules?.map((module: string, index: number) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded"
              >
                {module}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      id: "users",
      key: "user_counts",
      label: "Users",
      minWidth: 100,
      type: "custom",
      renderCell: (row: any) => (
        <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
          {row.user_counts} users
        </span>
      ),
    },
    {
      id: "status",
      key: "is_active",
      label: "Status",
      minWidth: 100,
      type: "custom",
      renderCell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.is_active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleStatusToggle = (row: any) => {
    // Implement status toggle logic
    console.log("Toggle status for:", row);
  };

  const handleEditUser = (user: any) => {
    navigate(`/dashboard/settings/access-management/edit-user/${user.id}`, {
      state: { user },
    });
  };

  return (
    <div className="space-y-4">
      {/* Stats Display */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600 font-medium">
              Total Users
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              ALL
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900">
              {userCounts?.total || 0}
            </span>
            <span className="text-xs text-gray-500 ml-1">users</span>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3 transition-all hover:shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-green-600 font-medium">
              Active Users
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600 border border-green-200">
              ACTIVE
            </span>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-green-600">
              {userCounts?.active || 0}
            </span>
            <span className="text-xs text-gray-500 ml-1">users</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            id="back-button"
            onClick={() => navigate('/dashboard/settings')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          {["All users", "Roles"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Table */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by User Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {activeTab === 'Roles' ? (
        <div className="bg-white rounded-lg shadow">
          <CustomTable
            headCells={roleTableColumns}
            data={roles}
            loading={rolesLoading}
            pagination={true}
            meta_data={rolesMeta}
            onPageChange={setRoleCurrentPage}
            currentPage={roleCurrentPage}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <CustomTable
            headCells={tableColumns}
            data={users}
            loading={loading}
            pagination={true}
            meta_data={meta}
            onStatusToggle={handleStatusToggle}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AccessManagement;
