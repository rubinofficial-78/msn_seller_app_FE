import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBranchById, getCompanyDropdown } from "../redux/Action/action";
import { AppDispatch } from "../redux/store";
import type { RootState } from "../redux/types";
import { ArrowLeft, Edit } from "lucide-react";
import { toast } from "react-hot-toast";

interface Company {
  id: number;
  name: string;
}

const ViewBranch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [branchData, setBranchData] = React.useState<any>(null);

  const { data: companies = [] } = useSelector(
    (state: RootState) => state.data.companyDropdown || {}
  );

  useEffect(() => {
    dispatch(getCompanyDropdown());
    if (id) {
      fetchBranchDetails();
    }
  }, [id, dispatch]);

  const fetchBranchDetails = async () => {
    try {
      if (!id) return;
      const data = await dispatch(getBranchById(parseInt(id)));
      setBranchData(data);
    } catch (error) {
      console.error("Error fetching branch details:", error);
      toast.error("Failed to fetch branch details");
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/branches/edit/${id}`);
  };

  if (!branchData) return <div>Loading...</div>;

  const selectedCompany = companies.find(
    (company: Company) =>
      company.id.toString() === branchData.created_by_id?.toString()
  );

  const renderField = (
    label: string,
    value: string | number | null | undefined
  ) => (
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="mt-1">{value || "N/A"}</p>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header with Back and Edit Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">View Branch</h1>
        </div>

        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Edit size={20} />
          <span>Edit</span>
        </button>
      </div>

      {/* Branch Details Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Basic Information */}
          {renderField("Branch Name", branchData.name)}
          {renderField("Company Name", selectedCompany?.name)}
          {renderField("Email", branchData.email)}
          {renderField("Mobile Number", branchData.mobile_number)}

          {/* Address Information - Full Width */}
          <div className="col-span-2">
            {renderField("Address", branchData.default_address?.address)}
          </div>

          {/* Location Details */}
          {renderField("State", branchData.default_address?.state)}
          {renderField("City", branchData.default_address?.city)}
          {renderField("Pincode", branchData.default_address?.pincode)}

          {/* Additional Details */}
          {renderField(
            "Created Date",
            new Date(branchData.createdAt).toLocaleDateString()
          )}
          {renderField(
            "Last Updated",
            new Date(branchData.updatedAt).toLocaleDateString()
          )}

          {/* Partner Count if available */}
          {branchData.partner_count !== undefined &&
            renderField("Partner Count", branchData.partner_count)}
        </div>
      </div>
    </div>
  );
};

export default ViewBranch;
