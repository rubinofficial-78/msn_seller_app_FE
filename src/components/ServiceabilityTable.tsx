import React, { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  getShippingTypeLookup,
  getDeliveryTypeLookup,
  getPreferencesLookup,
  getServiceability,
} from "../redux/Action/action";
import { toast } from "react-hot-toast";
import { Column } from "./CustomTable";

interface ServiceabilityRow {
  id: number;
  shippingType: string;
  category: string[];
  serviceability?: {
    sub_categories: string[];
  };
  deliveryType: string;
  preferences: string;
  transitTime: string;
  shippingFee: string;
  zoneId: number;
  zone?: {
    display_name: string;
  };
  [key: string]: any;
}

interface ServiceabilityTableProps {
  data: ServiceabilityRow[];
  onSave: (
    row: any,
    lookupData: {
      shippingTypes: Array<{
        id: number;
        display_name: string;
        lookup_code: string;
        is_active: boolean;
      }>;
      deliveryTypes: Array<{
        id: number;
        display_name: string;
        lookup_code: string;
      }>;
      preferences: Array<{
        id: number;
        display_name: string;
        lookup_code: string;
      }>;
    }
  ) => void;
  onDelete: (row: any) => void;
  onChange: (key: string, value: any, rowId: number) => void;
  selectedStates: {
    [key: string]: {
      [key: string]: boolean;
    };
  };
}

const ServiceabilityTable: React.FC<ServiceabilityTableProps> = ({
  data,
  onSave,
  onDelete,
  onChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [shippingTypes, setShippingTypes] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
    }>
  >([]);
  const [deliveryTypes, setDeliveryTypes] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
    }>
  >([]);
  const [preferences, setPreferences] = useState<
    Array<{
      id: number;
      display_name: string;
      lookup_code: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [shippingResponse, deliveryResponse, preferencesResponse] =
          await Promise.all([
            dispatch(getShippingTypeLookup()),
            dispatch(getDeliveryTypeLookup()),
            dispatch(getPreferencesLookup()),
          ]);

        if (shippingResponse?.data) {
          setShippingTypes(shippingResponse.data);
        }
        if (deliveryResponse?.data) {
          setDeliveryTypes(deliveryResponse.data);
        }
        if (preferencesResponse?.data) {
          setPreferences(preferencesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching lookup data:", error);
        toast.error("Failed to fetch lookup data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".category-dropdown")) {
        // Close all dropdowns
        data.forEach((row) => {
          if (row.showDropdown) {
            onChange("showDropdown", false, row.id);
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [data, onChange]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleChange = (key: string, value: any, rowId: number) => {
    setTableData((prev) =>
      prev.map((row) => (row.id === rowId ? { ...row, [key]: value } : row))
    );

    onChange(key, value, rowId);
  };

  // First define the column configuration
  const columns: Column[] = [
    {
      id: "shippingType",
      key: "shippingType",
      label: "Shipping Type",
      type: "select",
      options: shippingTypes.map((type) => ({
        value: type.lookup_code,
        label: type.display_name,
      })),
    },
    {
      id: "category",
      key: "category",
      label: "Category",
      type: "multiSelect",
      options: (row) =>
        row.serviceability?.sub_categories?.map((category) => ({
          value: category,
          label: category,
        })) || [],
    },
    {
      id: "deliveryType",
      key: "deliveryType",
      label: "Delivery Type",
      type: "select",
      options: deliveryTypes.map((type) => ({
        value: type.lookup_code,
        label: type.display_name,
      })),
    },
    {
      id: "preferences",
      key: "preferences",
      label: "Preferences",
      type: "select",
      options: preferences.map((pref) => ({
        value: pref.lookup_code,
        label: pref.display_name,
      })),
    },
    {
      id: "transitTime",
      key: "transitTime",
      label: "Transit Time",
      type: "number",
    },
    {
      id: "shippingFee",
      key: "shippingFee",
      label: "Shipping Fee",
      type: "number",
    },
    {
      id: "actions",
      key: "actions",
      label: "Actions",
      type: "actions",
      actions: [
        {
          label: "Save",
          icon: <Save size={18} />,
          onClick: (row) =>
            onSave(row, { shippingTypes, deliveryTypes, preferences }),
        },
        {
          label: "Delete",
          icon: <Trash2 size={18} />,
          onClick: onDelete,
        },
      ],
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableData.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.id} className="px-6 py-4 whitespace-nowrap">
                  {column.type === "select" && (
                    <select
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                      value={
                        tableData.find((r) => r.id === row.id)?.[column.key] ||
                        ""
                      }
                      onChange={(e) => {
                        console.log("Select change:", {
                          key: column.key,
                          value: e.target.value,
                        });
                        handleChange(column.key, e.target.value, row.id);
                      }}
                    >
                      <option value="">Select {column.label}</option>
                      {column.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {column.type === "multiSelect" && (
                    <select
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                      value={
                        tableData.find((r) => r.id === row.id)?.[column.key] ||
                        []
                      }
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        handleChange(column.key, selectedOptions, row.id);
                      }}
                      multiple
                    >
                      <option value="">Select {column.label}</option>
                      {typeof column.options === "function"
                        ? column.options(row).map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        : column.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                    </select>
                  )}
                  {column.type === "number" && (
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded-md px-2 py-1"
                      value={
                        tableData.find((r) => r.id === row.id)?.[column.key] ||
                        ""
                      }
                      onChange={(e) => {
                        console.log("Number change:", {
                          key: column.key,
                          value: e.target.value,
                        });
                        handleChange(column.key, e.target.value, row.id);
                      }}
                      min="0"
                    />
                  )}
                  {column.type === "actions" && (
                    <div className="flex space-x-2">
                      {column.actions?.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => action.onClick(row)}
                          className={`text-${
                            action.color || "blue"
                          }-600 hover:text-${action.color || "blue"}-800`}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceabilityTable;
