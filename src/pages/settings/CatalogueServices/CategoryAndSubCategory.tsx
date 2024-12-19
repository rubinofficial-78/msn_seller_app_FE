import React, { useState, useEffect } from 'react';
import { Search, X, Ban } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionTable from '../../../components/AccordionTable';
import AddForm from '../../../components/AddForm';
import { getProductCategoriesWithSubCategories, createCategory, updateCategory } from '../../../redux/Action/action';
import { RootState } from '../../../redux/types';
import { AppDispatch } from '../../../redux/store';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (data: any) => void;
  parentCategory?: string;
}

const CategoryForm: React.FC<FormModalProps> = ({ isOpen, onClose, title, onSubmit, parentCategory }) => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryCode: '',
    shortDescription: ''
  });

  const formFields = [
    {
      type: 'text',
      key: 'categoryName',
      label: 'Category Name',
      required: true,
      placeholder: 'Enter category name',
      value: formData.categoryName,
    },
    {
      type: 'text',
      key: 'categoryCode',
      label: 'Category Code',
      required: true,
      placeholder: 'Enter category code',
      value: formData.categoryCode,
    },
    {
      type: 'textarea',
      key: 'shortDescription',
      label: 'Short Description',
      placeholder: 'Enter short description',
      value: formData.shortDescription,
    },
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    if (!formData.categoryName || !formData.categoryCode) {
      return;
    }
    onSubmit(formData);
    onClose();
    setFormData({
      categoryName: '',
      categoryCode: '',
      shortDescription: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {parentCategory && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Adding subcategory to:</span>
            <span className="ml-2 font-medium">{parentCategory}</span>
          </div>
        )}

        <AddForm
          data={formFields}
          handleInputonChange={handleInputChange}
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

const CategoryAndSubCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data: categories, loading, error, meta } = useSelector(
    (state: RootState) => state.data.productCategories
  );

  useEffect(() => {
    fetchCategories();
  }, [currentPage, perPage]);

  const fetchCategories = () => {
    const params = {
      page_no: currentPage - 1,
      per_page: perPage,
      is_active_check: false,
      parent_category_id: null as null
    };
    
    dispatch(getProductCategoriesWithSubCategories(params));
  };

  const handleFormSubmit = async (data: any) => {
    try {
      let payload;
      
      if (showSubCategoryForm) {
        // For subcategory, include parent_category_id
        const parentCategory = categories?.find(cat => cat.name === selectedCategory);
        payload = {
          category_code: data.categoryCode,
          name: data.categoryName,
          short_description: data.shortDescription,
          parent_category_id: parentCategory?.id
        };
      } else {
        // For main category, only include basic fields
        payload = {
          category_code: data.categoryCode,
          name: data.categoryName,
          short_description: data.shortDescription
        };
      }

      console.log('Creating category with payload:', payload); // For debugging

      await dispatch(createCategory(payload));
      
      // Close the form
      setShowCategoryForm(false);
      setShowSubCategoryForm(false);
      
      // Refresh the categories list
      fetchCategories();
      
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleToggleCategory = async (categoryId: string, event: React.MouseEvent, isActive: boolean) => {
    event.stopPropagation(); // Prevent row expansion when clicking the button
    try {
      await dispatch(updateCategory(Number(categoryId), {
        is_active: !isActive // Toggle the active status
      }));
      
      // Refresh the categories list after update
      fetchCategories();
    } catch (error) {
      console.error('Failed to update category status:', error);
    }
  };

  const mainColumns = [
    { id: 'categoryName', label: 'Category Name', minWidth: 200 },
    { id: 'categoryCode', label: 'Category Code', minWidth: 200 },
    { id: 'shortDescription', label: 'Short Description', minWidth: 300 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 120,
      renderCell: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.is_active
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {row.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      renderCell: (row: any) => (
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => handleToggleCategory(row.id, e, row.is_active)}
            className="p-1.5 rounded hover:bg-gray-100"
            title={row.is_active ? 'Disable Category' : 'Enable Category'}
          >
            <Ban 
              strokeWidth={2}
              className={`h-5 w-5 ${row.is_active ? 'text-red-600' : 'text-green-600'}`}
            />
          </button>
        </div>
      )
    }
  ];

  const subTableColumns = [
    { id: 'no', label: 'S.No', minWidth: 70 },
    { id: 'categoryName', label: 'Sub Category Name', minWidth: 150 },
    { id: 'categoryCode', label: 'Category Code', minWidth: 120 },
    { id: 'shortDescription', label: 'Description', minWidth: 200 },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 100, 
      renderCell: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { id: 'createdAt', label: 'Created Date', minWidth: 120 },
    { id: 'updatedAt', label: 'Updated Date', minWidth: 120 },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 100,
      renderCell: (row: any) => (
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => handleToggleCategory(row.id, e, row.is_active)}
            className="p-1.5 rounded hover:bg-gray-100"
            title={row.is_active ? 'Disable Category' : 'Enable Category'}
          >
            <Ban 
              strokeWidth={2}
              className={`h-5 w-5 ${row.is_active ? 'text-red-600' : 'text-green-600'}`}
            />
          </button>
        </div>
      )
    }
  ];

  const transformedData = categories?.map((category) => ({
    id: category.id.toString(),
    categoryName: category.name,
    categoryCode: category.category_code,
    shortDescription: category.short_description,
    is_active: category.is_active,
    createdAt: new Date(category.createdAt).toLocaleDateString(),
    updatedAt: new Date(category.updatedAt).toLocaleDateString(),
    status: category.is_active ? 'Active' : 'Inactive',
    child_categories: category.child_categories?.map((subCategory, index) => ({
      id: subCategory.id,
      no: index + 1,
      categoryName: subCategory.name,
      categoryCode: subCategory.category_code,
      shortDescription: subCategory.short_description,
      is_active: subCategory.is_active,
      status: subCategory.is_active ? 'Active' : 'Inactive',
      createdAt: new Date(subCategory.createdAt).toLocaleDateString(),
      updatedAt: new Date(subCategory.updatedAt).toLocaleDateString(),
      parent_category_id: subCategory.parent_category_id
    })) || []
  })) || [];

  const handleAddSubCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setShowSubCategoryForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setShowCategoryForm(true)}
          className="px-4 py-2 bg-[#800000] text-white rounded-lg"
        >
          ADD CATEGORY
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by Sub Category"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
          />
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <AccordionTable
          columns={mainColumns}
          subTableColumns={subTableColumns}
          data={transformedData}
          onAddSubCategory={handleAddSubCategory}
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
      )}

      {/* Category Form Modal */}
      <CategoryForm
        isOpen={showCategoryForm}
        onClose={() => setShowCategoryForm(false)}
        title="Add Category"
        onSubmit={handleFormSubmit}
      />

      {/* SubCategory Form Modal */}
      <CategoryForm
        isOpen={showSubCategoryForm}
        onClose={() => setShowSubCategoryForm(false)}
        title="Add Sub Category"
        onSubmit={handleFormSubmit}
        parentCategory={selectedCategory}
      />
    </div>
  );
};

export default CategoryAndSubCategory; 