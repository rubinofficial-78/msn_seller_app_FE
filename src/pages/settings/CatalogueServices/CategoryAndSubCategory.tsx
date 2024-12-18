import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AccordionTable from '../../../components/AccordionTable';
import AddForm from '../../../components/AddForm';
import { getProductCategoriesWithSubCategories } from '../../../redux/Action/action';
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
  const formFields = [
    {
      type: 'text',
      key: 'categoryName',
      label: 'Category Name',
      required: true,
      placeholder: 'Enter category name',
    },
    {
      type: 'text',
      key: 'categoryCode',
      label: 'Category Code',
      required: true,
      placeholder: 'Enter category code',
    },
    {
      type: 'textarea',
      key: 'shortDescription',
      label: 'Short Description',
      placeholder: 'Enter short description',
    },
  ];

  const handleSave = () => {
    // Implement save logic
    onSubmit({});
    onClose();
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

const CategoryAndSubCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showSubCategoryForm, setShowSubCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

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

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // TODO: Implement category/subcategory creation logic
    fetchCategories(); // Refresh the list after submission
  };

  const mainColumns = [
    { id: 'categoryName', label: 'Category Name', minWidth: 200 },
    { id: 'categoryCode', label: 'Category Code', minWidth: 200 },
    { id: 'shortDescription', label: 'Short Description', minWidth: 300 },
  ];

  const subTableColumns = [
    { id: 'no', label: 'S.No', minWidth: 70 },
    { id: 'categoryName', label: 'Sub Category Name', minWidth: 150 },
    { id: 'categoryCode', label: 'Category Code', minWidth: 120 },
    { id: 'shortDescription', label: 'Description', minWidth: 200 },
    { id: 'status', label: 'Status', minWidth: 100, 
      renderCell: (row: any) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          row.status === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { id: 'createdAt', label: 'Created Date', minWidth: 120 },
    { id: 'updatedAt', label: 'Updated Date', minWidth: 120 }
  ];

  const transformedData = categories?.map((category) => ({
    id: category.id.toString(),
    categoryName: category.name,
    categoryCode: category.category_code,
    shortDescription: category.short_description,
    is_active: category.is_active,
    createdAt: new Date(category.createdAt).toLocaleDateString(),
    updatedAt: new Date(category.updatedAt).toLocaleDateString(),
    child_categories: category.child_categories?.map((subCategory, index) => ({
      id: subCategory.id,
      no: index + 1,
      categoryName: subCategory.name,
      categoryCode: subCategory.category_code,
      shortDescription: subCategory.short_description,
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