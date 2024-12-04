import React, { useState, useEffect } from "react";
import { Eye, Edit, Plus, Search, ChevronDown } from "lucide-react";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPricing, getProductStatusList, saveBasicDetails } from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";
import { toast } from "react-hot-toast";

interface PricingProduct {
  id: number;
  name: string;
  sku_id: string;
  mrp: number;
  sales_price: number;
  payment_type_id: number;
  status: {
    display_name: string;
    lookup_code: string;
  };
}

const Pricing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const pricing = useSelector((state: RootState) => state.data.pricing);
  const productStatusList = useSelector((state: RootState) => state.data.productStatusList);

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [params, setParams] = useState({
    page_no: 1,
    per_page: 10,
    search: "",
    status: ""
  });

  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({
    mrp: 0,
    sales_price: 0
  });

  useEffect(() => {
    fetchPricing();
  }, [params]);

  useEffect(() => {
    dispatch(getProductStatusList());
  }, [dispatch]);

  const fetchPricing = async () => {
    try {
      await dispatch(getPricing(params));
    } catch (error) {
      console.error("Failed to fetch pricing:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setParams(prev => ({
      ...prev,
      search: searchValue,
      page_no: 1
    }));
  };

  const handleEditPrice = (product: PricingProduct) => {
    setEditingRow(product.sku_id);
    setEditValues({
      mrp: product.mrp,
      sales_price: product.sales_price
    });
  };

  const handleSavePrice = async (product: PricingProduct) => {
    try {
      await dispatch(saveBasicDetails({
        sku_id: product.sku_id,
        mrp: editValues.mrp,
        sales_price: editValues.sales_price,
        payment_type_id: product.payment_type_id
      }));
      
      setEditingRow(null);
      fetchPricing();
      toast.success('Price updated successfully');
    } catch (error) {
      toast.error('Failed to update price');
      console.error('Error updating price:', error);
    }
  };

  const headCells = [
    {
      id: "name",
      key: "name",
      label: "Product Name",
      minWidth: 200,
    },
    {
      id: "sku_id",
      key: "sku_id",
      label: "SKU ID",
      minWidth: 120,
    },
    {
      id: "mrp",
      key: "mrp",
      label: "MRP",
      minWidth: 100,
      renderCell: (row: PricingProduct) => {
        if (editingRow === row.sku_id) {
          return (
            <input
              type="number"
              value={editValues.mrp}
              onChange={(e) => setEditValues(prev => ({ ...prev, mrp: Number(e.target.value) }))}
              className="w-24 px-2 py-1 border border-gray-300 rounded"
            />
          );
        }
        return `₹${row.mrp}`;
      }
    },
    {
      id: "sales_price",
      key: "sales_price",
      label: "Sales Price",
      minWidth: 100,
      renderCell: (row: PricingProduct) => {
        if (editingRow === row.sku_id) {
          return (
            <input
              type="number"
              value={editValues.sales_price}
              onChange={(e) => setEditValues(prev => ({ ...prev, sales_price: Number(e.target.value) }))}
              className="w-24 px-2 py-1 border border-gray-300 rounded"
            />
          );
        }
        return `₹${row.sales_price}`;
      }
    },
    {
      id: "status",
      key: "status.display_name",
      label: "Status",
      minWidth: 120,
      renderCell: (row: PricingProduct) => {
        const statusCode = row.status?.lookup_code || '';
        const statusDisplay = row.status?.display_name || 'N/A';
        
        let statusStyle = '';
        switch (statusCode.toUpperCase()) {
          case 'ACTIVE':
            statusStyle = 'bg-green-100 text-green-800';
            break;
          case 'DRAFT':
            statusStyle = 'bg-yellow-100 text-yellow-800';
            break;
          case 'INACTIVE':
            statusStyle = 'bg-gray-100 text-gray-600';
            break;
          default:
            statusStyle = 'bg-gray-100 text-gray-800';
        }

        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle}`}>
            {statusDisplay}
          </span>
        );
      }
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      minWidth: 120,
      renderCell: (row: PricingProduct) => (
        <div className="flex items-center gap-2">
          {editingRow === row.sku_id ? (
            <>
              <button
                onClick={() => handleSavePrice(row)}
                className="px-3 py-1 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditingRow(null)}
                className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEditPrice(row)}
              className="px-3 py-1 text-sm text-white bg-primary-600 rounded hover:bg-primary-700"
            >
              Change Price
            </button>
          )}
        </div>
      )
    }
  ];

  const handleViewProduct = (product: PricingProduct) => {
    navigate(`/products/view/${product.id}`);
  };

  const handleEditProduct = (product: PricingProduct) => {
    navigate(`/products/edit/${product.id}`);
  };

  const handlePaginationChange = (newParams: { page_no?: number; per_page?: number }) => {
    setParams(prev => ({
      ...prev,
      ...newParams
    }));
  };

  if (pricing.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (pricing.error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">
          <p>Error loading pricing data:</p>
          <p>{pricing.error}</p>
          <button 
            onClick={fetchPricing}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-xs">
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={params.search}
              onChange={handleSearch}
              placeholder="Search products..."
              className="pl-8 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
            >
              <span className="text-sm">
                {params.status 
                  ? productStatusList.data?.find(s => s.lookup_code === params.status)?.display_name 
                  : "Filter by Status"}
              </span>
              <ChevronDown size={16} className={`transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setParams(prev => ({ ...prev, status: '', page_no: 1 }));
                      setIsStatusDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    All Statuses
                  </button>
                  {productStatusList.data?.map((status) => (
                    <button
                      key={status.lookup_code}
                      onClick={() => {
                        setParams(prev => ({
                          ...prev,
                          status: status.lookup_code,
                          page_no: 1
                        }));
                        setIsStatusDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm ${
                        params.status === status.lookup_code 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {status.display_name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <CustomTable
          headCells={headCells}
          data={pricing.data || []}
          pagination={true}
          meta_data={{
            total: pricing.meta?.total_rows || 0,
            per_page: params.per_page,
            current_page: params.page_no,
            last_page: pricing.meta?.total_pages || 1,
            from: ((params.page_no - 1) * params.per_page) + 1,
            to: Math.min(params.page_no * params.per_page, pricing.meta?.total_rows || 0)
          }}
          setParams={handlePaginationChange}
          loading={pricing.loading}
        />
      </div>
    </div>
  );
};

export default Pricing; 