import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AccordionTable from "../../../components/AccordionTable";
import AddForm from "../../../components/AddForm";
import {
  getAllProductCategories,
  getProductAttributesByCategory,
} from "../../../redux/Action/action";
import { RootState } from "../../../redux/types";
import { AppDispatch } from "../../../redux/store";

interface AttributeValueFormProps {
  isOpen: boolean;
  onClose: () => void;
  attributeName: string;
  onSubmit: (data: any) => void;
}

const AttributeValueForm: React.FC<AttributeValueFormProps> = ({
  isOpen,
  onClose,
  attributeName,
  onSubmit,
}) => {
  const formFields = [
    {
      type: "text",
      key: "value",
      label: "Value",
      required: true,
      placeholder: "Enter attribute value",
    },
    {
      type: "switch",
      key: "isMandatory",
      label: "Is Mandatory",
    },
    {
      type: "switch",
      key: "isInput",
      label: "Is Input",
    },
    {
      type: "text",
      key: "displayOrder",
      label: "Display Order",
      required: true,
      placeholder: "Enter display order",
    },
  ];

  const handleSave = () => {
    onSubmit({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Attribute Value</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            Adding value for attribute:
          </span>
          <span className="ml-2 font-medium">{attributeName}</span>
        </div>

        <AddForm
          data={formFields}
          handleInputonChange={(key, value) => {
            console.log(key, value);
          }}
          handleSaveOnClick={handleSave}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#6a0000]"
          >
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductAttributes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAttributeValueForm, setShowAttributeValueForm] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  const {
    data: categories,
    loading,
    error,
    meta,
  } = useSelector((state: RootState) => state.data.allProductCategories);

  const { data: attributesData } = useSelector(
    (state: RootState) => state.data.categoryAttributes
  );

  useEffect(() => {
    fetchCategories();
  }, [currentPage, perPage]);

  const fetchCategories = () => {
    dispatch(
      getAllProductCategories({
        page_no: currentPage - 1,
        per_page: perPage,
      })
    );
  };

  const handleRowExpand = (categoryId: string) => {
    const category = categories?.find(cat => cat.id.toString() === categoryId);
    if (category) {
      if (category.parent_category) {
        dispatch(getProductAttributesByCategory(
          category.parent_category.name,
          category.name
        ));
      } else {
        dispatch(getProductAttributesByCategory(
          category.name,
          ''
        ));
      }
    }
  };

  const mainColumns = [
    { id: "categoryName", label: "Category Name", minWidth: 200 },
    { id: "subCategoryName", label: "Sub Category Name", minWidth: 200 },
    { id: "shortDescription", label: "Short Description", minWidth: 300 },
  ];

  const subTableColumns = [
    { id: "no", label: "S.NO", minWidth: 70 },
    { id: "name", label: "ATTRIBUTE NAME", minWidth: 150 },
    { id: "attribute_code", label: "ATTRIBUTE CODE", minWidth: 150 },
    { id: "is_mandatory", label: "IS MANDATORY", minWidth: 120 },
    { id: "is_input", label: "IS INPUT", minWidth: 100 },
    { id: "input_type", label: "INPUT TYPE", minWidth: 120 },
    {
      id: "status",
      label: "STATUS",
      minWidth: 100,
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

  const transformedData = categories?.map((category) => {
    const categoryAttributes = attributesData[category.name] || [];
    
    return {
      id: category.id.toString(),
      categoryName: category.parent_category?.name || '-',
      subCategoryName: category.parent_category ? category.name : '-',
      shortDescription: category.short_description,
      is_active: category.is_active,
      createdAt: new Date(category.createdAt).toLocaleDateString(),
      updatedAt: new Date(category.updatedAt).toLocaleDateString(),
      child_categories: categoryAttributes.map((attr: any, index: number) => ({
        ...attr,
        no: index + 1,
        status: attr.is_active ? "Active" : "Inactive"
      }))
    };
  }) || [];

  const handleAddAttribute = (categoryId: string) => {
    const category = categories?.find(
      (item) => item.id.toString() === categoryId
    );
    if (category) {
      setSelectedAttribute(category.name);
      setShowAttributeValueForm(true);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search Attribute"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
          />
        </div>
      </div>

      <AccordionTable
        columns={mainColumns}
        subTableColumns={subTableColumns}
        data={transformedData}
        onExpandedViewButtonClick={handleAddAttribute}
        onRowExpand={handleRowExpand}
        expandedViewTitle="Attributes"
        expandedViewButtonText="ADD ATTRIBUTE"
      />

      <AttributeValueForm
        isOpen={showAttributeValueForm}
        onClose={() => setShowAttributeValueForm(false)}
        attributeName={selectedAttribute}
        onSubmit={(data) => {
          console.log("Attribute value submitted:", data);
          // Implement submission logic
        }}
      />
    </div>
  );
};

export default ProductAttributes;
