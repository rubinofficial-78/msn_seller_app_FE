import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ImagePlus } from "lucide-react";
import AddForm from "../../components/AddForm";
import CustomTable, { Column } from "../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  getProductAttributes,
  getProductCategoryAttributes,
  generateVariants,
  createVariants,
} from "../../redux/Action/action";
import { RootState } from "../../redux/types";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-hot-toast";

type AttributePair = {
  attribute: string;
  attributeValue: string[];
};

type VariantFormData = {
  variantGroupName: string;
  attributePairs: AttributePair[];
};

type VariantTableData = {
  sku_id: string;
  product_template_sku_id: string;
  name: string;
  variant_group_name: string;
  product_attributes_values: Array<Record<string, string>>;
  mrp: number;
  sales_price: number;
  image_arr: string[];
};

const CreateVariant = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAdditionalPairs, setShowAdditionalPairs] = useState(false);

  const [variantFormData, setVariantFormData] = useState<VariantFormData>({
    variantGroupName: "",
    attributePairs: Array(5).fill({ attribute: "", attributeValue: [] }),
  });

  const [variantTableData, setVariantTableData] = useState<VariantTableData[]>(
    []
  );

  const product = useSelector(
    (state: RootState) => state.data.selectedProduct.data
  );
  const categoryAttributes = useSelector(
    (state: RootState) => state.data.productCategoryAttributes?.data
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const productData = await dispatch(getProductById(Number(id)));

          if (productData?.data) {
            await dispatch(getProductAttributes(productData.data.sku_id));

            if (
              productData.data.level1_category?.name &&
              productData.data.level2_category?.name
            ) {
              await dispatch(
                getProductCategoryAttributes(
                  productData.data.level1_category.name,
                  productData.data.level2_category.name
                )
              );
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (categoryAttributes?.length) {
      // Initialize attributePairs with mandatory attributes
      const mandatoryAttributes = categoryAttributes
        .filter((attr) => attr.is_mandatory)
        .map((attr) => ({
          attribute: attr.name,
          attributeValue: [],
        }));

      setVariantFormData((prev) => ({
        ...prev,
        attributePairs: mandatoryAttributes,
      }));
    }
  }, [categoryAttributes]);

  const variantColumns: Column[] = [
    {
      id: "sku_id",
      key: "sku_id",
      label: "SKU Id",
      minWidth: 150,
      type: "custom",
      renderCell: (row: VariantTableData) => (
        <div className="text-gray-900">{row.sku_id}</div>
      ),
    },
    {
      id: "attribute_values",
      key: "attribute_values",
      label: "Attribute Values",
      minWidth: 200,
      type: "custom",
      renderCell: (row: VariantTableData) => (
        <div className="flex flex-wrap gap-2">
          {row.product_attributes_values.map((attr, index) => {
            const [, value] = Object.entries(attr)[0];
            if (!value) return null; // Skip empty values
            return (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-700"
              >
                {value}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      id: "images",
      key: "images",
      label: "Add images",
      type: "custom",
      minWidth: 150,
      renderCell: (row: VariantTableData) => (
        <AddForm
          data={[
            {
              type: "image",
              key: `image_${row.sku_id}`,
              label: "Product Image",
              value: row.image_arr[0] || "",
              required: true,
              uploadText: "Upload Image",
              uploadDescription: "PNG, JPG up to 5MB",
              uploadBoxStyle: "w-full h-32",
            },
          ]}
          handleImageLink={(id, imageUrl) => {
            if (imageUrl) {
              const rowIndex = variantTableData.findIndex(
                (r) => r.sku_id === row.sku_id
              );
              handleVariantUpdate(rowIndex, "image_arr", [imageUrl]);
            }
          }}
        />
      ),
    },
    {
      id: "sales_price",
      key: "sales_price",
      label: "Add Sales price",
      type: "custom",
      minWidth: 150,
      renderCell: (row: VariantTableData) => (
        <div className="flex items-center">
          <span className="mr-2">₹</span>
          <input
            type="number"
            value={row.sales_price}
            onChange={(e) => {
              const rowIndex = variantTableData.findIndex(
                (r) => r.sku_id === row.sku_id
              );
              handleVariantUpdate(
                rowIndex,
                "sales_price",
                Number(e.target.value)
              );
            }}
            className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ),
    },
    {
      id: "mrp",
      key: "mrp",
      label: "MRP",
      type: "custom",
      minWidth: 150,
      renderCell: (row: VariantTableData) => (
        <div className="flex items-center">
          <span className="mr-2">₹</span>
          <input
            type="number"
            value={row.mrp}
            onChange={(e) => {
              const rowIndex = variantTableData.findIndex(
                (r) => r.sku_id === row.sku_id
              );
              handleVariantUpdate(rowIndex, "mrp", Number(e.target.value));
            }}
            className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      ),
    },
  ];

  const handleVariantInputChange = (
    key: string,
    value: any,
    index?: number
  ) => {
    console.log("handleVariantInputChange:", { key, value, index });

    if (key === "variantGroupName") {
      setVariantFormData((prev) => ({
        ...prev,
        variantGroupName: value,
      }));
      return;
    }

    setVariantFormData((prev) => {
      const newAttributePairs = [...prev.attributePairs];
      const pairIndex =
        typeof index === "number"
          ? index
          : parseInt(key.replace(/\D/g, "")) - 1;

      // Initialize the pair if it doesn't exist
      if (!newAttributePairs[pairIndex]) {
        newAttributePairs[pairIndex] = { attribute: "", attributeValue: [] };
      }

      // Handle attribute name
      if (key.includes("attribute") && !key.includes("Value")) {
        newAttributePairs[pairIndex] = {
          ...newAttributePairs[pairIndex],
          attribute: value,
        };
      }
      // Handle attribute value
      else if (key.includes("attributeValue")) {
        newAttributePairs[pairIndex] = {
          ...newAttributePairs[pairIndex],
          attributeValue: Array.isArray(value) ? value : [value],
        };
      }

      return {
        ...prev,
        attributePairs: newAttributePairs,
      };
    });
  };

  const handleVariantUpdate = (
    rowIndex: number,
    field: keyof VariantTableData,
    value: any
  ) => {
    setVariantTableData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [field]: value } : row
      )
    );
  };

  const handleGenerateVariants = async () => {
    try {
      if (!product?.sku_id) {
        toast.error("Product SKU ID is required");
        return;
      }

      if (!variantFormData.variantGroupName.trim()) {
        toast.error("Variant Group Name is required");
        return;
      }

      // Transform the attribute pairs into the required format
      const attributes: Record<string, any> = {};

      variantFormData.attributePairs.forEach((pair) => {
        if (pair.attribute && pair.attributeValue.length > 0) {
          const attribute = categoryAttributes.find(
            (attr) => attr.name === pair.attribute
          );
          if (
            attribute?.input_type === "single_number" ||
            attribute?.input_type === "single_text"
          ) {
            attributes[attribute.attribute_code] = pair.attributeValue[0];
          } else {
            attributes[attribute.attribute_code] = pair.attributeValue;
          }
        }
      });

      // Show loading toast
      const loadingToast = toast.loading("Generating variants...");

      // Call the generate variants API
      const response = await dispatch(
        generateVariants(
          product.sku_id,
          attributes,
          variantFormData.variantGroupName
        )
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response?.meta?.status) {
        toast.success("Variants generated successfully!");

        if (response.data) {
          // Map the response data to match our table structure
          const variants = response.data.map((variant: any) => ({
            sku_id: variant.sku_id,
            product_template_sku_id: variant.product_template_sku_id,
            name: variant.name || "",
            variant_group_name: variant.variant_group_name,
            product_attributes_values: variant.product_attributes_values.map(
              (attr: any) => {
                const [key, value] = Object.entries(attr)[0];
                return { [key]: value };
              }
            ),
            mrp: variant.mrp || 0,
            sales_price: variant.sales_price || 0,
            image_arr: variant.image_arr || [],
          }));

          setVariantTableData(variants);
        }
      } else {
        toast.error(response?.meta?.message || "Failed to generate variants");
      }
    } catch (error) {
      console.error("Error generating variants:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to generate variants"
      );
    }
  };

  const handleCreateVariants = async () => {
    try {
      if (!variantTableData.length) {
        toast.error("No variants to create");
        return;
      }

      const loadingToast = toast.loading("Creating variants...");

      const response = await dispatch(createVariants(variantTableData));

      toast.dismiss(loadingToast);

      if (response?.meta?.status) {
        toast.success("Variants created successfully!");
        navigate(-1); // Go back to previous page
      }
    } catch (error) {
      console.error("Error creating variants:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create variants"
      );
    }
  };

  const variantFormFields = [
    {
      type: "text",
      key: "variantGroupName",
      label: "Variant Group Name",
      required: true,
      placeholder: "Enter Variant Group Name",
      value: variantFormData.variantGroupName,
    },
  ];

  const getInputType = (attribute: any) => {
    if (attribute.child_attributes?.length > 0) {
      return "select";
    }

    if (attribute.is_input && attribute.input_type) {
      switch (attribute.input_type) {
        case "single_number":
          return "text";
        case "single_text":
          return "text";
        case "multi_text":
          return "textarea";
        case "date":
          return "date";
        case "single_image":
          return "image";
        default:
          return "text";
      }
    }

    return "text";
  };

  const handleImageLink = (
    id: string,
    imageUrl: string | null,
    index?: number
  ) => {
    if (imageUrl) {
      handleVariantInputChange(id, [imageUrl], index);
    }
  };

  const renderAttributePairs = (startIndex: number, endIndex: number) => {
    if (!categoryAttributes) {
      return <div>Loading attributes...</div>;
    }

    return categoryAttributes
      .slice(startIndex, endIndex)
      .filter((attr) => (!showAdditionalPairs ? attr.is_mandatory : true))
      .map((attribute, index) => {
        const currentIndex = startIndex + index;
        const currentPair = variantFormData.attributePairs[currentIndex] || {
          attribute: "",
          attributeValue: [],
        };
        const inputType = getInputType(attribute);
        const isSelectType = inputType === "select";
        const isImageType = attribute.input_type === "single_image";

        return (
          <div key={attribute.id} className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <AddForm
                data={[
                  {
                    type: "text",
                    key: `attribute${currentIndex + 1}`,
                    label: `Attribute ${currentIndex + 1}`,
                    required: attribute.is_mandatory,
                    placeholder: `Enter ${attribute.name}`,
                    value: attribute.name,
                    disabled: true,
                  },
                ]}
                handleInputonChange={(key, value) =>
                  handleVariantInputChange(key, value, currentIndex)
                }
                index={currentIndex}
              />
            </div>
            <div>
              <AddForm
                data={[
                  {
                    type: inputType,
                    key: `attributeValue${currentIndex + 1}`,
                    label: `Attribute ${currentIndex + 1} Values`,
                    required: attribute.is_mandatory,
                    value: isImageType
                      ? currentPair.attributeValue[0] || ""
                      : currentPair.attributeValue,
                    placeholder: isSelectType
                      ? `Select ${attribute.name} values`
                      : `Enter ${attribute.name} value`,
                    options:
                      attribute.child_attributes?.map((child) => ({
                        value: child.attribute_code || child.name,
                        label: child.name,
                      })) || [],
                    multiple: isSelectType,
                  },
                ]}
                handleInputonChange={(key, value) => {
                  if (!isSelectType && !isImageType) {
                    handleVariantInputChange(key, value, currentIndex);
                  }
                }}
                handleSelectonChange={(key, value) => {
                  if (isSelectType) {
                    handleVariantInputChange(key, value, currentIndex);
                  }
                }}
                handleImageLink={
                  isImageType
                    ? (id, imageUrl) =>
                        handleImageLink(id, imageUrl, currentIndex)
                    : undefined
                }
                index={currentIndex}
              />
            </div>
          </div>
        );
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Variant Information</h2>
          <p className="text-gray-600 text-sm mt-2">
            This information is helpful for you to track your product. This
            information will be displayed publicly so be careful what you share.
          </p>
          <p className="text-red-500 text-sm mt-4">
            Note: Press enter after entering the attribute values
          </p>
        </div>

        {/* Variant Group Name */}
        <div className="mb-8">
          <AddForm
            data={variantFormFields}
            handleInputonChange={handleVariantInputChange}
          />
        </div>

        {/* Initial Attributes and Values Grid */}
        <div className="grid grid-cols-2 gap-6">
          {renderAttributePairs(0, 5)}
        </div>

        {/* Additional Attributes and Values Grid */}
        {showAdditionalPairs && (
          <div className="grid grid-cols-2 gap-6 mt-6 border-t pt-6">
            {renderAttributePairs(5, 10)}
          </div>
        )}

        {/* Add/Remove Attributes Button */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setShowAdditionalPairs(!showAdditionalPairs)}
            className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700"
          >
            {showAdditionalPairs ? (
              <>
                <Minus className="w-4 h-4 mr-2" />
                Remove Additional Attributes
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add More Attributes
              </>
            )}
          </button>
          <button
            onClick={handleGenerateVariants}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            disabled={!variantFormData.variantGroupName || !product?.sku_id}
          >
            Generate Variants
          </button>
        </div>
      </div>

      {/* Variants Table Section */}
      <div className="bg-white rounded-lg p-6 mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Created Variants</h2>
          <p className="text-gray-600 text-sm mt-2">
            The Inventory of each variant has to be edited at the product level
            individually.
          </p>
        </div>

        <CustomTable
          headCells={variantColumns}
          data={variantTableData}
          pagination={false}
        />

        {/* Create Variants Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleCreateVariants}
            className="px-6 py-2 bg-[#9D0E29] text-white rounded-lg hover:bg-[#8B0D24] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!variantTableData.length}
          >
            CREATE VARIANTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVariant;
