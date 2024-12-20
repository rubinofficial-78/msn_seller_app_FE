import React, { useState, useEffect } from "react";
import { Search, X, Ban } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AccordionTable from "../../../components/AccordionTable";
import AddForm from "../../../components/AddForm";
import {
  getAllProductCategories,
  getProductAttributesByCategory,
  createAttribute,
  updateAttribute,
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
  const [formData, setFormData] = useState({
    name: '',
    is_mandatory: false,
    is_input: false,
    input_type: ''
  });

  // Define the attribute value options
  const attributeValueOptions = [
    { value: 'multi_number', label: 'Multi Number' },
    { value: 'multi_text', label: 'Multi Text' },
    { value: 'multi_images', label: 'Multi Images' }
  ];

  const formFields = [
    {
      type: 'text',
      key: 'name',
      label: 'Attribute Name',
      required: true,
      placeholder: 'Enter attribute name',
      value: formData.name
    },
    {
      type: 'switch',
      key: 'is_mandatory',
      label: 'Is Mandatory',
      value: formData.is_mandatory
    },
    {
      type: 'switch',
      key: 'is_input',
      label: 'Is Input',
      value: formData.is_input
    },
    {
      type: 'select',
      key: 'input_type',
      label: 'Attribute Values',
      required: true,
      placeholder: 'Select attribute value type',
      value: formData.input_type,
      options: attributeValueOptions
    }
  ];

  const handleInputChange = (key: string, value: any) => {
    console.log('Input change:', key, value); // For debugging
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.input_type) {
      // Show error message or handle validation
      return;
    }
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      is_mandatory: false,
      is_input: false,
      input_type: ''
    });
  };

  // Reset form when modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        is_mandatory: false,
        is_input: false,
        input_type: ''
      });
    }
  }, [isOpen]);

  // Get the category name for display
  const { data: categories } = useSelector((state: RootState) => state.data.allProductCategories);
  const category = categories?.find(cat => cat.id.toString() === attributeName);
  const displayName = category ? (category.parent_category ? category.name : category.name) : '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Attribute</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            Adding attribute for category:
          </span>
          <span className="ml-2 font-medium">{displayName}</span>
        </div>

        <AddForm
          data={formFields}
          handleInputonChange={handleInputChange}
          handleSelectonChange={handleInputChange}
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
  const [perPage, setPerPage] = useState(10);

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

  const transformedData = categories?.map((category) => {
    const categoryKey = category.parent_category ? 
      `${category.parent_category.name}_${category.name}` : 
      category.name;
    
    const categoryAttributes = attributesData[categoryKey] || [];
    
    return {
      id: category.id.toString(),
      categoryName: category.parent_category?.name || '-',
      subCategoryName: category.parent_category ? category.name : '-',
      shortDescription: category.short_description,
      is_active: category.is_active,
      createdAt: new Date(category.createdAt).toLocaleDateString(),
      updatedAt: new Date(category.updatedAt).toLocaleDateString(),
      child_categories: categoryAttributes.map((attr: any, index: number) => ({
        id: attr.id,
        no: index + 1,
        name: attr.name,
        attribute_code: attr.attribute_code,
        is_mandatory: attr.is_mandatory ? "Yes" : "No",
        is_input: attr.is_input ? "Yes" : "No",
        input_type: attr.input_type,
        is_active: attr.is_active,
        status: attr.is_active ? "Active" : "Inactive"
      }))
    };
  }) || [];

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

  const handleDisableAttribute = async (attributeId: number) => {
    try {
      await dispatch(updateAttribute(attributeId, {
        is_active: false // Only allow disabling
      }));

      // Refresh the attributes list after update
      const category = categories?.find(cat => {
        const categoryAttributes = attributesData[cat.name] || [];
        return categoryAttributes.some(attr => attr.id === attributeId);
      });

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
    } catch (error) {
      console.error('Failed to disable attribute:', error);
    }
  };

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
    {
      id: "actions",
      label: "ACTIONS",
      minWidth: 100,
      renderCell: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDisableAttribute(row.id)}
            className={`p-1.5 rounded ${
              row.is_active 
                ? "text-red-600 hover:bg-red-50" 
                : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!row.is_active} // Disable button if already inactive
            title={row.is_active ? "Disable Attribute" : "Attribute already disabled"}
          >
            <Ban size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleAddAttribute = (categoryId: string) => {
    console.log('Add attribute clicked for category:', categoryId);
    const category = categories?.find(
      (item) => item.id.toString() === categoryId
    );
    if (category) {
      setSelectedAttribute(categoryId);
      setShowAttributeValueForm(true);
    } else {
      console.log('Category not found:', categoryId);
    }
  };

  const handleAttributeSubmit = async (data: any) => {
    try {
      const category = categories?.find(
        (item) => item.id.toString() === selectedAttribute
      );

      if (!category) {
        console.error('Category not found');
        return;
      }

      const payload = {
        attribute_code: data.name.toLowerCase().replace(/\s+/g, '_'),
        name: data.name,
        category: category.parent_category ? category.parent_category.name : category.name,
        sub_category: category.parent_category ? category.name : '',
        is_mandatory: data.is_mandatory,
        is_input: data.is_input,
        input_type: data.input_type
      };

      console.log('Creating attribute with payload:', payload); // For debugging

      await dispatch(createAttribute(payload));
      
      // Close the form
      setShowAttributeValueForm(false);
      
      // Refresh the attributes list
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
    } catch (error) {
      console.error('Failed to create attribute:', error);
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
        pagination={{
          total: meta?.total_rows || 0,
          page: currentPage,
          perPage: perPage,
          onPageChange: (page) => setCurrentPage(page),
          onPerPageChange: (newPerPage) => {
            setPerPage(newPerPage);
            setCurrentPage(1);
          },
        }}
      />

      {showAttributeValueForm && (
        <AttributeValueForm
          isOpen={showAttributeValueForm}
          onClose={() => setShowAttributeValueForm(false)}
          attributeName={selectedAttribute}
          onSubmit={handleAttributeSubmit}
        />
      )}
    </div>
  );
};

export default ProductAttributes;