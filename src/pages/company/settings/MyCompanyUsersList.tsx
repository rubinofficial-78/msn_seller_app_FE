import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import CustomTable from "../../../components/CustomTable";
import Modal from "../../../components/Modal";
import AddForm from "../../../components/AddForm";
import { getCompanyUsers, createCompanyUser } from "../../../redux/Action/action";
import GLOBAL_CONSTANTS from "../../../GlobalConstants";
import { RootState } from "../../../redux/types";
import { toast } from "react-toastify";

const MyCompanyUsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    role: ''
  });

  const { data: users, loading, error, meta } = useSelector((state: RootState) => state.data.companyUsers);

  useEffect(() => {
    fetchUsers();
  }, [dispatch, currentPage, searchTerm]);

  const fetchUsers = () => {
    const params = {
      page: currentPage,
      per_page: 10,
      search: searchTerm,
      company_id: GLOBAL_CONSTANTS.company_id
    };
    dispatch(getCompanyUsers(params));
  };

  const headCells = [
    {
      id: 'company_name',
      key: 'company_name',
      label: 'Company name',
      minWidth: 150
    },
    {
      id: 'name',
      key: 'name',
      label: 'Name',
      minWidth: 150
    },
    {
      id: 'email',
      key: 'email',
      label: 'Email',
      minWidth: 200
    },
    {
      id: 'mobile_number',
      key: 'mobile_number',
      label: 'Mobile Number',
      minWidth: 150
    },
    {
      id: 'createdAt',
      key: 'createdAt',
      label: 'Created Date',
      type: 'custom',
      minWidth: 150,
      renderCell: (row: any) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      )
    },
    {
      id: 'status',
      key: 'status',
      label: 'Status',
      type: 'status',
      minWidth: 120
    },
    {
      id: 'actions',
      key: 'actions',
      label: 'Action',
      type: 'actions',
      minWidth: 100,
      actions: [
        {
          icon: 'edit',
          label: 'Edit',
          onClick: (row: any) => handleEdit(row)
        },
        {
          icon: 'delete',
          label: 'Delete',
          onClick: (row: any) => handleDelete(row.id)
        }
      ]
    }
  ];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddUser = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.mobile) {
        toast.error('Please fill all required fields');
        return;
      }

      // Prepare payload
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile_number: formData.mobile,
        user_company_id: GLOBAL_CONSTANTS.company_id
      };

      // Call create API
      await dispatch(createCompanyUser(payload));
      
      // Show success message
      toast.success('User created successfully');
      
      // Close modal and reset form
      setShowAddModal(false);
      setFormData({ name: '', email: '', mobile: '', role: '' });
      
      // Refresh users list
      fetchUsers();
    } catch (error) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleEdit = (user: any) => {
    // Handle edit user
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: string) => {
    // Handle delete user
    console.log('Delete user:', userId);
  };

  const addUserFormFields = [
    {
      type: "section",
      label: "Company User Basics Details",
      description: "This information represents user basic details which is useful for identification of a user"
    },
    {
      type: "text",
      key: "name",
      label: "Name",
      required: true,
      value: formData.name,
      placeholder: "Name",
      required: true  
    },
    {
      type: "text",
      key: "mobile",
      label: "Mobile Number",
      required: true,
      value: formData.mobile,
      placeholder: "Mobile Number",
      required: true
    },
    {
      type: "email",
      key: "email",
      label: "Email",
      required: true,
      value: formData.email,
      placeholder: "Email",
      required: true
    }
  ];

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard/company-settings")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Company Users</h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 flex items-center gap-2"
        >
          <Plus size={20} />
          ADD
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search by Name / Email / Mobile"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="bg-white rounded-lg">
        <CustomTable
          headCells={headCells}
          data={users || []}
          meta_data={meta}
          setParams={handlePageChange}
          pagination={true}
        />
      </div>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create Company User"
      >
        <div className="p-6">
          <AddForm
            data={addUserFormFields}
            handleInputonChange={handleInputChange}
          />
          <div className="flex justify-end mt-6">
            <button
              onClick={handleAddUser}
              className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800"
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyCompanyUsersList; 