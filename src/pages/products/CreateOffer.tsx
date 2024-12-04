import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, X, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOfferTypes,
  saveOfferBasics,
  getLocations,
  getProducts,
  getOfferById,
} from "../../redux/Action/action";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/types";
import { toast } from "react-hot-toast";
import AddForm from "../../components/AddForm";
import CustomTable from "../../components/CustomTable";

interface OfferFormData {
  offerTitle: string;
  offerDescription: string;
  couponCode: string;
  maxCount: number;
  offerType: string;
  fromDate: string;
  toDate: string;
  usageMaximumLimit: number;
  currentUsageLimit: number;
  storeLocations: string[];
  products: string[];
  startDate: string;
  endDate: string;
  discount_amount: number;
  discount_percentage: number;
  cart_minimum_value: number;
  cart_item_count: number | null;
  offer_item_count: number | null;
}

// Add this interface for the product table
interface ProductTableData {
  productName: string;
  skuId: string;
  mrp: number;
  salesPrice: number;
  action: boolean;
}

interface OfferType {
  id: number;
  display_name: string;
  lookup_code: string;
  is_active: boolean;
}

const CreateOffer = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: offerTypes,
    loading: offerTypesLoading,
    error: offerTypesError,
  } = useSelector((state: RootState) => state.data.offerTypes);

  useEffect(() => {
    fetchOfferTypes();
  }, []);

  const fetchOfferTypes = async () => {
    try {
      await dispatch(getOfferTypes());
    } catch (error) {
      console.error("Failed to fetch offer types:", error);
      toast.error("Failed to fetch offer types");
    }
  };

  const [offerFormData, setOfferFormData] = useState<OfferFormData>({
    offerTitle: "",
    offerDescription: "",
    couponCode: "",
    maxCount: 0,
    offerType: "",
    fromDate: "",
    toDate: "",
    usageMaximumLimit: 0,
    currentUsageLimit: 0,
    storeLocations: [],
    products: [],
    startDate: "",
    endDate: "",
    discount_amount: 0,
    discount_percentage: 0,
    cart_minimum_value: 0,
    cart_item_count: null,
    offer_item_count: null,
  });

  // Add state for selected products
  const [selectedProducts, setSelectedProducts] = useState<ProductTableData[]>(
    []
  );

  // Update the product table data structure
  const productTableData: ProductTableData[] = [
    {
      productName: "Fresh Tomatoes",
      skuId: "SKU001",
      mrp: 50.0,
      salesPrice: 40.0,
      action: false,
    },
    {
      productName: "Organic Potatoes",
      skuId: "SKU002",
      mrp: 40.0,
      salesPrice: 35.0,
      action: false,
    },
    {
      productName: "Premium Rice",
      skuId: "SKU003",
      mrp: 120.0,
      salesPrice: 110.0,
      action: false,
    },
  ];

  // Update the product table columns configuration
  const productTableColumns = [
    {
      id: "productName",
      key: "productName",
      label: "Product Name",
      minWidth: 200,
    },
    {
      id: "skuId",
      key: "skuId",
      label: "SKU ID",
      minWidth: 120,
    },
    {
      id: "mrp",
      key: "mrp",
      label: "MRP",
      minWidth: 100,
      type: "amount",
    },
    {
      id: "salesPrice",
      key: "salesPrice",
      label: "Sales Price",
      minWidth: 120,
      type: "amount",
    },
    {
      id: "action",
      key: "action",
      label: "Action",
      minWidth: 100,
      renderCell: (row: ProductTableData) => (
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectedProducts.some((p) => p.skuId === row.skuId)}
            onChange={() => handleProductSelection(row)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
        </div>
      ),
    },
  ];

  // Add handler for product selection
  const handleProductSelection = (product: ProductTableData) => {
    setSelectedProducts((prev) => {
      const exists = prev.some((p) => p.skuId === product.skuId);
      if (exists) {
        return prev.filter((p) => p.skuId !== product.skuId);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleOfferInputChange = (key: string, value: any) => {
    setOfferFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveBasics = async () => {
    // Validate basics section
    if (
      !offerFormData.offerTitle ||
      !offerFormData.offerDescription ||
      !offerFormData.couponCode ||
      !offerFormData.offerType ||
      !offerFormData.maxCount ||
      !offerFormData.startDate ||
      !offerFormData.endDate
    ) {
      toast.error("Please fill all required fields in Offer Basics");
      return;
    }

    // Validate coupon code length
    if (offerFormData.couponCode.length <= 5) {
      toast.error("Coupon code must be greater than 5 characters");
      return;
    }

    // Get the selected offer type object
    const selectedOfferType = offerTypes?.find(
      (type) => type.lookup_code === offerFormData.offerType
    );
    if (!selectedOfferType) {
      toast.error("Invalid offer type selected");
      return;
    }

    try {
      const payload = {
        section_key: "OFFER_BASICS",
        name: offerFormData.offerTitle,
        description: offerFormData.offerDescription,
        code: offerFormData.couponCode,
        max_count: Number(offerFormData.maxCount),
        offer_type_id: selectedOfferType.id,
        start_date: new Date(offerFormData.startDate).toISOString(),
        end_date: new Date(offerFormData.endDate).toISOString(),
      };

      console.log("Saving offer basics with payload:", payload);

      const response = await dispatch(saveOfferBasics(payload));
      console.log("Save basics response:", response);

      if (response?.meta?.status) {
        // Mark basics section as completed
        setCompletedSections((prev) => ({ ...prev, basics: true }));

        // Move to next section
        setActiveSection("configuration");
        toast.success("Offer basics saved successfully");
      } else {
        throw new Error(
          response?.meta?.message || "Failed to save offer basics"
        );
      }
    } catch (error) {
      console.error("Failed to save offer basics:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save offer basics"
      );
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      // Get the selected offer type
      const selectedOfferType = offerTypes?.find(
        (type) => type.lookup_code === offerFormData.offerType
      );
      if (!selectedOfferType) {
        toast.error("Invalid offer type");
        return;
      }

      const payload = {
        section_key: selectedOfferType.lookup_code,
        code: offerFormData.couponCode,
        discount_amount: Number(offerFormData.discount_amount),
        discount_percentage: Number(offerFormData.discount_percentage),
        cart_minimum_value: Number(offerFormData.cart_minimum_value),
        cart_item_count: offerFormData.cart_item_count,
        offer_item_count: offerFormData.offer_item_count,
        usage_maximum_limit: Number(offerFormData.usageMaximumLimit),
        current_usage_limit: Number(offerFormData.currentUsageLimit),
      };

      console.log("Saving configuration with payload:", payload);

      const response = await dispatch(saveOfferBasics(payload));
      console.log("Configuration save response:", response);

      if (response?.meta?.status) {
        setCompletedSections((prev) => ({ ...prev, configuration: true }));
        setActiveSection("stores");
        toast.success("Configuration saved successfully");
      } else {
        throw new Error(
          response?.meta?.message || "Failed to save configuration"
        );
      }
    } catch (error) {
      console.error("Failed to save configuration:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save configuration"
      );
    }
  };

  const handleSaveStores = async () => {
    // Validate stores section
    if (!offerFormData.storeLocations.length) {
      toast.error("Please select at least one store location");
      return;
    }

    try {
      const payload = {
        section_key: "STORE_LOCATIONS",
        code: offerFormData.couponCode,
        location_ids: offerFormData.storeLocations.includes("all")
          ? locations?.map((loc) => loc.id) || []
          : offerFormData.storeLocations.map((id) => Number(id)),
      };

      console.log("Saving store locations with payload:", payload);

      const response = await dispatch(saveOfferBasics(payload));
      console.log("Store locations save response:", response);

      if (response?.meta?.status) {
        setCompletedSections((prev) => ({ ...prev, stores: true }));
        setActiveSection("products");
        toast.success("Store locations saved successfully");
      } else {
        throw new Error(
          response?.meta?.message || "Failed to save store locations"
        );
      }
    } catch (error) {
      console.error("Failed to save store locations:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save store locations"
      );
    }
  };

  const handleSaveProducts = async () => {
    if (!offerFormData.products.length) {
      toast.error("Please select at least one product");
      return;
    }

    try {
      const payload = {
        section_key: "PRODUCTS",
        code: offerFormData.couponCode,
        product_ids: offerFormData.products.includes("all")
          ? products?.data?.map((product) => product.id) || []
          : offerFormData.products.map((id) => Number(id)),
      };

      const response = await dispatch(saveOfferBasics(payload));

      if (response?.meta?.status) {
        setCompletedSections((prev) => ({ ...prev, products: true }));
        toast.success(isEditMode ? "Offer updated successfully" : "Offer created successfully");
        navigate("/dashboard/products"); // Navigate after successful save
      } else {
        throw new Error(response?.meta?.message || "Failed to save products");
      }
    } catch (error) {
      console.error("Failed to save products:", error);
      toast.error(error instanceof Error ? error.message : "Failed to save products");
    }
  };

  const handleFinalSave = async () => {
    try {
      // Combine all sections and save final offer
      const finalOfferData = {
        ...offerFormData,
        selectedProducts: selectedProducts,
      };

      console.log("Saving complete offer:", finalOfferData);

      // Here you would typically make your API call to save the offer
      // await dispatch(saveOffer(finalOfferData));

      toast.success("Offer created successfully");
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Failed to create offer:", error);
      toast.error("Failed to create offer");
    }
  };

  // Add state for active section
  const [activeSection, setActiveSection] = useState<string>("basics");

  // Add state for section completion
  const [completedSections, setCompletedSections] = useState<{
    basics: boolean;
    configuration: boolean;
    stores: boolean;
    products: boolean;
  }>({
    basics: false,
    configuration: false,
    stores: false,
    products: false,
  });

  const sections = [
    { id: "basics", label: "Offer Basics" },
    { id: "configuration", label: "Applicable Configuration" },
    { id: "stores", label: "Offer Applicable Stores" },
    { id: "products", label: "Offer Applicable Products" },
  ];

  const renderSectionButtons = () => (
    <div className="flex flex-col gap-4 mb-6">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`flex items-center justify-between p-4 rounded-lg border ${
            activeSection === section.id
              ? "border-primary-600 bg-primary-50"
              : "border-gray-200 hover:border-primary-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                completedSections[section.id as keyof typeof completedSections]
                  ? "bg-green-100 text-green-600"
                  : activeSection === section.id
                  ? "bg-primary-100 text-primary-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {completedSections[
                section.id as keyof typeof completedSections
              ] ? (
                <Check size={16} />
              ) : (
                <span className="text-sm font-medium">
                  {sections.findIndex((s) => s.id === section.id) + 1}
                </span>
              )}
            </div>
            <span className="font-medium">{section.label}</span>
          </div>
          {completedSections[section.id as keyof typeof completedSections] && (
            <span className="text-sm text-green-600">Completed</span>
          )}
        </button>
      ))}
    </div>
  );

  const renderConfigurationSection = () => {
    const isDiscountPercentage = offerFormData.offerType === "Disc_Pct";

    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          Applicable Configuration
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Configure the offer settings and limitations.
        </p>
        <AddForm
          data={[
            ...(isDiscountPercentage
              ? [
                  {
                    type: "number",
                    key: "discount_amount",
                    label: "Discount Amount",
                    required: true,
                    value: offerFormData.discount_amount,
                    placeholder: "Enter discount amount",
                  },
                  {
                    type: "number",
                    key: "discount_percentage",
                    label: "Discount Percentage",
                    required: true,
                    value: offerFormData.discount_percentage,
                    placeholder: "Enter discount percentage",
                  },
                ]
              : []),
            {
              type: "number",
              key: "cart_minimum_value",
              label: "Cart Minimum Value",
              required: true,
              value: offerFormData.cart_minimum_value,
              placeholder: "Enter cart minimum value",
            },
            {
              type: "number",
              key: "usageMaximumLimit",
              label: "Usage Maximum Limit",
              required: true,
              value: offerFormData.usageMaximumLimit,
              placeholder: "Enter maximum usage limit",
            },
            {
              type: "number",
              key: "currentUsageLimit",
              label: "Current Usage Limit",
              required: true,
              value: offerFormData.currentUsageLimit,
              placeholder: "Enter current usage limit",
            },
          ]}
          handleInputonChange={handleOfferInputChange}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveConfiguration}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
          >
            Save & Continue
          </button>
        </div>
      </div>
    );
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "basics":
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Offer Basics
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              This information is helpful for you to track your offer.
            </p>
            <AddForm
              data={[
                {
                  type: "text",
                  key: "offerTitle",
                  label: "Offer Title",
                  required: true,
                  value: offerFormData.offerTitle,
                  placeholder: "Enter offer title",
                },
                {
                  type: "textarea",
                  key: "offerDescription",
                  label: "Offer Description",
                  required: true,
                  value: offerFormData.offerDescription,
                  placeholder: "Brief description for your offer",
                },
                {
                  type: "text",
                  key: "couponCode",
                  label: "Coupon Code",
                  required: true,
                  value: offerFormData.couponCode,
                  placeholder: "Enter coupon code",
                },
                {
                  type: "number",
                  key: "maxCount",
                  label: "Max Count",
                  required: true,
                  value: offerFormData.maxCount,
                  placeholder: "Enter maximum count",
                },
                {
                  type: "select",
                  key: "offerType",
                  label: "Offer Type",
                  required: true,
                  value: offerFormData.offerType,
                  options:
                    offerTypes?.map((type) => ({
                      value: type.lookup_code,
                      label: type.display_name,
                    })) || [],
                  placeholder: "Select offer type",
                  disabled: offerTypesLoading,
                },
                {
                  type: "date",
                  key: "startDate",
                  label: "Start Date",
                  required: true,
                  value: offerFormData.startDate,
                  placeholder: "Select start date",
                  min: new Date().toISOString().split("T")[0],
                  className:
                    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500",
                },
                {
                  type: "date",
                  key: "endDate",
                  label: "End Date",
                  required: true,
                  value: offerFormData.endDate,
                  placeholder: "Select end date",
                  min:
                    offerFormData.startDate ||
                    new Date().toISOString().split("T")[0],
                  className:
                    "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500",
                  disabled: !offerFormData.startDate,
                },
              ]}
              handleInputonChange={(key, value) => {
                if (key === "startDate") {
                  const newStartDate = new Date(value);
                  const currentEndDate = offerFormData.endDate
                    ? new Date(offerFormData.endDate)
                    : null;

                  setOfferFormData((prev) => ({
                    ...prev,
                    startDate: value,
                    endDate:
                      currentEndDate && currentEndDate < newStartDate
                        ? ""
                        : prev.endDate,
                  }));
                } else {
                  handleOfferInputChange(key, value);
                }
              }}
              handleSelectonChange={handleOfferInputChange}
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveBasics}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              >
                Save & Continue
              </button>
            </div>
          </div>
        );

      case "configuration":
        return renderConfigurationSection();

      case "stores":
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Offer Applicable Stores
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Select the stores where this offer will be applicable.
            </p>
            <AddForm
              data={[
                {
                  type: "select",
                  key: "storeLocations",
                  label: "Select Stores Locations",
                  required: true,
                  value: offerFormData.storeLocations,
                  options: [
                    { value: "all", label: "All Stores" },
                    ...(locations?.map((location) => ({
                      value: location.id.toString(),
                      label: location.name,
                    })) || []),
                  ],
                  placeholder: "Select store locations",
                  disabled: locationsLoading,
                  multiple: true,
                },
              ]}
              handleSelectonChange={(key, value) => {
                if (Array.isArray(value)) {
                  if (value.includes("all")) {
                    handleOfferInputChange(key, ["all"]);
                  } else {
                    handleOfferInputChange(
                      key,
                      value.filter((v) => v !== "all")
                    );
                  }
                }
              }}
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveStores}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              >
                Save & Continue
              </button>
            </div>
          </div>
        );

      case "products":
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Offer Applicable Products
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Select the products for this offer.
            </p>
            <AddForm
              data={[
                {
                  type: "select",
                  key: "products",
                  label: "Products / Bundles",
                  required: true,
                  value: offerFormData.products,
                  options: [
                    { value: "all", label: "All Products" },
                    ...(products?.data?.map((product) => ({
                      value: product.id.toString(),
                      label: product.name,
                    })) || []),
                  ],
                  placeholder: "Select products",
                  disabled: productsLoading,
                  multiple: true,
                },
              ]}
              handleSelectonChange={(key, value) => {
                if (Array.isArray(value)) {
                  if (value.includes("all")) {
                    handleOfferInputChange(key, ["all"]);
                  } else {
                    handleOfferInputChange(
                      key,
                      value.filter((v) => v !== "all")
                    );
                  }
                }
              }}
            />
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveProducts}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
              >
                {isEditMode ? "Update Offer" : "Create Offer"}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Add locations selector
  const { data: locations, loading: locationsLoading } = useSelector(
    (state: RootState) => state.data.locations
  );

  // Add useEffect to fetch locations
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      await dispatch(getLocations());
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      toast.error("Failed to fetch locations");
    }
  };

  // Add products selector
  const { data: products, loading: productsLoading } = useSelector(
    (state: RootState) => state.data.products
  );

  // Add useEffect to fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      await dispatch(getProducts({ page_no: 1, per_page: 100 })); // Adjust per_page as needed
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    }
  };

  // Add effect to fetch offer details when in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchOfferDetails = async () => {
        try {
          const response = await dispatch(getOfferById(Number(id)));
          if (response?.data) {
            const offer = response.data;
            setOfferFormData({
              offerTitle: offer.name,
              offerDescription: offer.description,
              couponCode: offer.code,
              maxCount: offer.max_count,
              offerType: offer.offer_type.lookup_code,
              startDate: offer.start_date,
              endDate: offer.end_date,
              usageMaximumLimit: offer.usage_maximum_limit,
              currentUsageLimit: offer.current_usage_limit,
              storeLocations:
                offer.locations?.map((loc) => loc.id.toString()) || [],
              products: offer.products?.map((prod) => prod.id.toString()) || [],
              discount_amount: offer.discount_amount,
              discount_percentage: offer.discount_percentage,
              cart_minimum_value: offer.cart_minimum_value,
              cart_item_count: offer.cart_item_count,
              offer_item_count: offer.offer_item_count,
            });
          }
        } catch (error) {
          console.error("Failed to fetch offer details:", error);
          toast.error("Failed to fetch offer details");
        }
      };

      fetchOfferDetails();
    }
  }, [isEditMode, id, dispatch]);

  // Update the page title based on mode
  const pageTitle = isEditMode ? "Edit your offer" : "Create your offer";
  const pageDescription = isEditMode
    ? "Update your custom offer details"
    : "Create your custom offers for your customers";

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/products")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
          <p className="text-sm text-gray-500">{pageDescription}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Section Buttons */}
        <div className="w-1/3">{renderSectionButtons()}</div>

        {/* Section Content */}
        <div className="w-2/3">{renderActiveSection()}</div>
      </div>
    </div>
  );
};

export default CreateOffer;
