import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBranchById } from "../redux/Action/action";
import { AppDispatch } from "../redux/store";
import { ArrowLeft, Edit } from "lucide-react";
import { toast } from "react-hot-toast";

const ViewBranch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [branchData, setBranchData] = React.useState<any>(null);

  useEffect(() => {
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

  const renderField = (label: string, value: string | number | undefined) => (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-gray-900">{value || "-"}</p>
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
            <ArrowLeft id="back-button-branch" className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-medium">View Branch</h1>
        </div>

        <button
          id="edit-button-branch"
          onClick={handleEdit}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Edit id="edit-icon-branch" size={20} />
          <span>Edit</span>
        </button>
      </div>

      {/* Branch Details Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Basic Information */}
          {renderField("Branch Name", branchData?.name)}
          {renderField("Company Name", branchData?.parent?.name)}
          {renderField("Email", branchData?.email)}
          {renderField("Mobile Number", branchData?.mobile_number)}

          {/* Address Information - Full Width */}
          <div className="col-span-2">
            {renderField("Address", branchData?.default_address?.address)}
          </div>

          {/* Location Details */}
          {renderField("State", branchData?.default_address?.state)}
          {renderField("City", branchData?.default_address?.city)}
          {renderField("Pincode", branchData?.default_address?.pincode)}
        </div>
      </div>
    </div>
  );
};

export default ViewBranch;
