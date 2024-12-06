import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface ModulePermission {
  name: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
}

const CreateRole = () => {
  const navigate = useNavigate();
  const { roleName } = useParams();
  const location = useLocation();
  const editRole = location.state?.role;

  const [formData, setFormData] = useState({
    roleName: editRole?.roleName || '',
    roleDescription: editRole?.roleDescription || '',
  });

  const [modulePermissions, setModulePermissions] = useState<ModulePermission[]>(() => {
    if (editRole) {
      // Convert the rolePermissions object to our ModulePermission array format
      return Object.entries(editRole.rolePermissions).map(([name, permissions]) => ({
        name,
        permissions: {
          read: permissions.includes('View'),
          write: permissions.includes('Create & Edit')
        }
      }));
    }
    return [
      { name: 'Product', permissions: { read: false, write: false } },
      { name: 'Order', permissions: { read: false, write: false } },
      { name: 'Support', permissions: { read: false, write: false } },
      { name: 'Sellers', permissions: { read: false, write: false } },
      { name: 'Partners', permissions: { read: false, write: false } },
      { name: 'Logistics', permissions: { read: false, write: false } },
      { name: 'Branches', permissions: { read: false, write: false } },
      { name: 'Payments', permissions: { read: false, write: false } },
    ];
  });

  const handlePermissionChange = (moduleName: string, type: 'read' | 'write') => {
    setModulePermissions(prev => 
      prev.map(module => 
        module.name === moduleName
          ? { ...module, permissions: { ...module.permissions, [type]: !module.permissions[type] } }
          : module
      )
    );
  };

  // Update the header text based on mode
  const headerText = roleName ? 'Edit Role' : 'Create Role';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          id="back-button"
          onClick={() => navigate('/dashboard/settings/access-management')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft id="back-button-icon" size={20} />
        </button>
        <h1 className="text-2xl font-semibold">{headerText}</h1>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Role Basics */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Role Basics</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information is helpful for you to track your user. This information will not be displayed publicly so be careful what you share.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role Name <span className="text-red-500">*</span>
              </label>
              <input
                id="role-name-input"
                type="text"
                value={formData.roleName}
                onChange={(e) => setFormData(prev => ({ ...prev, roleName: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter role name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="role-description-input"
                value={formData.roleDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, roleDescription: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                rows={3}
                placeholder="Enter role description"
              />
            </div>
          </div>
        </div>

        {/* Role Permissions */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-1">Role Permissions</h3>
          <p className="text-sm text-gray-500 mb-4">
            This information is helpful for you to track your user. This information will not be displayed publicly so be careful what you share.
          </p>

          <div className="space-y-4">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Module Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role Permissions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {modulePermissions.map((module) => (
                  <tr key={module.name}>
                    <td className="px-4 py-3">{module.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            id="read-checkbox"
                            type="checkbox"
                            checked={module.permissions.read}
                            onChange={() => handlePermissionChange(module.name, 'read')}
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">Read / View</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            id="write-checkbox"
                            type="checkbox"
                            checked={module.permissions.write}
                            onChange={() => handlePermissionChange(module.name, 'write')}
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm">Create & Edit</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate('/dashboard/settings/access-management')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            id="save-role-button"
            onClick={() => {
              console.log('Save role:', { formData, modulePermissions });
              navigate('/dashboard/settings/access-management');
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {roleName ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRole; 